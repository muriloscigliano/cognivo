/**
 * Cognivo AI Chat Demo - Main Application
 *
 * This demo showcases Cognivo AI components in a realistic chat interface.
 * Components are tested as they're built, providing visual feedback and integration testing.
 */

import '@cognivo/components';
import { AiIntent } from '@cognivo/core';

// Sample datasets for testing
const datasets = {
  spending: [
    { month: 'Jan', amount: 12450, _anomaly: false },
    { month: 'Feb', amount: 11890, _anomaly: false },
    { month: 'Mar', amount: 43291, _anomaly: true, _anomalySeverity: 'critical', _confidence: 0.95 }, // 93% spike
    { month: 'Apr', amount: 13200, _anomaly: false },
    { month: 'May', amount: 14100, _anomaly: false },
    { month: 'Jun', amount: 13800, _anomaly: false },
  ],
  revenue: [
    { product: 'Pro Plan', revenue: 45000, growth: 0.23 },
    { product: 'Enterprise', revenue: 128000, growth: 0.45 },
    { product: 'Starter', revenue: 23000, growth: 0.12 },
    { product: 'Team', revenue: 67000, growth: 0.31 },
  ],
  users: [
    { date: '2024-01-01', signups: 234, churn: 12 },
    { date: '2024-01-02', signups: 156, churn: 8 },
    { date: '2024-01-03', signups: 289, churn: 15 },
    { date: '2024-01-04', signups: 312, churn: 9 },
  ],
};

// App state
let currentDataset: keyof typeof datasets = 'spending';
let messageCount = 0;
let actionCount = 0;

// DOM elements
const messagesContainer = document.getElementById('messages') as HTMLDivElement;
const messageInput = document.getElementById('message-input') as HTMLInputElement;
const sendButton = document.getElementById('send-button') as HTMLButtonElement;
const clearButton = document.getElementById('clear-chat') as HTMLButtonElement;
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
const actionList = document.getElementById('action-list') as HTMLDivElement;
const messageCountEl = document.getElementById('message-count') as HTMLSpanElement;
const actionCountEl = document.getElementById('action-count') as HTMLSpanElement;

// AI Intents (all 8)
const aiIntents = [
  { action: 'explain', label: 'Explain' },
  { action: 'summarize', label: 'Summarize' },
  { action: 'forecast', label: 'Forecast' },
  { action: 'detect_anomaly', label: 'Detect Anomaly' },
  { action: 'classify', label: 'Classify' },
  { action: 'optimize', label: 'Optimize' },
  { action: 'compare', label: 'Compare' },
  { action: 'cluster', label: 'Cluster' },
];

/**
 * Initialize the app
 */
function init() {
  // Create AI action buttons
  createActionButtons();

  // Event listeners
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  clearButton.addEventListener('click', clearChat);
  themeToggle.addEventListener('click', toggleTheme);

  // Dataset selector
  document.querySelectorAll('.dataset-button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const dataset = target.dataset.dataset as keyof typeof datasets;
      selectDataset(dataset);
    });
  });

  console.log('✨ Cognivo AI Chat Demo initialized');
}

/**
 * Create AI action buttons in sidebar
 */
function createActionButtons() {
  actionList.innerHTML = '';

  // Use AI Action Group component!
  const actionGroup = document.createElement('ai-action-group');
  actionGroup.setAttribute('layout', 'vertical');
  actionGroup.setAttribute('size', 'md');
  actionGroup.setAttribute('variant', 'secondary');
  actionGroup.setAttribute('label', 'Available AI Actions');

  // Set actions array
  (actionGroup as any).actions = aiIntents.map(({ action }) => action);

  // Listen for action events
  actionGroup.addEventListener('ai:action-selected', (e: Event) => {
    const customEvent = e as CustomEvent;
    handleAiAction(customEvent.detail.action);
  });

  actionList.appendChild(actionGroup);
}

/**
 * Send a user message
 */
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  // Add user message
  addMessage('user', text);

  // Clear input
  messageInput.value = '';

  // Simulate AI response (for now, just echo)
  setTimeout(() => {
    addMessage(
      'ai',
      `You said: "${text}". (AI responses will be implemented as we build more components)`
    );
  }, 500);
}

