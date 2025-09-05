import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Header2 from "./components/Header2";
import ContactUs from "./pages/Contactus";

import "typeface-poppins";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import SideBar from "./components/SideBar";
import { SideBarProvider } from "./components/SideBar";
import Marketplace from "./pages/Marketplace";
import Orders from "./pages/Orders";
import Contracts from "./pages/Contracts";
import Analysis from "./pages/Analysis";

const header2Routes = [
  "/dashboard",
  "/contactus",
  "/marketplace",
  "/orders",
  "/contracts",
  "/profile",
  "/analysis",
  // Add future routes here
  // You can also use pattern matching if needed
  // "/admin/*",    // Example: all admin routes
  // "/settings/*"  // Example: all settings routes
];

function ProtectedLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation(); // Correct use of useLocation

  const showHeader2 = header2Routes.some((route) =>
    route.endsWith("*")
      ? location.pathname.startsWith(route.replace("*", ""))
      : location.pathname === route
  );

  return (
    <div>
      {!showHeader2 ? <Header /> : <Header2 />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        <Route element={<PrivateRoutes />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analysis" element={<Analysis />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SideBarProvider>
        <AppContent />
      </SideBarProvider>
    </BrowserRouter>
  );
}
