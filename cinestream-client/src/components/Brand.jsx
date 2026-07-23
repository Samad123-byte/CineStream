import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Brand({ to = "/home" }) {
  return <Link to={to} className="brand"><span className="brand__mark"><Clapperboard size={21} /></span><span>Cine<span>Stream</span></span></Link>;
}
