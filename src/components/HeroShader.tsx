"use client";

import { useEffect, useRef } from "react";

const vert = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// Flowing fractal noise in Sured brand palette
const frag = `
  precision mediump float;
  uniform float u_time;
  uniform vec2  u_res;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),              hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p  = p * 2.01 + vec2(0.3, 0.7);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    float t  = u_time * 0.1;

    // Two layers of warped fbm
    vec2 q = vec2(
      fbm(uv + vec2(0.0, 0.0) + t),
      fbm(uv + vec2(5.2, 1.3) + t)
    );
    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 0.5),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8) + t * 0.3)
    );
    float f = fbm(uv + 4.0 * r + t);

    // Brand palette
    vec3 navy   = vec3(0.008, 0.024, 0.090); // #020617
    vec3 slate  = vec3(0.059, 0.090, 0.176); // #0f172a
    vec3 indigo = vec3(0.388, 0.400, 0.945); // #6366f1

    vec3 col = mix(navy, slate, clamp(f * f * 4.0, 0.0, 1.0));
    col = mix(col, indigo, clamp(length(q) * 0.5, 0.0, 1.0) * 0.18);
    col = mix(navy, col, 0.78);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function HeroShader() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);

    const posLoc  = gl.getAttribLocation(prog, "a_pos");
    const timeLoc = gl.getUniformLocation(prog, "u_time");
    const resLoc  = gl.getUniformLocation(prog, "u_res");

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf: number;
    const t0 = performance.now();

    const draw = () => {
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.uniform1f(timeLoc, (performance.now() - t0) / 1000);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
}
