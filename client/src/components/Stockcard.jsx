import API from "../services/api";
import {
  Trash2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Building2,
  Package,
} from "lucide-react";

function StockCard({ stock, refresh }) {
  const deleteStock = async () => {
    const confirmDelete = window.confirm(
      `Delete ${stock.companyName} from portfolio?`
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/stocks/${stock._id}`);

      refresh();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Unable to delete stock."
      );
    }
  };

  const sellStock = async () => {
    const quantityInput = prompt(
      `Enter quantity to sell (Available: ${stock.quantity})`
    );

    if (quantityInput === null) return;

    const quantity = Number(quantityInput);

    if (
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      !Number.isInteger(quantity)
    ) {
      alert("Please enter a valid whole number.");
      return;
    }

    if (quantity > Number(stock.quantity)) {
      alert("Insufficient quantity.");
      return;
    }

    try {
      await API.put(
        `/stocks/sell/${stock._id}`,
        {
          quantity,
        }
      );

      alert("Stock sold successfully.");

      refresh();
    } catch (error) {
      console.log("Sell error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to sell stock."
      );
    }
  };

  const investment =
    Number(stock.buyPrice) * Number(stock.quantity);

  const current =
    Number(stock.currentPrice) * Number(stock.quantity);

  const profit = current - investment;

  const profitPercent =
    investment === 0
      ? 0
      : ((profit / investment) * 100).toFixed(2);

  const positive = profit >= 0;

  return (
    <div
      className="card"
      style={{
        padding: "28px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "26px",
            }}
          >
            {stock.companyName}
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: "#94A3B8",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Building2 size={16} />
            {stock.symbol}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            onClick={sellStock}
            style={{
              background: "#16A34A",
              border: "none",
              color: "white",
              width: "46px",
              height: "46px",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <DollarSign size={18} />
          </button>

          <button
            onClick={deleteStock}
            style={{
              background: "#DC2626",
              border: "none",
              color: "white",
              width: "46px",
              height: "46px",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(180px,1fr))",
          gap: "18px",
        }}
      >
        <InfoCard
          title="Quantity"
          value={stock.quantity}
          icon={<Package size={18} />}
          onSell={sellStock}
        />

        <InfoCard
          title="Buy Price"
          value={`₹${Number(stock.buyPrice).toFixed(2)}`}
          onSell={sellStock}
        />

        <InfoCard
          title="Current Price"
          value={`₹${Number(stock.currentPrice).toFixed(2)}`}
          onSell={sellStock}
        />

        <InfoCard
          title="Investment"
          value={`₹${investment.toFixed(2)}`}
          onSell={sellStock}
        />

        <InfoCard
          title="Current Value"
          value={`₹${current.toFixed(2)}`}
          onSell={sellStock}
        />

        <div
          style={{
            background: positive
              ? "rgba(34,197,94,.12)"
              : "rgba(239,68,68,.12)",
            border: `1px solid ${
              positive ? "#22C55E" : "#EF4444"
            }`,
            borderRadius: "16px",
            padding: "18px",
          }}
        >
          <p
            style={{
              color: "#94A3B8",
              marginBottom: "10px",
            }}
          >
            Profit / Loss
          </p>

          <h2
            style={{
              margin: 0,
              color: positive
                ? "#22C55E"
                : "#EF4444",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {positive ? (
              <TrendingUp size={22} />
            ) : (
              <TrendingDown size={22} />
            )}

            ₹{profit.toFixed(2)}
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: positive
                ? "#22C55E"
                : "#EF4444",
              fontWeight: "600",
            }}
          >
            {positive ? "+" : ""}
            {profitPercent}%
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  value,
  icon,
  onSell,
}) {
  return (
    <div
      style={{
        background: "#0F172A",
        border: "1px solid #1E293B",
        borderRadius: "14px",
        padding: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#94A3B8",
          marginBottom: "10px",
        }}
      >
        {icon}
        <span>{title}</span>
      </div>

      <h3
        style={{
          margin: 0,
          color: "#F8FAFC",
          fontSize: "22px",
        }}
      >
        {value}
      </h3>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={onSell}
          style={{
            background: "#EF4444",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Sell Stock
        </button>
      </div>
    </div>
  );
}

export default StockCard;