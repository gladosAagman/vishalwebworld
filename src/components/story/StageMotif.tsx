import "./story.css";

/**
 * Page-specific hero motifs.
 *
 * Every hero shares one stage — the same three light sources, the same
 * vignette, the same tokens. Only this layer changes, and each motif is drawn
 * from what its page actually does: a catalogue spine for services, a
 * checklist for documents, an eligibility graph for schemes, radar rings for
 * search, a locality map for contact, a national dot mesh for CSC 2.0.
 *
 * Coordinates come from the design canvas, whose artboards are 1280×560 with
 * the copy on the left. The viewBox below keeps that right-hand half verbatim,
 * so the artboards and the site cannot drift apart.
 */

export type MotifName = "services" | "documents" | "schemes" | "search" | "contact" | "csc";

/**
 * A glass label. The canvas draws these as HTML pills positioned over the SVG;
 * inside the SVG they scale with the motif instead of needing their own
 * responsive placement. Width is estimated from the text — these are decorative
 * labels at a fixed size, so a per-character estimate is enough.
 */
function Pill({
  x,
  y,
  text,
  anchor = "start",
  size = 12,
}: {
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "middle";
  size?: number;
}) {
  const width = text.length * size * 0.56 + 24;
  const height = size + 14;
  const left = anchor === "middle" ? x - width / 2 : x;

  return (
    <g>
      <rect
        x={left}
        y={y}
        width={width}
        height={height}
        rx={height / 2}
        fill="var(--stage-card)"
        stroke="var(--stage-card-border)"
        strokeWidth="1"
      />
      <text
        x={left + width / 2}
        y={y + height / 2 + size * 0.36}
        textAnchor="middle"
        fontSize={size}
        fontWeight="600"
        fill="var(--stage-ink)"
      >
        {text}
      </text>
    </g>
  );
}

/** Services — a catalogue spine: 24 ticks for 24 services, four called out. */
function ServicesMotif() {
  const ticks = [10, 27, 96, 41, 48, 20, 27, 34, 96, 48, 20, 27, 34, 41, 96, 20, 27, 34, 41, 48, 96, 27, 34, 41];

  return (
    <>
      <line x1="666" y1="430" x2="1244" y2="430" stroke="var(--stage-line)" strokeWidth="1.5" />
      {ticks.map((height, index) => {
        const x = 690 + index * 24;
        const tall = height === 96;
        return (
          <g key={x}>
            <line
              x1={x}
              y1="430"
              x2={x}
              y2={430 - height}
              stroke={tall ? "var(--primary)" : "var(--stage-line)"}
              strokeWidth={tall ? 2 : 1.5}
              strokeLinecap="round"
            />
            {tall && <circle cx={x} cy={430 - height} r="4" fill="var(--primary)" />}
          </g>
        );
      })}
      <Pill x={738} y={296} text="Samagra ID" anchor="middle" size={11} />
      <Pill x={882} y={296} text="PAN Card" anchor="middle" size={11} />
      <Pill x={1026} y={296} text="Ayushman" anchor="middle" size={11} />
      <Pill x={1170} y={296} text="Khasra" anchor="middle" size={11} />
    </>
  );
}

/** Documents — a stack of checklists, the top one legible. */
function DocumentsMotif() {
  const rows = [
    ["Aadhaar card", true],
    ["Samagra ID", true],
    ["Passport size photo", true],
    ["Bank passbook", false],
  ] as const;

  return (
    <>
      <g transform="translate(742 118) rotate(-7)" opacity="0.4">
        <rect width="300" height="330" rx="18" fill="var(--stage-card)" stroke="var(--stage-card-border)" strokeWidth="1.5" />
      </g>
      <g transform="translate(790 104) rotate(-2.5)" opacity="0.62">
        <rect width="300" height="330" rx="18" fill="var(--stage-card)" stroke="var(--stage-card-border)" strokeWidth="1.5" />
      </g>
      <g transform="translate(836 96) rotate(2)">
        <rect width="316" height="340" rx="18" fill="var(--stage-card)" stroke="var(--stage-card-border)" strokeWidth="1.5" />
        <text x="34" y="46" fontSize="13" fontWeight="700" letterSpacing="1.8" fill="var(--primary)">
          ZAROORI DOCUMENTS
        </text>
        <line x1="34" y1="60" x2="282" y2="60" stroke="var(--stage-line)" strokeWidth="1" />
        {rows.map(([label, done], index) => {
          const y = 70 + index * 42;
          return (
            <g key={label}>
              {done ? (
                <>
                  <rect x="34" y={y} width="20" height="20" rx="5" fill="var(--brand)" />
                  <path
                    d={`M39 ${y + 9} l4 4 7-8`}
                    stroke="var(--background)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </>
              ) : (
                <rect x="34" y={y} width="20" height="20" rx="5" stroke="var(--stage-line)" strokeWidth="1.6" fill="none" />
              )}
              <text x="68" y={y + 15} fontSize="14" fontWeight="500" fill="var(--stage-ink)" opacity={done ? 0.92 : 0.55}>
                {label}
              </text>
            </g>
          );
        })}
      </g>
    </>
  );
}

