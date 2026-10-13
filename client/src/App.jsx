import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Market from "./pages/Market";
import News from "./pages/News";
import Watchlist from "./pages/Watchlist";
import AI from "./pages/AI";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import StockDetails from "./pages/StockDetails";
import Transactions from "./pages/Transactions";
import StockProfile from "./pages/StockProfile";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/market"
            element={<Market />}
          />

          <Route
            path="/news"
            element={<News />}
          />

          <Route
            path="/watchlist"
            element={<Watchlist />}
          />

          <Route
            path="/ai"
            element={<AI />}
          />

          <Route
            path="/portfolio"
            element={<Portfolio />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/stock/:symbol"
            element={<StockDetails />}
          />

          <Route
            path="/transactions"
            element={<Transactions />}
          />

          <Route
            path="/stock"
            element={<StockProfile />}
          />

        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;