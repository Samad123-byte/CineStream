import { Check, Palette, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function createGradient(colors) {
  return `linear-gradient(135deg, ${colors.join(", ")})`;
}

export default function ThemeSwitcher({ compact = false }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { theme, themes, setTheme } = useTheme();

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const activeTheme =
    themes.find((item) => item.id === theme) || themes[0];

  return (
    <div
      ref={wrapperRef}
      className={`theme-switcher ${compact ? "theme-switcher--compact" : ""}`}
    >
      <button
        type="button"
        className="theme-switcher__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Change color theme"
      >
        <Palette aria-hidden="true" />
        {!compact && <span>Theme</span>}

        <i
          className="theme-switcher__active-dot"
          style={{ background: createGradient(activeTheme.colors) }}
        />
      </button>

      <div className={`theme-switcher__panel ${open ? "is-open" : ""}`}>
        <div
          className="theme-switcher__preview"
          style={{ background: createGradient(activeTheme.colors) }}
        >
          <Sparkles aria-hidden="true" />
          <div>
            <span>Current visual mood</span>
            <strong>{activeTheme.name}</strong>
          </div>
        </div>

        <div className="theme-switcher__heading">
          <div>
            <strong>Choose your color mood</strong>
            <span>Your choice is saved automatically.</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close theme selector"
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="theme-switcher__options">
          {themes.map((item) => {
            const selected = item.id === theme;

            return (
              <button
                key={item.id}
                type="button"
                className={selected ? "is-selected" : ""}
                onClick={() => {
                  setTheme(item.id);
                  setOpen(false);
                }}
              >
                <span
                  className="theme-switcher__swatch"
                  style={{ background: createGradient(item.colors) }}
                />

                <span>
                  <strong>{item.name}</strong>
                  <small>{item.description}</small>
                </span>

                {selected && <Check aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