/** Schemes — one household at the centre, the schemes it qualifies for around it. */
function SchemesMotif() {
  const nodes = [
    { x: 942, y: 130, label: "PM Kisan", path: "M972 300 Q 971 201 942 130", eligible: true, anchor: "start" },
    { x: 1112, y: 201, label: "Ladli Behna", path: "M972 300 Q 1056 236 1112 201", eligible: true, anchor: "start" },
    { x: 1120, y: 386, label: "PM Awas", path: "M972 300 Q 1060 329 1120 386", eligible: false, anchor: "start" },
    { x: 957, y: 471, label: "Mudra Loan", path: "M972 300 Q 978 371 957 471", eligible: false, anchor: "start" },
    { x: 810, y: 358, label: "Ayushman", path: "M972 300 Q 905 315 810 358", eligible: true, anchor: "end" },
  ] as const;

  return (
    <>
      <circle cx="972" cy="300" r="172" stroke="var(--stage-grid)" strokeWidth="1" strokeDasharray="2 7" />
      {nodes.map((node) => (
        <path
          key={node.label}
          d={node.path}
          fill="none"
          stroke={node.eligible ? "var(--brand)" : "var(--stage-line)"}
          strokeWidth={node.eligible ? 1.8 : 1.2}
          {...(node.eligible ? {} : { strokeDasharray: "3 5" })}
        />
      ))}
      <circle cx="972" cy="300" r="34" fill="var(--stage-card)" stroke="var(--stage-card-border)" strokeWidth="1.5" />
      <text x="972" y="298" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="0.8" fill="var(--primary)">
        AAPKA
      </text>
      <text x="972" y="313" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="0.8" fill="var(--primary)">
        PARIVAAR
      </text>
      {nodes.map((node) => (
        <g key={`${node.label}-node`}>
          <circle cx={node.x} cy={node.y} r="6" fill={node.eligible ? "var(--brand)" : "var(--stage-line)"} />
          <text
            x={node.anchor === "end" ? node.x - 16 : node.x + 16}
            y={node.y + 5}
            textAnchor={node.anchor}
            fontSize="13"
            fontWeight="600"
            fill="var(--stage-ink)"
            opacity={node.eligible ? 0.95 : 0.5}
          >
            {node.label}
          </text>
        </g>
      ))}
    </>
  );
}

/** Search — radar rings sweeping official portals. */
function SearchMotif() {
  return (
    <>
      {[72, 126, 186, 250].map((r) => (
        <circle key={r} cx="972" cy="292" r={r} stroke="var(--stage-grid)" strokeWidth="1.2" fill="none" />
      ))}
      <path d="M972 292 L1222 246 A250 250 0 0 1 1204 386 Z" fill="var(--stage-glow-a)" opacity="0.55">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 972 292"
          to="360 972 292"
          dur="14s"
          repeatCount="indefinite"
        />
      </path>
      <circle cx="972" cy="292" r="30" fill="var(--stage-card)" stroke="var(--stage-card-border)" strokeWidth="1.5" />
      <g transform="translate(972 292)" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" fill="none">
        <circle cx="-2" cy="-2" r="8" />
        <path d="M4 4 l7 7" />
      </g>
      <Pill x={846} y={180} text="samagra.gov.in" size={11} />
      <Pill x={1060} y={176} text="beneficiary.nha.gov.in" size={11} />
      <Pill x={1090} y={448} text="pmkisan.gov.in" size={11} />
      <Pill x={846} y={380} text="incometax.gov.in" size={11} />
    </>
  );
}

