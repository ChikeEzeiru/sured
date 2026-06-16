"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── constants ──────────────────────────────────────────────────────────────────

const N = 10000;

// ── shape builders ─────────────────────────────────────────────────────────────

function pointOnRoundedRect(dist: number, w: number, h: number, r: number): [number, number] {
  const arcLen = (Math.PI / 2) * r;
  const segments = [
    { len: arcLen,    fn: (t: number): [number, number] => [(-w/2+r) + r*Math.cos(Math.PI + t*Math.PI/2),   h/2 - r + r*Math.sin(Math.PI + t*Math.PI/2)] },
    { len: w - 2*r,   fn: (t: number): [number, number] => [-w/2+r + t*(w-2*r),   h/2] },
    { len: arcLen,    fn: (t: number): [number, number] => [w/2 - r + r*Math.cos(-Math.PI/2 + t*Math.PI/2), h/2 - r + r*Math.sin(-Math.PI/2 + t*Math.PI/2)] },
    { len: h - 2*r,   fn: (t: number): [number, number] => [w/2,   h/2 - r - t*(h-2*r)] },
    { len: arcLen,    fn: (t: number): [number, number] => [w/2 - r + r*Math.cos(t*Math.PI/2),              -h/2 + r + r*Math.sin(t*Math.PI/2)] },
    { len: w - 2*r,   fn: (t: number): [number, number] => [w/2 - r - t*(w-2*r), -h/2] },
    { len: arcLen,    fn: (t: number): [number, number] => [-w/2 + r + r*Math.cos(Math.PI/2 + t*Math.PI/2), -h/2 + r + r*Math.sin(Math.PI/2 + t*Math.PI/2)] },
    { len: h - 2*r,   fn: (t: number): [number, number] => [-w/2,  -h/2 + r + t*(h-2*r)] },
  ];
  let rem = dist;
  for (const seg of segments) {
    if (rem <= seg.len) return seg.fn(rem / seg.len);
    rem -= seg.len;
  }
  return segments[0].fn(0);
}

/** Document: 30% outline + 20% ruled lines + 8% fold + 42% interior fill */
function buildDocShape(n: number, size: number): Float32Array {
  const out = new Float32Array(n * 3);
  const w = size * 0.55, h = size * 0.72, r = size * 0.08;
  const foldSize = size * 0.14;

  const outlinePts = Math.floor(n * 0.30);
  const linePts    = Math.floor(n * 0.20);
  const foldPts    = Math.floor(n * 0.08);
  const fillPts    = n - outlinePts - linePts - foldPts;

  const perimeter = 2*(w-2*r) + 2*(h-2*r) + 2*Math.PI*r;
  for (let i = 0; i < outlinePts; i++) {
    const [x, y] = pointOnRoundedRect((i / outlinePts) * perimeter, w, h, r);
    out[i*3] = x; out[i*3+1] = y; out[i*3+2] = 0;
  }

  const lineYs = [-h*0.15, h*0.05, h*0.25];
  const lineWs = [w*0.55, w*0.42, w*0.42];
  const ppl    = Math.floor(linePts / 3);
  for (let li = 0; li < 3; li++) {
    const base = outlinePts + li * ppl;
    for (let j = 0; j < ppl; j++) {
      const t = j / ppl;
      out[(base+j)*3]   = -lineWs[li]/2 + t*lineWs[li];
      out[(base+j)*3+1] = lineYs[li];
      out[(base+j)*3+2] = 0;
    }
  }

  for (let i = 0; i < foldPts; i++) {
    const t = i / foldPts;
    out[(outlinePts+linePts+i)*3]   = w/2 - foldSize + t*foldSize;
    out[(outlinePts+linePts+i)*3+1] = h/2 - foldSize*(1-t);
    out[(outlinePts+linePts+i)*3+2] = 0;
  }

  const fillBase = outlinePts + linePts + foldPts;
  for (let i = 0; i < fillPts; i++) {
    out[(fillBase+i)*3]   = (Math.random() - 0.5) * (w - r*2);
    out[(fillBase+i)*3+1] = (Math.random() - 0.5) * (h - r*2);
    out[(fillBase+i)*3+2] = 0;
  }

  return out;
}

