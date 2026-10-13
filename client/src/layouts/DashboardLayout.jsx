import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617 0%,#07101F 100%)",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <Navbar />

        <div
          className="fade-in"
          style={{
            flex: 1,
            padding: "32px",
            maxWidth: "1700px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;