import { Aperture } from "lucide-react";
import { Link } from "react-router-dom";

export default function Brand({ to = "/home" }) {
  return (
    <Link to={to} className="brand" aria-label="Noctura home">
      <span className="brand__mark">
        <Aperture size={21} aria-hidden="true" />
      </span>
      <span className="brand__word">
        Noctu<span>ra</span>
      </span>
    </Link>
  );
}
