import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const HOURS = [5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11];

export default function Planner() {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("es-MX", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });

  const [priorities, setPriorities] = useState(["", "", ""]);
  const [brainDump, setBrainDump] = useState("");
  const [timeboxes, setTimeboxes] = useState(
    HOURS.reduce((acc, _, i) => {
      acc[i] = { zero: "", thirty: "" };
      return acc;
    }, {})
  );

  const updatePriority = (i, val) => {
    const updated = [...priorities];
    updated[i] = val;
    setPriorities(updated);
  };

  const updateTimebox = (i, col, val) => {
    setTimeboxes((prev) => ({
      ...prev,
      [i]: { ...prev[i], [col]: val },
    }));
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ fontFamily: "'Nunito', sans-serif", background: "#0d1b2a" }}
    >
      {/* Fondo */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 100%, #5c2d0e 0%, transparent 60%)",
      }} />

      {/* Sidebar */}
      <Sidebar active="Planificador" />

      {/* Contenido */}
      <main className="relative z-10 flex-1 px-6 py-8 overflow-y-auto">

        {/* Título + fecha */}
        <div className="flex items-end justify-between mb-6" style={{ animation: "fadeUp 0.5s ease both" }}>
          <div>
            <h1 className="text-4xl font-extrabold leading-none" style={{ color: "#ffffff" }}>
              Daily Timeboxing
            </h1>
            <h2 className="text-4xl font-extrabold leading-none mt-1" style={{ color: "#ffffff" }}>
              Planner
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              Fecha
            </p>
            <p className="text-sm font-bold" style={{ color: "#f97316" }}>
              {today}
            </p>
          </div>
        </div>

        {/* Body: dos columnas */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(8,16,22,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(249,115,22,0.15)",
            animation: "fadeUp 0.5s ease 0.1s both",
          }}
        >
          <div className="flex">

            {/* Columna izquierda */}
            <div
              className="w-[42%] p-6 flex flex-col gap-6"
              style={{ borderRight: "1px solid rgba(249,115,22,0.1)" }}
            >
              {/* Top Priorities */}
              <div>
                <h3 className="text-sm font-extrabold mb-3 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Top Priorities
                </h3>
                <div className="flex flex-col gap-2">
                  {priorities.map((p, i) => (
                    <input
                      key={i}
                      value={p}
                      onChange={(e) => updatePriority(i, e.target.value)}
                      placeholder={`Prioridad ${i + 1}`}
                      className="w-full px-3 py-2.5 rounded-xl text-sm font-medium outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(249,115,22,0.2)",
                        color: "#ffffff",
                        caretColor: "#f97316",
                      }}
                      onFocus={e => e.target.style.border = "1px solid rgba(249,115,22,0.6)"}
                      onBlur={e => e.target.style.border = "1px solid rgba(249,115,22,0.2)"}
                    />
                  ))}
                </div>
              </div>

              {/* Brain Dump */}
              <div className="flex-1">
                <h3 className="text-sm font-extrabold mb-3 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Brain Dump
                </h3>
                <textarea
                  value={brainDump}
                  onChange={(e) => setBrainDump(e.target.value)}
                  placeholder="Escribe todo lo que tengas en mente..."
                  className="w-full h-64 px-3 py-3 rounded-xl text-sm font-medium outline-none resize-none transition-all leading-7"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(249,115,22,0.2)",
                    color: "#ffffff",
                    caretColor: "#f97316",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(249,115,22,0.08) 27px, rgba(249,115,22,0.08) 28px)",
                  }}
                  onFocus={e => e.target.style.border = "1px solid rgba(249,115,22,0.6)"}
                  onBlur={e => e.target.style.border = "1px solid rgba(249,115,22,0.2)"}
                />
              </div>
            </div>

            {/* Columna derecha — Timebox grid */}
            <div className="flex-1 flex flex-col">

              {/* Header de columnas */}
              <div
                className="grid grid-cols-[48px_1fr_1fr] text-xs font-extrabold uppercase tracking-widest"
                style={{
                  borderBottom: "1px solid rgba(249,115,22,0.15)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                <div className="py-3" style={{ borderRight: "1px solid rgba(249,115,22,0.1)" }} />
                <div className="py-3 text-center" style={{ borderRight: "1px solid rgba(249,115,22,0.1)" }}>:00</div>
                <div className="py-3 text-center">:30</div>
              </div>

              {/* Filas de horas */}
              <div className="overflow-y-auto" style={{ maxHeight: "480px" }}>
                {HOURS.map((hour, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[48px_1fr_1fr] transition-colors"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div
                      className="flex items-center justify-center py-2"
                      style={{
                        borderRight: "1px solid rgba(249,115,22,0.1)",
                        color: "#f97316",
                        fontSize: "12px",
                        fontWeight: 800,
                      }}
                    >
                      {hour}
                    </div>
                    <div style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}>
                      <input
                        value={timeboxes[i]?.zero || ""}
                        onChange={(e) => updateTimebox(i, "zero", e.target.value)}
                        className="w-full h-full px-3 py-2 text-xs font-medium outline-none bg-transparent"
                        style={{ color: "#ffffff", caretColor: "#f97316" }}
                      />
                    </div>
                    <div>
                      <input
                        value={timeboxes[i]?.thirty || ""}
                        onChange={(e) => updateTimebox(i, "thirty", e.target.value)}
                        className="w-full h-full px-3 py-2 text-xs font-medium outline-none bg-transparent"
                        style={{ color: "#ffffff", caretColor: "#f97316" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Botón guardar */}
        <div className="flex justify-end mt-4" style={{ animation: "fadeUp 0.5s ease 0.2s both" }}>
          <button
            onClick={() => { alert("Plan guardado (demo)"); navigate("/dashboard"); }}
            className="px-8 py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg,#f97316,#c2410c)",
              color: "#ffffff",
              boxShadow: "0 0 20px rgba(249,115,22,0.3)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 32px rgba(249,115,22,0.55)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 20px rgba(249,115,22,0.3)"}
          >
            Guardar plan del día
          </button>
        </div>
      </main>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.2);
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px rgba(8,16,22,0.95) inset !important;
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #f97316 !important;
        }
      `}</style>
    </div>
  );
}