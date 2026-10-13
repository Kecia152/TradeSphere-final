function PortfolioCard({ title, value }) {
  const lowerTitle = title.toLowerCase();

  const isProfit =
    lowerTitle.includes("profit") ||
    lowerTitle.includes("gain");

  const isInvestment =
    lowerTitle.includes("investment");

  const isCurrent =
    lowerTitle.includes("current");

  const accentColor = isProfit
    ? "#22C55E"
    : isInvestment
    ? "#3B82F6"
    : isCurrent
    ? "#F59E0B"
    : "#2563EB";

  return (
    <div
      style={{
        flex: 1,
        minWidth: "240px",
        background:
          "linear-gradient(180deg,#111827 0%,#0F172A 100%)",
        border: "1px solid #1E293B",
        borderRadius: "20px",
        padding: "28px",
        position: "relative",
        overflow: "hidden",
        transition: ".3s",
        cursor: "default",
        boxShadow: "0 15px 35px rgba(0,0,0,.30)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = accentColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.borderColor = "#1E293B";
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: `${accentColor}15`,
          top: "-90px",
          right: "-70px",
        }}
      />

      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: accentColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          fontSize: "22px",
          fontWeight: "700",
          color: "#FFFFFF",
        }}
      >
        ₹
      </div>

      <p
        style={{
          color: "#94A3B8",
          fontSize: "14px",
          marginBottom: "12px",
          letterSpacing: ".3px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          color: "#F8FAFC",
          fontSize: "34px",
          fontWeight: "700",
          margin: 0,
          wordBreak: "break-word",
        }}
      >
        {value}
      </h2>

      <div
        style={{
          marginTop: "24px",
          height: "4px",
          width: "100%",
          borderRadius: "999px",
          background: "#1E293B",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "70%",
            height: "100%",
            background: accentColor,
            borderRadius: "999px",
          }}
        />
      </div>
    </div>
  );
}

export default PortfolioCard;