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
    { month: 'Jan', amount: 12450, anomaly: false },
    { month: 'Feb', amount: 11890, anomaly: false },
    { month: 'Mar', amount: 43291, anomaly: true }, // 93% spike
    { month: 'Apr', amount: 13200, anomaly: false },
    { month: 'May', amount: 14100, anomaly: false },
    { month: 'Jun', amount: 13800, anomaly: false },
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

  aiIntents.forEach(({ action, label }) => {
    const button = document.createElement('ai-action-button');
    button.setAttribute('action', action);
    button.setAttribute('variant', 'secondary');
    button.setAttribute('size', 'md');
    button.textContent = label;

    // Listen for AI action events
    button.addEventListener('ai:action-triggered', (e: Event) => {
      const customEvent = e as CustomEvent;
      handleAiAction(customEvent.detail.action);
    });

    actionList.appendChild(button);
  });
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

    // Add result message (simplified for now)
    const resultText = getSimulatedResult(action);
    addMessage('ai', resultText);
  }, 1500);
}

/**
 * Get simulated AI result based on action
 */
function getSimulatedResult(action: string): string {
  const resultMap: Record<string, string> = {
    explain: `
      <div>
        <p><strong>Explanation:</strong></p>
        <p>Your ${currentDataset} data shows interesting patterns. The March spike is likely due to a marketing campaign.</p>
        <p><strong>Key Drivers:</strong></p>
        <ul>
          <li>Campaign launch: 85% impact</li>
          <li>Seasonal trend: 15% impact</li>
        </ul>
      </div>
    `,
    summarize: `
      <div>
        <p><strong>Summary:</strong></p>
        <ul>
          <li>Total data points: ${datasets[currentDataset].length}</li>
          <li>Trend: Generally stable with one anomaly</li>
          <li>Recommendation: Monitor March spike closely</li>
        </ul>
      </div>
    `,
    forecast: `
      <div>
        <p><strong>Forecast for Next Quarter:</strong></p>
        <p>Based on historical trends, we predict a 15% increase.</p>
        <p><ai-confidence-badge score="0.87" show-percentage></ai-confidence-badge></p>
      </div>
    `,
    detect_anomaly: `
      <div>
        <p><strong>Anomalies Detected:</strong></p>
        <p>Found 1 anomaly in your data:</p>
        <ul>
          <li>March 2024: 93% increase (High severity)</li>
        </ul>
        <p><ai-confidence-badge score="0.95" show-percentage></ai-confidence-badge></p>
      </div>
    `,
    classify: `
      <div>
        <p><strong>Classification Results:</strong></p>
        <p>Your data has been classified into 3 categories:</p>
        <ul>
          <li>Normal: 5 items</li>
          <li>Anomaly: 1 item</li>
        </ul>
      </div>
    `,
    optimize: `
      <div>
        <p><strong>Optimization Suggestions:</strong></p>
        <ul>
          <li>Reduce spending during low-impact months</li>
          <li>Increase budget for high-return campaigns</li>
          <li>Consider quarterly reviews instead of monthly</li>
        </ul>
      </div>
    `,
    compare: `
      <div>
        <p><strong>Comparison Results:</strong></p>
        <p>Comparing current period vs previous:</p>
        <ul>
          <li>Average: +12% increase</li>
          <li>Volatility: +5% higher</li>
          <li>Trend: Upward trajectory</li>
        </ul>
      </div>
    `,
    cluster: `
      <div>
        <p><strong>Clustering Results:</strong></p>
        <p>Your data has been grouped into 2 clusters:</p>
        <ul>
          <li>Cluster 1 (Normal): 5 items</li>
          <li>Cluster 2 (High): 1 item</li>
        </ul>
      </div>
    `,
  };

  return resultMap[action] || 'AI result will appear here';
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
