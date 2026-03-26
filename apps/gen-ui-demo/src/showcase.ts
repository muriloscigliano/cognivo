/**
 * Cognivo Component Showcase — HeroUI-style sidebar + component pages
 * Pure client-side routing via hash. No framework dependency.
 */
import '../../../packages/tokens/dist/index.css';
import '@cognivo/components';
import { registry, categories } from './pages/registry';
import { renderComponentPage, renderWelcome } from './pages/render';

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const sidebarEl = document.getElementById('sidebar')!;
const mainEl = document.getElementById('main')!;
const searchEl = document.getElementById('search') as HTMLInputElement;
const themeToggle = document.getElementById('theme-toggle')!;
const countBadge = document.getElementById('count-badge')!;

// ─── State ────────────────────────────────────────────────────────────────────
let currentTag: string = '';
let searchQuery: string = '';

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function renderSidebar(filter: string = '') {
  const lf = filter.toLowerCase();
  let html = '';

  for (const cat of categories) {
    const items = registry.filter(c => c.category === cat.id);
    const filtered = lf
      ? items.filter(c => c.name.toLowerCase().includes(lf) || c.tag.includes(lf))
      : items;

    if (filtered.length === 0) continue;

    html += `<div class="sidebar-category">`;
    html += `<div class="category-label">${cat.label} (${filtered.length})</div>`;
    for (const comp of filtered) {
      const active = comp.tag === currentTag ? 'active' : '';
      html += `<a class="sidebar-item ${active}" href="#${comp.tag}" data-tag="${comp.tag}">
        <span class="tag-prefix">&lt;</span>${comp.name}
      </a>`;
    }
    html += `</div>`;
  }

  sidebarEl.innerHTML = html;

  sidebarEl.querySelectorAll('.sidebar-item').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate((el as HTMLElement).dataset.tag!);
    });
  });
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function navigate(tag: string) {
  currentTag = tag;
  window.location.hash = tag;
  renderSidebar(searchQuery);
  renderPage();
}

function renderPage() {
  if (!currentTag) {
    mainEl.innerHTML = '';
    renderWelcome(mainEl, registry.length);
    return;
  }

  const comp = registry.find(c => c.tag === currentTag);
  if (!comp) {
    mainEl.innerHTML = `<div style="padding: 40px; color: var(--text-muted);">Component not found: ${currentTag}</div>`;
    return;
  }

  mainEl.innerHTML = '';
  renderComponentPage(mainEl, comp);
  mainEl.scrollTop = 0;
}

// ─── Search ───────────────────────────────────────────────────────────────────
searchEl.addEventListener('input', () => {
  searchQuery = searchEl.value;
  renderSidebar(searchQuery);
});

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchEl.focus();
    searchEl.select();
  }
});

// ─── Theme toggle ─────────────────────────────────────────────────────────────
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? 'Light' : 'Dark';
});

// ─── Init ─────────────────────────────────────────────────────────────────────
countBadge.textContent = `${registry.length} components`;

const initialHash = window.location.hash.slice(1);
if (initialHash) currentTag = initialHash;

renderSidebar();
renderPage();

window.addEventListener('hashchange', () => {
  currentTag = window.location.hash.slice(1);
  renderSidebar(searchQuery);
  renderPage();
});
