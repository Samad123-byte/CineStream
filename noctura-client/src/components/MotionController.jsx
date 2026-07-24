import { useEffect } from "react";

const REVEAL_SELECTOR = [
  ".movie-row",
  ".movie-grid .movie-card",
  ".landing-features > div",
  ".landing-poster-grid article",
  ".landing-cta",
  ".page-title-block",
  ".search-box",
  ".results-heading",
  ".details-content .cast-section",
  ".cast-grid article",
  ".review-section",
  ".review-form",
  ".reviews-list article",
  ".history-list article",
  ".profile-hero",
  ".profile-stats > div",
  ".profile-forms form",
  ".empty-state",
  ".error-panel",
  ".auth-card",
].join(",");

export default function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      root.classList.add("motion-disabled");
      return undefined;
    }

    root.classList.add("motion-ready");
    const observed = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    const observeElements = (scope = document) => {
      scope.querySelectorAll(REVEAL_SELECTOR).forEach((element, index) => {
        if (observed.has(element)) return;
        observed.add(element);
        element.classList.add("motion-reveal");
        element.style.setProperty("--motion-order", String(index % 8));
        observer.observe(element);
      });
    };

    observeElements();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;

          if (node.matches(REVEAL_SELECTOR) && !observed.has(node)) {
            observed.add(node);
            node.classList.add("motion-reveal");
            observer.observe(node);
          }

          observeElements(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
