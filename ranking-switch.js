// Keep this small, standalone switch identical in both ranking repositories.
(() => {
  const switcher = document.querySelector(".ranking-switch");
  if (!switcher) return;

  const current = switcher.querySelector('[aria-current="page"]');
  let navigationTimer;

  const reset = () => {
    window.clearTimeout(navigationTimer);
    navigationTimer = undefined;
    switcher.dataset.selection = current.dataset.ranking;
  };

  // Restore the current page's highlight when returning with the Back button.
  window.addEventListener("pageshow", reset);

  switcher.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-ranking]");
    if (!link || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
        link.target === "_blank") return;

    event.preventDefault();
    window.clearTimeout(navigationTimer);
    if (link === current) {
      reset();
      return;
    }

    switcher.dataset.selection = link.dataset.ranking;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      window.location.assign(link.href);
    } else {
      // Let the yellow indicator slide before loading the other repository's site.
      navigationTimer = window.setTimeout(() => window.location.assign(link.href), 220);
    }
  });
})();