/** Network: 18% filled node disks + 28% edges + 14% halos + 40% interior scatter */
function buildNetworkShape(n: number, size: number): Float32Array {
  const out   = new Float32Array(n * 3);
  const nodeR = size * 0.06;
  const haloR = size * 0.09;
  const sats  = 5;
  const orbit = size * 0.33;

  const diskPts    = Math.floor(n * 0.18);
  const edgePts    = Math.floor(n * 0.28);
  const haloPts    = Math.floor(n * 0.14);
  const scatterPts = n - diskPts - edgePts - haloPts;

  const nodes: [number, number][] = [[0, 0]];
  for (let s = 0; s < sats; s++) {
    const a = (s / sats) * Math.PI * 2 - Math.PI/2;
    nodes.push([Math.cos(a)*orbit, Math.sin(a)*orbit]);
  }

  // Filled disks
  let idx = 0;
  const diskPerNode = Math.floor(diskPts / nodes.length);
  for (const [cx, cy] of nodes) {
    for (let i = 0; i < diskPerNode && idx < diskPts; i++, idx++) {
      const a = Math.random() * Math.PI * 2;
      const rr = nodeR * Math.sqrt(Math.random());
      out[idx*3] = cx + Math.cos(a)*rr; out[idx*3+1] = cy + Math.sin(a)*rr; out[idx*3+2] = 0;
    }
  }
  while (idx < diskPts) {
    const a = Math.random() * Math.PI * 2;
    const rr = nodeR * Math.sqrt(Math.random());
    out[idx*3] = Math.cos(a)*rr; out[idx*3+1] = Math.sin(a)*rr; out[idx*3+2] = 0; idx++;
  }

  // Edges (center → each satellite)
  const edgeBase    = diskPts;
  const edgePerSat  = Math.floor(edgePts / sats);
  let ei = 0;
  for (let s = 0; s < sats; s++) {
    const [sx, sy] = nodes[s+1];
    for (let j = 0; j < edgePerSat && ei < edgePts; j++, ei++) {
      const t = j / edgePerSat;
      out[(edgeBase+ei)*3]   = t * sx;
      out[(edgeBase+ei)*3+1] = t * sy;
      out[(edgeBase+ei)*3+2] = 0;
    }
  }
  while (ei < edgePts) { out[(edgeBase+ei)*3]=0; out[(edgeBase+ei)*3+1]=0; out[(edgeBase+ei)*3+2]=0; ei++; }

  // Halos
  const haloBase    = diskPts + edgePts;
  const haloPerNode = Math.floor(haloPts / nodes.length);
  let hi = 0;
  for (const [cx, cy] of nodes) {
    for (let i = 0; i < haloPerNode && hi < haloPts; i++, hi++) {
      const a = (i / haloPerNode) * Math.PI * 2;
      out[(haloBase+hi)*3]   = cx + Math.cos(a)*haloR;
      out[(haloBase+hi)*3+1] = cy + Math.sin(a)*haloR;
      out[(haloBase+hi)*3+2] = 0;
    }
  }
  while (hi < haloPts) { out[(haloBase+hi)*3]=0; out[(haloBase+hi)*3+1]=0; out[(haloBase+hi)*3+2]=0; hi++; }

  // Interior scatter
  const scatterBase = diskPts + edgePts + haloPts;
  const maxR = orbit + nodeR;
  for (let i = 0; i < scatterPts; i++) {
    const a = Math.random() * Math.PI * 2;
    const rr = maxR * Math.sqrt(Math.random());
    out[(scatterBase+i)*3]   = Math.cos(a) * rr;
    out[(scatterBase+i)*3+1] = Math.sin(a) * rr;
    out[(scatterBase+i)*3+2] = 0;
  }

  return out;
}

