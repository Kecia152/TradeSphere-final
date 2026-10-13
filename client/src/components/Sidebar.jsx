import {
  LayoutDashboard,
  BriefcaseBusiness,
  TrendingUp,
  Newspaper,
  Bot,
  Star,
  Settings,
  LogOut,
  ArrowRightLeft
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Sidebar() {
  const location = useLocation();

  const { user, logout } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={19} />,
      path: "/dashboard",
    },
    {
      name: "Portfolio",
      icon: <BriefcaseBusiness size={19} />,
      path: "/portfolio",
    },
    {
      name: "Market",
      icon: <TrendingUp size={19} />,
      path: "/market",
    },
    {
      name: "News",
      icon: <Newspaper size={19} />,
      path: "/news",
    },
    {
      name: "AI Insights",
      icon: <Bot size={19} />,
      path: "/ai",
    },
    {
      name: "Watchlist",
      icon: <Star size={19} />,
      path: "/watchlist",
    },
    {
      name: "Transactions",
      icon: <ArrowRightLeft size={19} />,
      path: "/transactions",
    },
    {
      name: "Settings",
      icon: <Settings size={19} />,
      path: "/settings",
    },
  ];

  return (
    <aside
      style={{
        width: "270px",
        minHeight: "100vh",
        background: "#0F172A",
        borderRight: "1px solid #1E293B",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
      }}
    >
      <div>
        <div
          style={{
            padding: "32px 26px",
            borderBottom: "1px solid #1E293B",
          }}
        >
          <h2
            style={{
              color: "#3B82F6",
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
              letterSpacing: ".5px",
            }}
          >
            TradeSphere
          </h2>

          <p
            style={{
              color: "#64748B",
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            Smart Portfolio Platform
          </p>
        </div>

        <div
          style={{
            padding: "22px 18px",
          }}
        >
          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 16px",
                  marginBottom: "10px",
                  borderRadius: "14px",
                  background: active ? "#2563EB" : "transparent",
                  color: active ? "#FFFFFF" : "#CBD5E1",
                  transition: ".25s",
                  fontWeight: active ? "600" : "500",
                  border: active
                    ? "1px solid #3B82F6"
                    : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "#172554";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateX(0px)";
                  }
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div
        style={{
          padding: "22px",
          borderTop: "1px solid #1E293B",
        }}
      >
        <div
          style={{
            background: "#111827",
            borderRadius: "14px",
            padding: "16px",
            marginBottom: "18px",
            border: "1px solid #1E293B",
          }}
        >
          <h4
            style={{
              margin: 0,
              color: "#F8FAFC",
            }}
          >
            {user?.name || "User"}
          </h4>

          <p
            style={{
              marginTop: "6px",
              color: "#94A3B8",
              fontSize: "13px",
            }}
          >
            Portfolio Investor
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          style={{
            width: "100%",
            background: "#DC2626",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            fontSize: "15px",
            fontWeight: "600",
            transition: ".25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#B91C1C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#DC2626";
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;