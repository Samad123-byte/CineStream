import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function TrailerModal({ videoKey, title, onClose }) {
  useEffect(() => {
    if (!videoKey) return;

    document.body.classList.add("nav-open");

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [videoKey, onClose]);

  if (!videoKey) return null;

  return createPortal(
    <div className="trailer-modal" role="dialog" aria-modal="true" aria-label={`${title || "Trailer"} player`}>
      <button
        type="button"
        className="trailer-modal__backdrop"
        onClick={onClose}
        aria-label="Close trailer"
      />
      <div className="trailer-modal__box">
        <button
          type="button"
          className="trailer-modal__close"
          onClick={onClose}
          aria-label="Close trailer"
        >
          <X aria-hidden="true" />
        </button>
        <div className="trailer-modal__frame">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
            title={title || "Trailer"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  );
}