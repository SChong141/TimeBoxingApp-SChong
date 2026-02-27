import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Inicio", action: "dashboard" },
  { label: "Planificador", action: "planner" },
  { label: "Ajustes", action: null },
];

export default function Sidebar({ active }) {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("es-MX", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <aside
      className="relative z-10 flex flex-col w-56 min-h-screen py-8 px-4"
      style={{
        background: "rgba(8, 16, 22, 0.85)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(249,115,22,0.12)",
      }}
    >
      <div className="mb-10 px-2">
        <p className="font-extrabold text-base tracking-tight" style={{ color: "#ffffff" }}>
          Daily Timeboxing
        </p>
        <p className="text-xs mt-1 capitalize" style={{ color: "rgba(255,255,255,0.35)" }}>
          {today}
        </p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              if (item.action) navigate("/" + item.action);
            }}
            className="flex items-center px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left"
            style={{
              background: active === item.label ? "rgba(249,115,22,0.15)" : "transparent",
              color: active === item.label ? "#f97316" : "rgba(255,255,255,0.5)",
              borderLeft: active === item.label ? "2px solid #f97316" : "2px solid transparent",
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t" style={{ borderColor: "rgba(249,115,22,0.1)" }}>
        <div className="flex items-center gap-3 px-2 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#f97316,#c2410c)", color: "#ffffff" }}
          >
            U
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate" style={{ color: "#ffffff" }}>Estudiante</p>
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>usuario@utc.edu.mx</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full text-xs py-2 rounded-xl font-semibold transition-all"
          style={{ background: "rgba(249,115,22,0.08)", color: "rgba(249,115,22,0.7)" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.18)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(249,115,22,0.08)"}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}