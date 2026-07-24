import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
export default function AppShell() { return <div className="app-shell"><Header /><main><Outlet /></main><Footer /><ChatWidget /></div>; }