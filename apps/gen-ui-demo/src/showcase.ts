/**
 * Cognivo Component Showcase
 */
import '../../../packages/tokens/dist/index.css';
import '@cognivo/components';
import { registry, categories } from './pages/registry';
import { renderComponentPage, renderWelcome } from './pages/render';

const sidebarEl = document.getElementById('sidebar')!;
const mainEl = document.getElementById('main')!;
const searchEl = document.getElementById('search') as HTMLInputElement;
const themeToggle = document.getElementById('theme-toggle')!;
const countBadge = document.getElementById('count-badge')!;

let currentTag = '';
let searchQuery = '';

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function renderSidebar(filter = '') {
  const lf = filter.toLowerCase();
  let html = '';

  for (const cat of categories) {
    const items = registry.filter(c => c.category === cat.id);
    const filtered = lf
      ? items.filter(c => c.name.toLowerCase().includes(lf) || c.tag.includes(lf))
      : items;

    if (filtered.length === 0) continue;

    html += `<div class="cat-title">${cat.label}</div>`;
    for (const comp of filtered) {
      const active = comp.tag === currentTag ? ' active' : '';
      html += `<a class="sb-item${active}" href="#${comp.tag}" data-tag="${comp.tag}"><span class="sb-tag">&lt;</span>${comp.name}</a>`;
    }
  }

  sidebarEl.innerHTML = html;

  sidebarEl.querySelectorAll('.sb-item').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate((el as HTMLElement).dataset.tag!);
    });
  });
}

// ─── Navigation ──────────────────────────────────────────────────────────────
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
    mainEl.innerHTML = `<div style="padding:48px;color:var(--text-3)">Component not found: ${currentTag}</div>`;
    return;
  }

  mainEl.innerHTML = '';
  renderComponentPage(mainEl, comp);
  mainEl.scrollTop = 0;
}

// ─── Search ──────────────────────────────────────────────────────────────────
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

// ─── Theme ───────────────────────────────────────────────────────────────────
const sunSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
const moonSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.innerHTML = isDark ? moonSvg : sunSvg;
});

// ─── Init ────────────────────────────────────────────────────────────────────
countBadge.textContent = `${registry.length}`;
themeToggle.innerHTML = sunSvg;

const initialHash = window.location.hash.slice(1);
if (initialHash) currentTag = initialHash;

renderSidebar();
renderPage();

window.addEventListener('hashchange', () => {
  currentTag = window.location.hash.slice(1);
  renderSidebar(searchQuery);
  renderPage();
});
