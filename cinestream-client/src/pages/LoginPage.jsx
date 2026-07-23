import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Brand from "../components/Brand";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false); const [loading, setLoading] = useState(false);
  const { login } = useAuth(); const { showToast } = useToast(); const navigate = useNavigate(); const location = useLocation();
  const submit = async (e) => { e.preventDefault(); setLoading(true); try { await login(form); showToast("Welcome back", "success"); navigate(location.state?.from || "/home", { replace: true }); } catch (error) { showToast(error.message, "error"); } finally { setLoading(false); } };
  return <div className="auth-page"><div className="auth-art"><Brand to="/" /><div><span className="eyebrow">Welcome back</span><h1>Continue your<br />cinematic journey.</h1><p>Your favorites, watchlist, history, and reviews are ready where you left them.</p></div></div><div className="auth-panel"><Link to="/" className="auth-brand-mobile"><Brand to="/" /></Link><div className="auth-card"><span className="eyebrow">Sign in</span><h2>Welcome back</h2><p>Enter your account details to continue.</p><form onSubmit={submit}><label>Email address<div className="input-wrap"><Mail /><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="you@example.com" /></div></label><label>Password<div className="input-wrap"><Lock /><input type={show ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Your password" /><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff /> : <Eye />}</button></div></label><button className="button button--primary auth-submit" disabled={loading}>{loading ? "Signing in…" : <>Sign in <ArrowRight /></>}</button></form><p className="auth-switch">New to CineStream? <Link to="/register">Create an account</Link></p></div></div></div>;
}
