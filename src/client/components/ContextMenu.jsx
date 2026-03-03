import React from "react";

export default function ContextMenu({
  visible,
  x,
  y,
  actions = []
}) {
  if (!visible || actions.length === 0) return null;

  return (
    <div
      className="custom-context-menu"
      style={{
        position: "fixed",
        top: y,
        left: x,
        background: "#1f2937",
        color: "white",
        padding: "8px 0",
        borderRadius: "8px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        zIndex: 9999,
        minWidth: "200px"
      }}
    >
      {actions.map((action, index) => (
  <div
    key={index}
    style={{
      padding: "8px 16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }}
    onClick={action.onClick}
  >
    <span
      style={{
        width: "20px",
        display: "inline-flex",
        justifyContent: "center"
      }}
    >
      {action.icon}
    </span>

    <span>{action.label}</span>
  </div>
))}
    </div>
  );
}