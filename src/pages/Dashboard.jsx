import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const stats = [
  { label: "Racha actual", value: "5", unit: "días" },
  { label: "Planes completados", value: "12", unit: "total" },
  { label: "Esta semana", value: "4", unit: "días activos" },
];

const history = [
  {
    date: "Hoy",
    priorities: ["Entregar proyecto React", "Estudiar Tailwind", "Revisar apuntes"],
    done: 1,
  },
  {
    date: "Ayer",
    priorities: ["Leer capítulo 5", "Ejercicio 30 min", "Llamar a casa"],
    done: 3,
  },
  {
    date: "Lun 24",
    priorities: ["Entregar tarea", "Estudiar algoritmos"],
    done: 2,
  },
  {
    date: "Dom 23",
    priorities: ["Descanso activo", "Planificar semana"],
    done: 1,
  },
];


export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Inicio");

  const today = new Date().toLocaleDateString("es-MX", {
    weekday: "long", day: "numeric", month: "long",
  });

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
      <Sidebar active="Inicio" />

      {/* Contenido principal */}
      <main className="relative z-10 flex-1 p-8 overflow-y-auto">

        <div className="flex items-start justify-between mb-8" style={{ animation: "fadeUp 0.5s ease both" }}>
          <div>
            <h1 className="text-3xl font-extrabold" style={{ color: "#ffffff" }}>
              Bienvenido de vuelta
            </h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              ¿Qué vas a lograr hoy?
            </p>
          </div>
          <button
            onClick={() => navigate("/planner")}
            className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg,#f97316,#c2410c)",
              color: "#ffffff",
              boxShadow: "0 0 20px rgba(249,115,22,0.3)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 32px rgba(249,115,22,0.55)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 20px rgba(249,115,22,0.3)"}
          >
            + Nuevo plan
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8" style={{ animation: "fadeUp 0.5s ease 0.1s both" }}>
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(8,16,22,0.6)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(249,115,22,0.12)",
              }}
            >
              <div className="text-3xl font-extrabold" style={{ color: "#f97316" }}>
                {s.value}
                <span className="text-sm font-semibold ml-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {s.unit}
                </span>
              </div>
              <div className="text-xs mt-1 font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Acceso rápido planificador */}
        <div
          className="rounded-2xl p-6 mb-8 flex items-center justify-between"
          style={{
            background: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.2)",
            animation: "fadeUp 0.5s ease 0.2s both",
          }}
        >
          <div>
            <h2 className="text-lg font-extrabold mb-1" style={{ color: "#ffffff" }}>
              Planificador de hoy
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Define tus bloques de tiempo y prioridades del día
            </p>
          </div>
          <button
            onClick={() => navigate("/planner")}
            className="px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 whitespace-nowrap ml-4"
            style={{
              background: "rgba(249,115,22,0.15)",
              color: "#f97316",
              border: "1px solid rgba(249,115,22,0.35)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.15)"}
          >
            Abrir planificador
          </button>
        </div>

        {/* Historial */}
        <div style={{ animation: "fadeUp 0.5s ease 0.3s both" }}>
          <h2 className="text-base font-extrabold mb-4" style={{ color: "#ffffff" }}>
            Planes recientes
          </h2>
          <div className="flex flex-col gap-3">
            {history.map((plan) => (
              <div
                key={plan.date}
                className="rounded-2xl p-4 flex items-center gap-4"
                style={{
                  background: "rgba(8,16,22,0.55)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(249,115,22,0.08)",
                }}
              >
                <div
                  className="text-xs font-extrabold px-3 py-1.5 rounded-lg min-w-[52px] text-center"
                  style={{ background: "rgba(249,115,22,0.12)", color: "#f97316" }}
                >
                  {plan.date}
                </div>

                <div className="flex flex-wrap gap-2 flex-1">
                  {plan.priorities.map((p, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: i < plan.done ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.04)",
                        color: i < plan.done ? "rgba(249,115,22,0.6)" : "rgba(255,255,255,0.45)",
                        textDecoration: i < plan.done ? "line-through" : "none",
                        border: "1px solid rgba(249,115,22,0.1)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-bold ml-2 whitespace-nowrap" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {plan.done}/{plan.priorities.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}