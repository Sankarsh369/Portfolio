(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  const GH_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>';

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  $("#themeToggle").addEventListener("click", () => {
    const current =
      root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Stats ---------- */
  const liveCount = PROJECTS.filter((p) => p.live).length;
  $("#stats").innerHTML = [
    [PROJECTS.length, "projects"],
    [liveCount, "live links"],
    ["1", "internship"],
    ["7.93", "CGPA"]
  ].map(([v, l]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join("");

  /* ---------- Filters + cards ---------- */
  const grid = $("#projectGrid");
  const filters = $("#filters");
  const used = new Set(PROJECTS.map((p) => p.category));
  let active = "all";

  filters.innerHTML = Object.entries(CATEGORIES)
    .filter(([key]) => key === "all" || used.has(key))
    .map(([key, label]) =>
      `<button type="button" class="chip" data-filter="${key}" aria-pressed="${key === active}">${label}</button>`)
    .join("");

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    active = btn.dataset.filter;
    filters.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === btn));
    renderCards();
  });

  function card(p) {
    const tech = p.stack.slice(0, 4).map((t) => `<li>${esc(t)}</li>`).join("");
    const more = p.stack.length > 4 ? `<li class="more">+${p.stack.length - 4}</li>` : "";
    return `
      <article class="card${p.featured ? " featured" : ""}">
        <button type="button" class="card-hit" data-open="${p.slug}" aria-label="Open details for ${esc(p.title)}"></button>
        <div class="card-top">
          <span class="cat">${esc(CATEGORIES[p.category])}</span>
          ${p.live ? '<span class="live"><span class="dot"></span>Live</span>' : ""}
        </div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.tagline)}</p>
        ${p.badge ? `<p class="badge">${esc(p.badge)}</p>` : ""}
        <ul class="tags small">${tech}${more}</ul>
        <div class="card-foot">
          <span class="details">View details →</span>
          <a class="icon-link" href="${p.repo}" target="_blank" rel="noopener" aria-label="${esc(p.title)} source code">${GH_ICON}</a>
        </div>
      </article>`;
  }

  function renderCards() {
    const list = PROJECTS.filter((p) => active === "all" || p.category === active);
    grid.innerHTML = list.map(card).join("");
  }
  renderCards();

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (btn) location.hash = "project/" + btn.dataset.open;
  });

  /* ---------- Modal ---------- */
  const modal = $("#projectModal");
  const content = $("#modalContent");

  function diagram(layers) {
    return `<div class="arch">${layers
      .map((l, i) => `
        ${i ? '<div class="arch-arrow" aria-hidden="true"><span></span></div>' : ""}
        <div class="arch-layer">
          <div class="arch-name">${esc(l.name)}</div>
          <div class="arch-nodes">${l.nodes.map((n) => `<span class="node">${esc(n)}</span>`).join("")}</div>
        </div>`)
      .join("")}</div>`;
  }

  function workflow(steps) {
    return `<ol class="flow">${steps
      .map((s, i) => `<li><span class="num">${i + 1}</span><div><strong>${esc(s.t)}</strong><p>${esc(s.d)}</p></div></li>`)
      .join("")}</ol>`;
  }

  function detail(p) {
    const links = [
      p.live && `<a class="btn btn-primary" href="${p.live}" target="_blank" rel="noopener">${esc(p.liveLabel || "Live demo")} ${ARROW}</a>`,
      `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">${GH_ICON} Source code</a>`,
      p.repo2 && `<a class="btn" href="${p.repo2.url}" target="_blank" rel="noopener">${esc(p.repo2.label)}</a>`
    ].filter(Boolean).join("");

    const metrics = p.metrics
      ? `<dl class="metrics">${p.metrics.map((m) => `<div><dd>${esc(m.value)}</dd><dt>${esc(m.label)}</dt></div>`).join("")}</dl>`
      : "";

    const idx = PROJECTS.indexOf(p);
    const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(idx + 1) % PROJECTS.length];

    return `
      <header class="modal-head">
        <div>
          <span class="cat">${esc(CATEGORIES[p.category])}</span>${p.badge ? ` <span class="badge inline">${esc(p.badge)}</span>` : ""}
          <h2 id="modalTitle">${esc(p.title)}</h2>
          <p class="muted">${esc(p.tagline)}</p>
        </div>
        <button type="button" class="icon-btn close" data-close aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </header>
      <div class="modal-links">${links}</div>
      ${p.live && /onrender\.com/.test(p.live) ? '<p class="note">Hosted on a free tier — the first load may take 30–60 seconds to wake up.</p>' : ""}
      ${metrics}

      <section><h3>Overview</h3><p>${esc(p.overview)}</p></section>
      <section><h3>Problem</h3><p>${esc(p.problem)}</p></section>
      <section><h3>Key features</h3><ul class="bullets">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></section>
      <section><h3>Architecture</h3>${diagram(p.architecture)}</section>
      <section><h3>Workflow</h3>${workflow(p.workflow)}</section>
      <section><h3>Tech stack</h3><ul class="tags">${p.stack.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></section>
      ${p.learned ? `<section><h3>What I learned</h3><ul class="bullets">${p.learned.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></section>` : ""}
      ${p.run ? `<section><h3>Run locally</h3><pre><code>${esc(p.run)}</code></pre></section>` : ""}

      <nav class="modal-nav" aria-label="More projects">
        <a href="#project/${prev.slug}">← ${esc(prev.title)}</a>
        <a href="#project/${next.slug}">${esc(next.title)} →</a>
      </nav>`;
  }

  let lastFocus = null;

  function openFromHash() {
    const m = location.hash.match(/^#project\/([\w-]+)$/);
    const p = m && PROJECTS.find((x) => x.slug === m[1]);
    if (p) {
      if (!modal.open) {
        lastFocus = document.activeElement;
        modal.showModal();
        document.body.classList.add("locked");
      }
      content.innerHTML = detail(p);
      modal.scrollTop = 0;
      content.scrollTop = 0;
      document.title = `${p.title} — S Sankarsha`;
      $("[data-close]", content).focus();
    } else if (modal.open) {
      modal.close();
    }
  }

  function closeModal() {
    if (location.hash.startsWith("#project/")) {
      history.pushState("", document.title, location.pathname + location.search + "#projects");
    }
    if (modal.open) modal.close();
  }

  modal.addEventListener("close", () => {
    document.body.classList.remove("locked");
    document.title = "S Sankarsha — AI & ML Developer";
    if (location.hash.startsWith("#project/")) {
      history.pushState("", document.title, location.pathname + location.search + "#projects");
    }
    if (lastFocus) lastFocus.focus();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) closeModal();
  });

  window.addEventListener("hashchange", openFromHash);
  openFromHash();
})();
