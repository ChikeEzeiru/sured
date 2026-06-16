import Image from "next/image";
import Link from "next/link";

const TEAM = [
  {
    name: "Marcus Webb",
    role: "CEO & Co-Founder",
    avatar: "/teamPhotos/my-notion-face-transparent 1.png",
  },
  {
    name: "Priya Sharma",
    role: "CTO & Co-Founder",
    avatar: "/teamPhotos/my-notion-face-transparent (11) 1.png",
  },
  {
    name: "James Callahan",
    role: "Head of Surety Operations",
    avatar: "/teamPhotos/my-notion-face-transparent (1) 1.png",
  },
  {
    name: "Dana Saunders",
    role: "VP of Compliance",
    avatar: "/teamPhotos/my-notion-face-transparent (10) 1.png",
  },
  {
    name: "Dylan Okafor",
    role: "Head of Sales",
    avatar: "/teamPhotos/my-notion-face-transparent (3) 1.png",
  },
  {
    name: "Diana Chen",
    role: "Senior Surety Underwriter",
    avatar: "/teamPhotos/my-notion-face-transparent (2) 1.png",
  },
  {
    name: "Lindsey Huang",
    role: "Head of Marketing",
    avatar: "/teamPhotos/my-notion-face-transparent (7) 1.png",
  },
  {
    name: "Ryan Patel",
    role: "Customer Success Lead",
    avatar: "/teamPhotos/my-notion-face-transparent (4) 1.png",
  },
  {
    name: "Tyler Brooks",
    role: "Bond Specialist, License & Permit",
    avatar: "/teamPhotos/my-notion-face-transparent (9) 1.png",
  },
  {
    name: "Sofia Mendez",
    role: "Bond Specialist, Contract Bonds",
    avatar: "/teamPhotos/my-notion-face-transparent (5) 1.png",
  },
  {
    name: "Kevin O'Brien",
    role: "Bond Specialist, Commercial",
    avatar: "/teamPhotos/my-notion-face-transparent (8) 1.png",
  },
  {
    name: "Amara Nwosu",
    role: "Software Engineer",
    avatar: "/teamPhotos/my-notion-face-transparent (6) 1.png",
  },
];

function TeamCard({
  member,
  lastInRow,
}: {
  member: (typeof TEAM)[0];
  lastInRow: boolean;
}) {
  return (
    <div
      className={`flex-1 min-w-0 flex flex-col justify-center gap-3 px-5 py-5 min-h-70 md:min-h-76 ${
        !lastInRow ? "border-r border-dashed border-[#e2e8f0]" : ""
      }`}
    >
      {/* Avatar badge */}
      <div className="inline-flex items-center p-1 bg-white border border-text-secondary rounded-sm shadow-[0px_1px_1px_rgba(0,0,0,0.05)] w-fit">
        <Image
          src={member.avatar}
          alt={member.name}
          width={40}
          height={40}
          className="rounded-sm"
          unoptimized
        />
      </div>

      {/* Name + role */}
      <div className="flex flex-col gap-1">
        <p className="text-xl font-medium text-border-primary leading-7.5">
          {member.name}
        </p>
        <p className="text-lg font-normal text-[#64748b] leading-7">
          {member.role}
        </p>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const COLS = 4;
  const rows = [];
  for (let i = 0; i < TEAM.length; i += COLS) {
    rows.push(TEAM.slice(i, i + COLS));
  }

  return (
    <section className="w-full flex flex-col items-center bg-text-primary">
      <div className="w-full max-w-310 border-x border-b border-[#e2e8f0] pt-24 flex flex-col gap-16">
        {/* Header */}
        <div className="px-3 md:px-8">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center px-2 py-0.5 bg-white border border-text-secondary rounded-sm text-sm font-medium text-border-primary leading-5 w-fit shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
              The Team
            </span>
            <p className="text-display-sm font-medium text-[#1e293b] leading-display-sm">
              Small team. Big network.{" "}
              <span className="font-normal text-[#64748b]">
                Our clients mention our agents by name in almost every review.
                That&apos;s what happens when a small team handles every bond
                personally. You&apos;re not a ticket number. You&apos;re a
                conversation.
              </span>
            </p>
          </div>
        </div>

        {/* Desktop grid — 4 cols, all 12 members */}
        <div className="hidden md:flex flex-col border-t border-[#e2e8f0]">
          {rows.map((row, ri) => (
            <div key={ri} className="flex border-b border-[#e2e8f0] px-8">
              {row.map((member, ci) => (
                <TeamCard
                  key={ci}
                  member={member}
                  lastInRow={ci === row.length - 1}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile grid — 2 cols, first 6 members + "See Full Team" */}
        <div className="md:hidden flex flex-col border-t border-[#e2e8f0]">
          {TEAM.slice(0, 6)
            .reduce<(typeof TEAM)[]>((acc, m, i) => {
              if (i % 2 === 0) acc.push([m]);
              else acc[acc.length - 1].push(m);
              return acc;
            }, [])
            .map((row, ri) => (
              <div key={ri} className="flex border-b border-[#e2e8f0] px-3">
                {row.map((member, ci) => (
                  <TeamCard
                    key={ci}
                    member={member}
                    lastInRow={ci === row.length - 1}
                  />
                ))}
              </div>
            ))}

          {/* See Full Team button */}
          <div className="px-3 py-6">
            <Link
              href="#"
              className="flex items-center justify-center gap-1 w-full px-3.5 py-2.5 bg-white border border-text-secondary rounded-sm text-sm font-semibold text-border-primary leading-5 shadow-[0px_4px_8px_-1px_rgba(15,23,42,0.08),0px_3px_6px_-2px_rgba(15,23,42,0.04)] hover:bg-text-primary transition-colors"
            >
              See Full Team
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 10h12M12 6l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