/** Seal: 28% serrated ring + 20% inner ring + 12% star + 40% interior fill */
function buildSealShape(n: number, size: number): Float32Array {
  const out    = new Float32Array(n * 3);
  const outerR = size * 0.44;
  const innerR = size * 0.34;
  const starR  = size * 0.14;
  const teeth  = 18;

  const serratePts = Math.floor(n * 0.28);
  const innerPts   = Math.floor(n * 0.20);
  const starPts    = Math.floor(n * 0.12);
  const fillPts    = n - serratePts - innerPts - starPts;

  for (let i = 0; i < serratePts; i++) {
    const t = i / serratePts, a = t * Math.PI * 2;
    const tooth = (t * teeth) % 1;
    const r = outerR + (tooth < 0.5 ? tooth : 1-tooth) * size * 0.06;
    out[i*3] = Math.cos(a)*r; out[i*3+1] = Math.sin(a)*r; out[i*3+2] = 0;
  }

  for (let i = 0; i < innerPts; i++) {
    const a = (i / innerPts) * Math.PI * 2;
    out[(serratePts+i)*3] = Math.cos(a)*innerR; out[(serratePts+i)*3+1] = Math.sin(a)*innerR; out[(serratePts+i)*3+2] = 0;
  }

  const innerStarR = starR * 0.4;
  for (let i = 0; i < starPts; i++) {
    const t = i / starPts, a = t * Math.PI * 2 - Math.PI/2;
    const r = Math.floor(t * 10) % 2 === 0 ? starR : innerStarR;
    out[(serratePts+innerPts+i)*3] = Math.cos(a)*r; out[(serratePts+innerPts+i)*3+1] = Math.sin(a)*r; out[(serratePts+innerPts+i)*3+2] = 0;
  }

  const fillBase = serratePts + innerPts + starPts;
  for (let i = 0; i < fillPts; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = innerR * Math.sqrt(Math.random());
    out[(fillBase+i)*3]   = Math.cos(a) * r;
    out[(fillBase+i)*3+1] = Math.sin(a) * r;
    out[(fillBase+i)*3+2] = 0;
  }

  return out;
}

// ── GLSL shaders ───────────────────────────────────────────────────────────────

const VERT = /* glsl */`
  attribute vec3 aPos0;
  attribute vec3 aPos1;
  attribute vec3 aPos2;
  attribute float aSpeed;
  attribute float aOffset;
  attribute float aSize;
  attribute float aOpacityBase;
  attribute float aRole;

  uniform float uProgress;
  uniform float uTime;
  uniform float uPixelRatio;

  varying float vAlpha;
  varying vec3  vColor;

  #define PI 3.14159265358979

  float ease(float t) {
    return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t+2.0,3.0)/2.0;
  }

  vec3 lerpStage(float prog) {
    float p  = clamp(prog, 0.0, 1.999);
    float st = floor(p);
    float fr = fract(p);
    float t  = ease(fr);

    vec3 base = st < 1.0 ? mix(aPos0, aPos1, t) : mix(aPos1, aPos2, t);

    // Breeze arc — peaks mid-transition, zero at both endpoints
    float arc = sin(fr * PI);

    // Multi-frequency per-particle wind direction
    float w1 = sin(aOffset * 4.71 + uTime * 0.22);
    float w2 = cos(aOffset * 2.39 + uTime * 0.17);
    vec2 wind = vec2(w1*0.55 + w2*0.30, w2*0.55 + w1*0.30);

    // Edge particles scatter more than center ones
    float scatter = arc * (0.18 + length(base.xy) * 0.28) * (0.45 + aSpeed * 0.55);

    return vec3(base.xy + wind * scatter, base.z);
  }

  void main() {
    vec3 pos = lerpStage(uProgress);

    // Ambient swirl
    pos.x += sin(uTime * aSpeed + aOffset)       * 0.022;
    pos.y += cos(uTime * aSpeed * 0.7 + aOffset) * 0.022;
    // Slow orbital drift layer
    pos.x += cos(uTime * 0.13 + aOffset * 0.5)  * 0.010;
    pos.y += sin(uTime * 0.11 + aOffset * 0.5)  * 0.010;

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio;

    // deep indigo → mid indigo; fill particles are washed-out/faint
    vColor = mix(vec3(0.216,0.188,0.639), vec3(0.435,0.388,0.851), aOpacityBase);
    float structuralAlpha = mix(0.45, 1.0, aOpacityBase);
    vAlpha = mix(structuralAlpha, structuralAlpha * 0.15, aRole);
  }
`;