/**
 * Handle AI action triggered
 */
function handleAiAction(action: string) {
  actionCount++;
  updateStats();

  // Add system message showing which action was triggered
  const data = datasets[currentDataset];
  addMessage(
    'system',
    `🤖 AI Action "${action}" triggered on ${currentDataset} dataset (${data.length} items)`
  );

  // Simulate AI processing
  const loadingMsg = addMessage(
    'ai',
    '<ai-thinking-indicator size="md"></ai-thinking-indicator> Processing...',
    true
  );

  setTimeout(() => {
    // Remove loading message
    loadingMsg.remove();

    // Add result message using AI Result Panel
    const result = getSimulatedResult(action);
    const panelHtml = `
      <ai-result-panel
        title="${result.title}"
        confidence="${result.confidence}"
        timestamp="${new Date().toISOString()}"
        dismissible
        ${result.variant ? `variant="${result.variant}"` : ''}
      >
        ${result.content}
      </ai-result-panel>
    `;
    addMessage('ai', panelHtml, true);
  }, 1500);
}

/**
 * Get simulated AI result based on action
 */
function getSimulatedResult(action: string): { title: string; content: string; confidence: number; variant?: string } {
  const resultMap: Record<string, { title: string; content: string; confidence: number; variant?: string }> = {
    explain: {
      title: 'Data Explanation',
      confidence: 0.92,
      content: `
        <p>Your ${currentDataset} data shows interesting patterns. The March spike is likely due to a marketing campaign launch.</p>
        <h3>Key Drivers</h3>
        <ul>
          <li><strong>Campaign launch:</strong> 85% impact</li>
          <li><strong>Seasonal trend:</strong> 15% impact</li>
        </ul>
        <p>The campaign had a significant one-time effect, while seasonal variations contributed minimally.</p>
      `,
    },
    summarize: {
      title: 'Data Summary',
      confidence: 0.88,
      content: `
        <ul>
          <li><strong>Total data points:</strong> ${datasets[currentDataset].length}</li>
          <li><strong>Overall trend:</strong> Generally stable with one anomaly</li>
          <li><strong>Recommendation:</strong> Monitor March spike closely</li>
          <li><strong>Risk level:</strong> Low to moderate</li>
        </ul>
      `,
    },
    forecast: {
      title: 'Revenue Forecast',
      confidence: 0.87,
      variant: 'success',
      content: `
        <p>Based on historical trends and current trajectory:</p>
        <ai-mini-chart
          .data=${JSON.stringify([
            { label: 'Jan', value: 12450, anomaly: false },
            { label: 'Feb', value: 11890, anomaly: false },
            { label: 'Mar', value: 43291, anomaly: true },
            { label: 'Apr', value: 13200, anomaly: false },
            { label: 'May', value: 14100, forecast: true },
            { label: 'Jun', value: 15200, forecast: true },
          ])}
          type="line"
          show-forecast
          show-anomalies
          show-grid
          height="250px"
        ></ai-mini-chart>
        <h3 style="margin-top: 16px">Projection Summary</h3>
        <ul>
          <li><strong>Expected growth:</strong> +15% next quarter</li>
          <li><strong>Confidence interval:</strong> 12-18%</li>
          <li><strong>Key factors:</strong> Seasonal patterns, recent performance</li>
        </ul>
      `,
    },
    detect_anomaly: {
      title: 'Anomaly Detection',
      confidence: 0.95,
      variant: 'warning',
      content: `
        <p><strong>Found 1 significant anomaly in your data:</strong></p>
        <ai-table
          .columns=${JSON.stringify([
            { key: 'month', label: 'Month', sortable: true },
            { key: 'amount', label: 'Amount', type: 'currency', sortable: true, align: 'right' },
            { key: '_anomaly', label: 'Status', type: 'anomaly' },
          ])}
          .data=${JSON.stringify(datasets[currentDataset])}
          highlight-anomalies
          show-legend
          striped
          hoverable
        ></ai-table>
      `,
    },
    classify: {
      title: 'Classification Results',
      confidence: 0.91,
      content: `
        <p>Your data has been automatically classified into distinct categories:</p>
        <h3>Categories</h3>
        <ul>
          <li><strong>Normal:</strong> 5 items (83%)</li>
          <li><strong>Anomaly:</strong> 1 item (17%)</li>
        </ul>
        <p>Classification based on statistical patterns and historical baselines.</p>
      `,
    },
    optimize: {
      title: 'Optimization Recommendations',
      confidence: 0.84,
      variant: 'success',
      content: `
        <p>Based on your data patterns, here are AI-powered optimization suggestions:</p>
        <h3>Action Items</h3>
        <ul>
          <li><strong>Budget allocation:</strong> Reduce spending during low-impact months by 15-20%</li>
          <li><strong>Campaign timing:</strong> Increase budget for high-return periods</li>
          <li><strong>Review frequency:</strong> Switch to quarterly reviews instead of monthly</li>
          <li><strong>Cost savings:</strong> Potential 12% reduction in overhead</li>
        </ul>
      `,
    },
    compare: {
      title: 'Period Comparison',
      confidence: 0.89,
      content: `
        <p>Comparing current period against previous baseline:</p>
        <h3>Key Metrics</h3>
        <ul>
          <li><strong>Average change:</strong> +12% increase</li>
          <li><strong>Volatility:</strong> +5% higher variation</li>
          <li><strong>Trend direction:</strong> Upward trajectory</li>
          <li><strong>Consistency:</strong> Moderate (some fluctuation)</li>
        </ul>
      `,
    },
    cluster: {
      title: 'Clustering Analysis',
      confidence: 0.86,
      content: `
        <p>Your data has been grouped into meaningful clusters:</p>
        <h3>Clusters Identified</h3>
        <ul>
          <li><strong>Cluster 1 (Normal):</strong> 5 items - Typical baseline performance</li>
          <li><strong>Cluster 2 (High):</strong> 1 item - Outlier with exceptional values</li>
        </ul>
        <p>Clustering method: K-means with automatic cluster detection.</p>
      `,
    },
  };

  return resultMap[action] || {
    title: 'AI Result',
    content: 'AI result will appear here',
    confidence: 0
  };
}

