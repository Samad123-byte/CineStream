import { Film } from "lucide-react";
import { Link } from "react-router-dom";
export default function EmptyState({ title, text }) { return <div className="empty-state"><Film /><h2>{title}</h2><p>{text}</p><Link to="/home" className="button button--primary">Browse movies</Link></div>; }
