import { useEffect, useRef, useState } from "react";

const FULL_MESSAGE = `Happy Mother's Day
My Potti amma. My Doremon.

To Potti amma — with all my love

In every gentle word you spoke, every late night you stayed up worrying, every sacrifice you made without a second thought — I saw love in its purest form.

Since you came into my life, everything changed. My world became more beautiful, warmer, and full of meaning. You are the person who truly cares for me — the one I turn to when my heart is heavy and my words have nowhere else to go.

You are my first priority and the most important person in my life — the warmth behind every good memory, the steady hand that held mine when the world felt too big, and the voice that always reminded me I was enough.

Not just today, but in every quiet moment, I carry you with me — your strength, your kindness, your endless grace.

Thank you for being my everything.

Happy Mother's Day, Potti amma. 💛

— With all my love`;

/** Pre-keyed line descriptors derived from the static message. */
const LINE_KEYS: string[] = FULL_MESSAGE.split("\n").map((t, pos) => {
  if (t === "") return `blank-${pos}`;
  return (
    t
      .slice(0, 28)
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/gi, "")
      .toLowerCase() || `line-${pos}`
  );
});

const CONFETTI_COLORS = [
  "#e879f9",
  "#d946ef",
  "#a855f7",
  "#818cf8",
  "#f0abfc",
  "#fde68a",
  "#fb7185",
  "#c026d3",
  "#f5d0fe",
  "#fbbf24",
  "#7c3aed",
];

interface ConfettiPiece {
  id: string;
  x: number;
  color: string;
  size: number;
  shape: "rect" | "circle" | "diamond";
  delay: number;
  duration: number;
  tx: number;
}

function createConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `c-${i}-${Math.random().toString(36).slice(2, 6)}`,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 6 + Math.random() * 10,
    shape: (["rect", "circle", "diamond"] as const)[
      Math.floor(Math.random() * 3)
    ],
    delay: Math.random() * 1.2,
    duration: 2.5 + Math.random() * 2,
    tx: (Math.random() - 0.5) * 200,
  }));
}

const EMOJI_FLOATS = [
  { id: "heart-yellow", symbol: "💛", left: 8, bottom: 8 },
  { id: "cherry-blossom", symbol: "🌸", left: 27, bottom: 16 },
  { id: "sparkles", symbol: "✨", left: 46, bottom: 8 },
  { id: "two-hearts", symbol: "💕", left: 65, bottom: 16 },
  { id: "hibiscus", symbol: "🌺", left: 84, bottom: 8 },
] as const;

// Floating petals — deterministic positions by index
const PETAL_COLORS = [
  "#e879f9",
  "#f9a8d4",
  "#fda4af",
  "#c084fc",
  "#fbbf24",
  "#f472b6",
  "#a78bfa",
];
interface Petal {
  id: string;
  left: number;
  bottom: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  px: number;
}
const PETALS: Petal[] = Array.from({ length: 18 }, (_, i) => {
  const r = (offset: number) => ((i * 137 + offset * 31) % 97) / 97;
  return {
    id: `petal-${i}`,
    left: r(0) * 100,
    bottom: -(r(1) * 15 + 2),
    size: 8 + r(2) * 14,
    color: PETAL_COLORS[i % PETAL_COLORS.length],
    duration: 10 + r(3) * 14,
    delay: r(4) * 18,
    px: (r(5) - 0.5) * 200,
  };
});

// Golden sparkles — deterministic positions
const SPARKLE_COLORS = ["#fde68a", "#fbbf24", "#f59e0b", "#fef3c7", "#fcd34d"];
interface Sparkle {
  id: string;
  left: number;
  top: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}
const SPARKLES: Sparkle[] = Array.from({ length: 28 }, (_, i) => {
  const r = (offset: number) => ((i * 97 + offset * 53) % 89) / 89;
  return {
    id: `sparkle-${i}`,
    left: r(0) * 98,
    top: r(1) * 95,
    size: 2 + r(2) * 3.5,
    color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
    duration: 1.5 + r(3) * 3,
    delay: r(4) * 6,
  };
});