/**
 * Add a message to the chat
 */
function addMessage(
  type: 'user' | 'ai' | 'system',
  content: string,
  isHtml: boolean = false
): HTMLDivElement {
  messageCount++;
  updateStats();

  const messageEl = document.createElement('div');
  messageEl.className = `message ${type}`;

  const contentEl = document.createElement('div');
  contentEl.className = 'message-content';

  if (isHtml) {
    contentEl.innerHTML = content;
  } else {
    contentEl.innerHTML = `<p>${content}</p>`;
  }

  messageEl.appendChild(contentEl);
  messagesContainer.appendChild(messageEl);

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  return messageEl;
}

/**
 * Clear chat
 */
function clearChat() {
  messagesContainer.innerHTML = `
    <div class="message system">
      <div class="message-content">
        <p>Chat cleared. Click an AI action or type a message to start.</p>
      </div>
    </div>
  `;
  messageCount = 0;
  actionCount = 0;
  updateStats();
}

/**
 * Toggle dark mode
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);

  const themeIcon = themeToggle.querySelector('.theme-icon') as HTMLSpanElement;
  themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

/**
 * Select dataset
 */
function selectDataset(dataset: keyof typeof datasets) {
  currentDataset = dataset;

  // Update active state
  document.querySelectorAll('.dataset-button').forEach((button) => {
    button.classList.remove('active');
  });

  const activeButton = document.querySelector(
    `[data-dataset="${dataset}"]`
  ) as HTMLButtonElement;
  activeButton?.classList.add('active');

  // Show message
  addMessage(
    'system',
    `Switched to ${dataset} dataset (${datasets[dataset].length} items)`
  );
}

/**
 * Update stats
 */
function updateStats() {
  messageCountEl.textContent = messageCount.toString();
  actionCountEl.textContent = actionCount.toString();
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