const FRAG = /* glsl */`
  precision mediump float;
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;
    float alpha = vAlpha * (1.0 - smoothstep(0.25, 0.5, d));
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// ── component ──────────────────────────────────────────────────────────────────

// Vertical world-units visible at z=0 with FOV=50° camera at z=1.6
const WORLD_HEIGHT = 2 * Math.tan((50 / 2) * (Math.PI / 180)) * 1.6;

interface Props {
  targetProgressRef: React.MutableRefObject<number>;
}

export default function ParticleJourney({ targetProgressRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
    camera.position.z = 1.6;

    // Shapes: 0=document, 1=network, 2=seal
    const SIZE = 1.045;
    const shapes = [
      buildDocShape(N, SIZE),
      buildNetworkShape(N, SIZE),
      buildSealShape(N, SIZE),
    ];

    const geo = new THREE.BufferGeometry();
    // "position" alias so Three.js bounding sphere is valid
    geo.setAttribute("position",    new THREE.BufferAttribute(shapes[0], 3));
    geo.setAttribute("aPos0",       new THREE.BufferAttribute(shapes[0], 3));
    geo.setAttribute("aPos1",       new THREE.BufferAttribute(shapes[1], 3));
    geo.setAttribute("aPos2",       new THREE.BufferAttribute(shapes[2], 3));
    geo.computeBoundingSphere();

    const speeds    = new Float32Array(N);
    const offsets   = new Float32Array(N);
    const sizes     = new Float32Array(N);
    const opacities = new Float32Array(N);
    const roles     = new Float32Array(N);
    // Structural particles (outline, edges, rings, star) occupy indices 0–5999;
    // interior fill/scatter particles start at 6000 across all three shapes.
    for (let i = 0; i < N; i++) {
      speeds[i]    = 0.3 + Math.random() * 0.7;
      offsets[i]   = Math.random() * Math.PI * 2;
      sizes[i]     = 0.8 + Math.random() * 1.4; // sand-grain: ~0.8–2.2px logical
      opacities[i] = Math.random();
      roles[i]     = i >= 6000 ? 1.0 : 0.0;
    }
    geo.setAttribute("aSpeed",       new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("aOffset",      new THREE.BufferAttribute(offsets, 1));
    geo.setAttribute("aSize",        new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aOpacityBase", new THREE.BufferAttribute(opacities, 1));
    geo.setAttribute("aRole",        new THREE.BufferAttribute(roles, 1));

    const uniforms = {
      uProgress:   { value: 0 },
      uTime:       { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite:  false,
      blending:    THREE.NormalBlending,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    // Sizing via ResizeObserver — fires after actual layout
    let sized = false;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          sized = true;
        }
      }
    });
    ro.observe(canvas);

    // Animation loop — lerps toward targetProgressRef imperatively (no re-renders)
    let raf = 0;
    let current  = 0;
    let currentY = 0;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!sized) return;
      uniforms.uTime.value = t * 0.001;
      current += (targetProgressRef.current - current) * 0.056;
      uniforms.uProgress.value = current;

      // Map progress 0→2 to vertical band 7.5%→92.5% of canvas height.
      // fracY is fraction from canvas top; convert to world Y (positive = up).
      const fracY   = 0.225 + (current / 2) * 0.55;
      const targetY = (0.5 - fracY) * WORLD_HEIGHT;
      currentY += (targetY - currentY) * 0.06;
      points.position.y = currentY;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [targetProgressRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
