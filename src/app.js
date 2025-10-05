import { marked } from "/node_modules/marked/lib/marked.esm.js";
const hljs = typeof window !== "undefined" ? window.hljs : null;

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide && typeof lucide.createIcons === "function")
    lucide.createIcons();
  const btn = document.getElementById("sidebarBtnLeft");
  const aside = document.getElementById("sidebarLeft");
  const overlay = document.getElementById("sidebarOverlayLeft");
  const closeBtn = document.getElementById("sidebarCloseLeft");
  const sidebarList = document.getElementById("sidebarList");
  const contentHtml = document.getElementById("contentHtml");
  const siteTitle = document.getElementById("siteTitle");
  const sidebarHeading = document.getElementById("sidebarHeading");
  const messages = document.getElementById("messages");
  if (!aside || !overlay || !sidebarList || !contentHtml || !siteTitle) return;
  const CLOSED_CLASS = "-translate-x-full";
  aside.classList.add(CLOSED_CLASS);
  overlay.classList.add("hidden");

  function showMain() {
    contentHtml.classList.add("hidden");
    siteTitle.classList.remove("hidden");
    if (messages) messages.classList.remove("hidden");
  }
  function showMarkdown(md) {
    contentHtml.classList.remove("hidden");
    try {
      contentHtml.innerHTML =
        '<div class="markdown-body p-4">' + marked.parse(md) + "</div>";
    } catch (err) {
      contentHtml.textContent = md;
    }
    try {
      if (hljs && typeof hljs.highlightAll === "function") hljs.highlightAll();
    } catch (e) {}
    siteTitle.classList.add("hidden");
    if (messages) messages.classList.add("hidden");
  }
  function setActiveItem(path) {
    const items = sidebarList.querySelectorAll("a");
    items.forEach((it) => {
      if (it.dataset && it.dataset.path === path)
        it.classList.add("bg-gray-100");
      else it.classList.remove("bg-gray-100");
    });
  }
  async function buildSidebar() {
    try {
      const manifestPath = window.location.pathname.startsWith("/src")
        ? "./content/index.json"
        : "/content/index.json";
      const res = await fetch(manifestPath);
      const list = await res.json();
      sidebarList.innerHTML = "";
      for (const f of list) {
        const a = document.createElement("a");
        a.href = "#";
        a.className = "block px-3 py-2 rounded hover:bg-gray-100 text-sm";
        a.textContent = f.title;
        a.dataset.path = f.path;
        a.addEventListener("click", async (e) => {
          e.preventDefault();
          const r = await fetch(f.path);
          const md = await r.text();
          showMarkdown(md);
          setActiveItem(f.path);
          aside.classList.add(CLOSED_CLASS);
          overlay.classList.add("hidden");
        });
        sidebarList.appendChild(a);
      }
      showMain();
    } catch (err) {
      showMain();
    }
  }
  buildSidebar();
  if (btn)
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      aside.classList.toggle(CLOSED_CLASS);
      overlay.classList.toggle("hidden");
    });
  overlay.addEventListener("click", () => {
    aside.classList.add(CLOSED_CLASS);
    overlay.classList.add("hidden");
  });
  if (closeBtn)
    closeBtn.addEventListener("click", () => {
      aside.classList.add(CLOSED_CLASS);
      overlay.classList.add("hidden");
    });
  if (siteTitle)
    siteTitle.addEventListener("click", (e) => {
      e.preventDefault();
      showMain();
    });
  if (sidebarHeading)
    sidebarHeading.addEventListener("click", (e) => {
      e.preventDefault();
      showMain();
      aside.classList.add(CLOSED_CLASS);
      overlay.classList.add("hidden");
    });
  showMain();
});
