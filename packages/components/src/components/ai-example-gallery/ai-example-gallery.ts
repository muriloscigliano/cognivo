import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  prompt?: string;
  output?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  author?: string;
  likes?: number;
  featured?: boolean;
}

/**
 * AI Example Gallery
 *
 * Shape of AI Pattern: Wayfinder > Example Gallery
 *
 * Shows sample generations, prompts, and outputs to educate
 * and inspire users. Helps avoid blank canvas intimidation.
 *
 * @element ai-example-gallery
 *
 * @fires ai:example-select - Fired when an example is selected
 * @fires ai:example-try - Fired when "Try this" is clicked
 * @fires ai:example-copy - Fired when prompt is copied
 */
@customElement('ai-example-gallery')
export class AiExampleGallery extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        font-family: ${tokens.fontFamily.primary};
      }

      .gallery-container {
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.xl};
        overflow: hidden;
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
      }

      .title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .ai-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.aiAccent};
      }

      /* Filter tabs */
      .filter-tabs {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
        overflow-x: auto;
      }

      .filter-tab {
        padding: 6px 14px;
        background: none;
        border: 1px solid transparent;
        border-radius: ${tokens.radius.full};
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray600};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        white-space: nowrap;
      }

      .filter-tab:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray800};
      }

      .filter-tab.active {
        background: ${tokens.color.aiBackground};
        border-color: ${tokens.color.aiBorder};
        color: ${tokens.color.aiAccent};
      }

      /* Gallery grid */
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: ${tokens.spacing.md};
        padding: ${tokens.spacing.lg};
      }

      /* Gallery card */
      .gallery-card {
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
        cursor: pointer;
        transition: all ${tokens.transition.fast};
        position: relative;
      }

      .gallery-card:hover {
        border-color: ${tokens.color.aiAccent};
        box-shadow: 0 4px 20px rgba(139, 92, 246, 0.15);
        transform: translateY(-2px);
      }

      .gallery-card.featured {
        border-color: ${tokens.color.aiAccent};
      }

      .featured-badge {
        position: absolute;
        top: ${tokens.spacing.sm};
        right: ${tokens.spacing.sm};
        padding: 4px 8px;
        background: linear-gradient(135deg, ${tokens.color.aiAccent}, #06b6d4);
        border-radius: ${tokens.radius.full};
        font-size: 10px;
        font-weight: ${tokens.fontWeight.bold};
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .card-thumbnail {
        width: 100%;
        height: 140px;
        background: ${tokens.color.gray100};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        color: ${tokens.color.gray400};
        overflow: hidden;
      }

      .card-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .card-content {
        padding: ${tokens.spacing.md};
      }

      .card-title {
        font-size: ${tokens.fontSize.md};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
        margin-bottom: ${tokens.spacing.xs};
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .card-description {
        font-size: ${tokens.fontSize.sm};
        color: ${tokens.color.gray500};
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: ${tokens.spacing.sm};
      }

      .card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: ${tokens.spacing.sm};
      }

      .tag {
        padding: 2px 8px;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.full};
        font-size: 10px;
        color: ${tokens.color.gray600};
      }

      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: ${tokens.spacing.sm};
        border-top: 1px solid ${tokens.color.gray100};
      }

      .card-meta {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.sm};
        font-size: ${tokens.fontSize.xs};
        color: ${tokens.color.gray500};
      }

      .likes {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .card-actions {
        display: flex;
        gap: ${tokens.spacing.xs};
      }

      .action-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        background: ${tokens.color.aiBackground};
        border: 1px solid ${tokens.color.aiBorder};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.medium};
        color: ${tokens.color.aiAccent};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .action-btn:hover {
        background: ${tokens.color.aiAccent};
        color: white;
      }

      /* Detail modal */
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all ${tokens.transition.default};
        padding: ${tokens.spacing.lg};
      }

      .modal-overlay.open {
        opacity: 1;
        visibility: visible;
      }

      .modal {
        width: 100%;
        max-width: 700px;
        max-height: 90vh;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.xl};
        overflow: hidden;
        transform: scale(0.95);
        transition: all ${tokens.transition.default};
      }

      .modal-overlay.open .modal {
        transform: scale(1);
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-bottom: 1px solid ${tokens.color.gray100};
      }

      .modal-title {
        font-size: ${tokens.fontSize.lg};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      .close-btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${tokens.color.gray100};
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: 18px;
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .close-btn:hover {
        background: ${tokens.color.gray200};
        color: ${tokens.color.gray700};
      }

      .modal-body {
        padding: ${tokens.spacing.lg};
        overflow-y: auto;
        max-height: calc(90vh - 140px);
      }

      .prompt-section, .output-section {
        margin-bottom: ${tokens.spacing.lg};
      }

      .section-label {
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        font-size: ${tokens.fontSize.xs};
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray500};
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: ${tokens.spacing.sm};
      }

      .prompt-box, .output-box {
        padding: ${tokens.spacing.md};
        background: ${tokens.color.gray50};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        line-height: 1.6;
        color: ${tokens.color.gray700};
        position: relative;
      }

      .copy-btn {
        position: absolute;
        top: ${tokens.spacing.sm};
        right: ${tokens.spacing.sm};
        padding: 4px 8px;
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        border-radius: ${tokens.radius.sm};
        font-size: 11px;
        color: ${tokens.color.gray500};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .copy-btn:hover {
        background: ${tokens.color.gray100};
        color: ${tokens.color.gray700};
      }

      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: ${tokens.spacing.sm};
        padding: ${tokens.spacing.md} ${tokens.spacing.lg};
        border-top: 1px solid ${tokens.color.gray100};
        background: ${tokens.color.gray50};
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: none;
        border-radius: ${tokens.radius.md};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        cursor: pointer;
        transition: all ${tokens.transition.fast};
      }

      .btn-secondary {
        background: ${tokens.color.grayWhite};
        border: 1px solid ${tokens.color.gray200};
        color: ${tokens.color.gray700};
      }

      .btn-secondary:hover {
        background: ${tokens.color.gray50};
      }

      .btn-primary {
        background: ${tokens.color.aiAccent};
        color: white;
      }

      .btn-primary:hover {
        opacity: 0.9;
      }

      /* Empty state */
      .empty-state {
        padding: ${tokens.spacing.xl};
        text-align: center;
        color: ${tokens.color.gray500};
      }

      .empty-icon {
        font-size: 48px;
        margin-bottom: ${tokens.spacing.md};
        opacity: 0.5;
      }

      /* Loading skeleton */
      .skeleton-card {
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.lg};
        overflow: hidden;
      }

      .skeleton-thumbnail {
        height: 140px;
        background: linear-gradient(90deg, ${tokens.color.gray100} 0%, ${tokens.color.gray200} 50%, ${tokens.color.gray100} 100%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }

      .skeleton-content {
        padding: ${tokens.spacing.md};
      }

      .skeleton-line {
        height: 12px;
        background: linear-gradient(90deg, ${tokens.color.gray100} 0%, ${tokens.color.gray200} 50%, ${tokens.color.gray100} 100%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
        margin-bottom: ${tokens.spacing.sm};
      }

      .skeleton-line:last-child {
        width: 60%;
      }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `
  ];

  @property({ type: Array }) items: GalleryItem[] = [];
  @property({ type: Array }) categories: string[] = [];
  @property({ type: String }) title = 'Example Gallery';
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean, attribute: 'show-filters' }) showFilters = true;

  @state() private selectedCategory = 'all';
  @state() private selectedItem: GalleryItem | null = null;
  @state() private modalOpen = false;

  private getFilteredItems(): GalleryItem[] {
    if (this.selectedCategory === 'all') {
      return this.items;
    }
    return this.items.filter(item => item.category === this.selectedCategory);
  }

  private getCategories(): string[] {
    if (this.categories.length > 0) {
      return this.categories;
    }
    const cats = new Set(this.items.map(item => item.category).filter(Boolean));
    return Array.from(cats) as string[];
  }

  private handleCardClick(item: GalleryItem) {
    this.selectedItem = item;
    this.modalOpen = true;

    this.dispatchEvent(new CustomEvent('ai:example-select', {
      detail: { item },
      bubbles: true,
      composed: true
    }));
  }

  private handleTryThis(e: Event, item: GalleryItem) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('ai:example-try', {
      detail: { item, prompt: item.prompt },
      bubbles: true,
      composed: true
    }));
  }

  private handleCopyPrompt(item: GalleryItem) {
    if (item.prompt) {
      navigator.clipboard.writeText(item.prompt);
      this.dispatchEvent(new CustomEvent('ai:example-copy', {
        detail: { item, prompt: item.prompt },
        bubbles: true,
        composed: true
      }));
    }
  }

  private closeModal() {
    this.modalOpen = false;
    this.selectedItem = null;
  }

  override render() {
    const filteredItems = this.getFilteredItems();
    const categories = this.getCategories();

    return html`
      <div class="gallery-container">
        <div class="header">
          <div class="header-left">
            <span class="title">${this.title}</span>
            <span class="ai-badge">
              <span>✨</span>
              <span>AI Examples</span>
            </span>
          </div>
        </div>

        ${this.showFilters && categories.length > 0 ? html`
          <div class="filter-tabs">
            <button
              class="filter-tab ${this.selectedCategory === 'all' ? 'active' : ''}"
              @click=${() => this.selectedCategory = 'all'}
            >All</button>
            ${categories.map(cat => html`
              <button
                class="filter-tab ${this.selectedCategory === cat ? 'active' : ''}"
                @click=${() => this.selectedCategory = cat}
              >${cat}</button>
            `)}
          </div>
        ` : null}

        <div class="gallery-grid">
          ${this.loading ? html`
            ${Array(6).fill(0).map(() => html`
              <div class="skeleton-card">
                <div class="skeleton-thumbnail"></div>
                <div class="skeleton-content">
                  <div class="skeleton-line"></div>
                  <div class="skeleton-line"></div>
                </div>
              </div>
            `)}
          ` : filteredItems.length > 0 ? filteredItems.map(item => html`
            <div
              class="gallery-card ${item.featured ? 'featured' : ''}"
              @click=${() => this.handleCardClick(item)}
            >
              ${item.featured ? html`<span class="featured-badge">Featured</span>` : null}

              <div class="card-thumbnail">
                ${item.thumbnail ? html`
                  <img src=${item.thumbnail} alt=${item.title} />
                ` : html`
                  <span>✨</span>
                `}
              </div>

              <div class="card-content">
                <div class="card-title">${item.title}</div>
                ${item.description ? html`
                  <div class="card-description">${item.description}</div>
                ` : null}

                ${item.tags?.length ? html`
                  <div class="card-tags">
                    ${item.tags.slice(0, 3).map(tag => html`
                      <span class="tag">${tag}</span>
                    `)}
                  </div>
                ` : null}

                <div class="card-footer">
                  <div class="card-meta">
                    ${item.author ? html`<span>by ${item.author}</span>` : null}
                    ${item.likes ? html`
                      <span class="likes">
                        <span>❤️</span>
                        <span>${item.likes}</span>
                      </span>
                    ` : null}
                  </div>
                  <div class="card-actions">
                    <button class="action-btn" @click=${(e: Event) => this.handleTryThis(e, item)}>
                      Try this
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `) : html`
            <div class="empty-state" style="grid-column: 1 / -1;">
              <div class="empty-icon">🎨</div>
              <div>No examples found</div>
            </div>
          `}
        </div>
      </div>

      <!-- Detail Modal -->
      <div class="modal-overlay ${this.modalOpen ? 'open' : ''}" @click=${this.closeModal}>
        ${this.selectedItem ? html`
          <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
            <div class="modal-header">
              <span class="modal-title">${this.selectedItem.title}</span>
              <button class="close-btn" @click=${this.closeModal}>×</button>
            </div>

            <div class="modal-body">
              ${this.selectedItem.prompt ? html`
                <div class="prompt-section">
                  <div class="section-label">
                    <span>📝</span>
                    <span>Prompt</span>
                  </div>
                  <div class="prompt-box">
                    ${this.selectedItem.prompt}
                    <button class="copy-btn" @click=${() => this.handleCopyPrompt(this.selectedItem!)}>
                      Copy
                    </button>
                  </div>
                </div>
              ` : null}

              ${this.selectedItem.output ? html`
                <div class="output-section">
                  <div class="section-label">
                    <span>✨</span>
                    <span>AI Output</span>
                  </div>
                  <div class="output-box">
                    ${this.selectedItem.output}
                  </div>
                </div>
              ` : null}

              ${this.selectedItem.description ? html`
                <div class="output-section">
                  <div class="section-label">
                    <span>📖</span>
                    <span>Description</span>
                  </div>
                  <p style="color: var(--cg-color-gray-600); line-height: 1.6;">
                    ${this.selectedItem.description}
                  </p>
                </div>
              ` : null}
            </div>

            <div class="modal-footer">
              <button class="btn btn-secondary" @click=${this.closeModal}>Close</button>
              <button class="btn btn-primary" @click=${(e: Event) => { this.handleTryThis(e, this.selectedItem!); this.closeModal(); }}>
                <span>✨</span>
                Try this prompt
              </button>
            </div>
          </div>
        ` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-example-gallery': AiExampleGallery;
  }
}