function MessageLine({
  lineKey,
  text,
  position,
  showCursor,
}: {
  lineKey: string;
  text: string;
  position: number;
  showCursor: boolean;
}) {
  if (position === 0) {
    return (
      <span
        key={lineKey}
        className="block mb-1"
        style={{
          fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          color: "#fde68a",
          textShadow:
            "0 0 20px rgba(253,230,138,0.7), 0 0 40px rgba(232,121,249,0.5), 0 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        {text}
        {showCursor && <span className="typewriter-cursor" />}
      </span>
    );
  }
  if (position === 1) {
    return (
      <span
        className="block mb-6"
        style={{
          fontSize: "clamp(1rem, 2.8vw, 1.3rem)",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: "#f9a8d4",
          fontStyle: "italic",
          textShadow:
            "0 0 16px rgba(249,168,212,0.8), 0 2px 6px rgba(0,0,0,0.7)",
        }}
      >
        {text}
        {showCursor && <span className="typewriter-cursor" />}
      </span>
    );
  }
  if (text === "") {
    return (
      <span className="block" style={{ height: "1em" }}>
        {showCursor && <span className="typewriter-cursor" />}
      </span>
    );
  }
  return (
    <span
      className="block mb-1"
      style={{
        fontSize: "clamp(0.9rem, 2.2vw, 1.05rem)",
        fontWeight: 400,
        lineHeight: 1.85,
        color: "#f0f0ff",
        textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 0 12px rgba(168,85,247,0.3)",
      }}
    >
      {text}
      {showCursor && <span className="typewriter-cursor" />}
    </span>
  );
}

export default function App() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [bloom, setBloom] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setPageVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!pageVisible) return;
    const startDelay = setTimeout(() => {
      function type() {
        if (indexRef.current < FULL_MESSAGE.length) {
          indexRef.current += 1;
          setDisplayed(FULL_MESSAGE.slice(0, indexRef.current));
          timerRef.current = setTimeout(type, 38);
        } else {
          setDone(true);
        }
      }
      type();
    }, 600);
    return () => {
      clearTimeout(startDelay);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pageVisible]);

  useEffect(() => {
    if (!done) return;
    setBloom(true);
    setConfetti(createConfetti(120));
    const t = setTimeout(() => setConfetti([]), 6000);
    const b = setTimeout(() => setBloom(false), 2500);
    return () => {
      clearTimeout(t);
      clearTimeout(b);
    };
  }, [done]);

  const currentLines = displayed.split("\n");

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden flex items-center justify-center py-12 px-4 transition-opacity duration-1000 bg-scene ${
        pageVisible ? "opacity-100" : "opacity-0"
      } ${done ? "orb-bloom" : ""}`}
    >
      {/* Glowing orbs for depth */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="orb orb-4" aria-hidden="true" />
      <div className="orb orb-5" aria-hidden="true" />

      {/* Floating petals */}
      {PETALS.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
          className="petal"
          style={
            {
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              width: `${p.size}px`,
              height: `${p.size * 0.65}px`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 1.5}px ${p.color}88`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--px": `${p.px}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Golden sparkles */}
      {SPARKLES.map((s) => (
        <div
          key={s.id}
          aria-hidden="true"
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {bloom && (
        <div
          className="glow-bloom"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,121,249,0.75) 0%, rgba(124,58,237,0.55) 40%, transparent 70%)",
            zIndex: 10,
          }}
        />
      )}

      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={
            {
              left: `${piece.x}%`,
              top: "-10px",
              width:
                piece.shape === "circle"
                  ? `${piece.size}px`
                  : `${piece.size * 0.7}px`,
              height:
                piece.shape === "circle"
                  ? `${piece.size}px`
                  : `${piece.size * 1.4}px`,
              backgroundColor: piece.color,
              borderRadius: piece.shape === "circle" ? "50%" : "2px",
              transform:
                piece.shape === "diamond" ? "rotate(45deg)" : undefined,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              "--tx": `${piece.tx}px`,
              zIndex: 50,
            } as React.CSSProperties
          }
        />
      ))}

      <div
        data-ocid="message.card"
        className="relative z-20 w-full max-w-2xl mx-auto"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(26px)",
          WebkitBackdropFilter: "blur(26px)",
          borderRadius: "24px",
          border: "1px solid rgba(232,121,249,0.22)",
          boxShadow:
            "0 8px 64px rgba(148,0,211,0.3), 0 2px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
          padding: "clamp(2rem, 5vw, 3.5rem)",
        }}
      >
        <div
          className="font-display text-center leading-relaxed"
          style={{ color: "#f0f0ff" }}
          aria-live="polite"
          aria-label="Mother's Day message"
        >
          {LINE_KEYS.slice(0, currentLines.length).map((lineKey, pos) => (
            <MessageLine
              key={lineKey}
              lineKey={lineKey}
              text={currentLines[pos] ?? ""}
              position={pos}
              showCursor={pos === currentLines.length - 1 && !done}
            />
          ))}
          {done && (
            <span
              className="inline-block typewriter-cursor"
              style={{
                marginLeft: "2px",
                height: "1.2em",
                verticalAlign: "text-bottom",
              }}
            />
          )}
        </div>

        {done && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              data-ocid="message.replay_button"
              onClick={() => {
                indexRef.current = 0;
                setDisplayed("");
                setDone(false);
                setConfetti([]);
                setBloom(false);
              }}
              className="transition-smooth"
              style={{
                background: "rgba(232,121,249,0.18)",
                border: "1px solid rgba(232,121,249,0.45)",
                borderRadius: "100px",
                padding: "0.5rem 1.5rem",
                fontSize: "0.85rem",
                fontFamily: "var(--font-display)",
                color: "#fde68a",
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
            >
              ↺ Play Again
            </button>
          </div>
        )}
      </div>

      {done && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 5 }}
          aria-hidden="true"
        >
          {EMOJI_FLOATS.map(({ id, symbol, left, bottom }) => (
            <span
              key={id}
              style={{
                position: "absolute",
                left: `${left}%`,
                bottom: `${bottom}%`,
                fontSize: "1.5rem",
                opacity: 0.5,
                animation: "float-up 3s ease-in-out infinite alternate",
              }}
            >
              {symbol}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