/** Contact — the centre on its local map, with the WhatsApp thread beside it. */
function ContactMotif() {
  return (
    <>
      {[
        [62, 46, -12],
        [102, 76, -8],
        [143, 106, -4],
        [183, 136, 0],
        [224, 166, 4],
        [264, 196, 8],
      ].map(([rx, ry, rotate]) => (
        <ellipse
          key={rx}
          cx="960"
          cy="250"
          rx={rx}
          ry={ry}
          stroke="var(--stage-grid)"
          strokeWidth="1.2"
          fill="none"
          transform={`rotate(${rotate} 960 250)`}
        />
      ))}
      <circle cx="960" cy="250" r="22" fill="var(--stage-glow-b)" />
      <g transform="translate(960 250)" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinejoin="round">
        <path d="M0 10 C -9 -2 -12 -7 -12 -12 a12 12 0 0 1 24 0 c0 5 -3 10 -12 22 z" fill="var(--stage-card)" />
        <circle cx="0" cy="-12" r="4.5" />
      </g>
      <Pill x={960} y={286} text="Vishal Web World · centre" anchor="middle" size={11} />

      <g>
        <rect
          x="700"
          y="372"
          width="322"
          height="52"
          rx="16"
          fill="var(--stage-card)"
          stroke="var(--stage-card-border)"
          strokeWidth="1"
        />
        <text x="722" y="404" fontSize="12.5" fill="var(--stage-ink)" opacity="0.62">
          Namaste! Mujhe Ayushman card banwana hai.
        </text>
      </g>
      <g>
        <rect
          x="856"
          y="452"
          width="336"
          height="52"
          rx="16"
          fill="var(--stage-card)"
          stroke="color-mix(in oklab, var(--brand) 45%, transparent)"
          strokeWidth="1"
        />
        <text x="878" y="484" fontSize="12.5" fill="var(--stage-ink)" opacity="0.92">
          Aadhaar aur Samagra bhej dijiye — aaj ho jayega.
        </text>
      </g>
    </>
  );
}

/**
 * CSC 2.0 — the national mesh: one dot per centre, brightest around the hub,
 * with the eight dashed spokes the programme is built on.
 */
function CscMotif() {
  const cols = 17;
  const rows = 9;
  const spokes = [
    [1210, 276],
    [1136, 396],
    [960, 446],
    [783, 396],
    [710, 276],
    [783, 155],
    [960, 106],
    [1136, 155],
  ] as const;

  const dots = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = 660 + col * 37;
      const y = 92 + row * 41;
      // Falls off with distance from the hub, so the mesh reads as lit from the
      // centre rather than as a flat pattern.
      const distance = Math.hypot((x - 960) / 300, (y - 276) / 190);
      const strength = Math.max(0, 1 - distance);
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={(1.6 + strength * 2.2).toFixed(2)}
          fill="var(--primary)"
          opacity={(0.3 + strength * 0.5).toFixed(2)}
        />,
      );
    }
  }

  return (
    <>
      {spokes.map(([x, y]) => (
        <line
          key={`${x}-${y}`}
          x1="960"
          y1="276"
          x2={x}
          y2={y}
          stroke="var(--stage-line)"
          strokeWidth="1.4"
          strokeDasharray="2 6"
        />
      ))}
      {dots}
      <circle cx="960" cy="276" r="30" fill="var(--stage-card)" stroke="var(--stage-card-border)" strokeWidth="1.5" />
      <text x="960" y="281" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="0.5" fill="var(--primary)">
        CSC
      </text>
    </>
  );
}

const MOTIFS: Record<MotifName, () => React.JSX.Element> = {
  services: ServicesMotif,
  documents: DocumentsMotif,
  schemes: SchemesMotif,
  search: SearchMotif,
  contact: ContactMotif,
  csc: CscMotif,
};

export function StageMotif({ name }: { name: MotifName }) {
  const Motif = MOTIFS[name];

  return (
    <svg
      aria-hidden="true"
      className="stage-motif"
      viewBox="640 0 640 560"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <Motif />
    </svg>
  );
}
