
(() => {
  const cfg = window.TRUST_EXPERIMENT_CONFIG || {};
  const incoming = new URLSearchParams(window.location.search);

  function route(rawUrl, pathName) {
    if (!rawUrl) return "#";
    try {
      const url = new URL(rawUrl, window.location.href);
      incoming.forEach((value, key) => {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
      });
      url.searchParams.set("trust_path_source", "quai");
      if (pathName) url.searchParams.set("trust_path", pathName);
      return url.toString();
    } catch { return rawUrl; }
  }

  [
    ["[data-jay-link]", cfg.jayUrl, "jay"],
    ["[data-canonical-link]", cfg.canonicalUrl, "direct"],
    ["[data-essay-link]", cfg.essayUrl, "essay"],
    ["[data-cal-link]", cfg.calUrl, "quai"]
  ].forEach(([selector, url, pathName]) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.href = route(url, pathName);
      el.addEventListener("click", () => track("route_click", { trust_path: pathName }));
    });
  });

  function track(event, extra = {}) {
    const payload = { event, page: "quai-trust-experiment", timestamp: new Date().toISOString(), query: Object.fromEntries(incoming.entries()), ...extra };
    try {
      const key = "trust_experiment_events";
      const events = JSON.parse(localStorage.getItem(key) || "[]");
      events.push(payload);
      localStorage.setItem(key, JSON.stringify(events.slice(-100)));
    } catch {}
    if (cfg.eventEndpoint) {
      fetch(cfg.eventEndpoint, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),keepalive:true}).catch(()=>{});
    }
  }

  track("page_view");
})();
