import { AiIntent, type AiContext } from '@cognivo/core';

/**
 * Prompt Templates for each AI Intent
 *
 * These prompts guide the LLM to produce the correct structured output.
 */

export function buildPrompt(intent: AiIntent, context: AiContext): string {
  const { dataset, selection, meta } = context;

  const datasetStr = JSON.stringify(dataset, null, 2);
  const selectionStr = selection ? JSON.stringify(selection, null, 2) : null;

  switch (intent) {
    case AiIntent.EXPLAIN:
      return `Analyze this ${meta?.dataType || 'data'} dataset and explain key patterns, trends, and insights.

Dataset:
${datasetStr}

${selectionStr ? `User Selection:\n${selectionStr}\n` : ''}

Metadata:
- Timeframe: ${meta?.timeframe || 'unknown'}
- Unit: ${meta?.unit || 'unknown'}
- Category: ${meta?.category || 'unknown'}

Provide:
1. A clear explanation of what's happening in the data
2. Key bullet points (3-5 most important insights)
3. Drivers/factors that explain the patterns (with impact -100 to 100)
4. Any anomalies or notable outliers
5. Your confidence in this analysis (0-1)

Be concise but insightful. Focus on actionable insights.`;

    case AiIntent.FORECAST:
      return `Forecast future values for this time series dataset.

Dataset:
${datasetStr}

Metadata:
- Timeframe: ${meta?.timeframe || 'unknown'}
- Unit: ${meta?.unit || 'unknown'}

Provide:
1. Predicted values for the next 3 periods
2. Confidence intervals (upper and lower bounds)
3. Explanation of your forecast methodology
4. Overall confidence in the forecast (0-1)

Use appropriate forecasting techniques based on the data pattern.`;

    case AiIntent.DETECT_ANOMALY:
      return `Detect anomalies and unusual patterns in this dataset.

Dataset:
${datasetStr}

Metadata:
- Timeframe: ${meta?.timeframe || 'unknown'}
- Unit: ${meta?.unit || 'unknown'}

Provide:
1. List of anomalies with their index in the dataset
2. Reason why each is anomalous
3. Severity (low, medium, high)
4. Confidence for each detection (0-1)
5. Overall summary

Be specific about what makes each point anomalous.`;

    case AiIntent.SUMMARIZE:
      return `Summarize this dataset into key takeaways.

Dataset:
${datasetStr}

Metadata:
- Timeframe: ${meta?.timeframe || 'unknown'}
- Unit: ${meta?.unit || 'unknown'}
- Category: ${meta?.category || 'unknown'}

Provide:
1. Concise summary (2-3 sentences)
2. Key bullet points (3-5 most important facts)
3. Confidence in this summary (0-1)

Focus on the most important information.`;

    case AiIntent.CLASSIFY:
      return `Classify/categorize each item in this dataset.

Dataset:
${datasetStr}

Metadata:
- Category domain: ${meta?.category || 'general'}

Provide:
1. Category assignment for each item (by index)
2. Confidence for each classification (0-1)
3. Explanation of classification logic
4. Overall confidence (0-1)

Be consistent with category names.`;

    case AiIntent.OPTIMIZE:
      return `Analyze this data and suggest optimizations or improvements.

Dataset:
${datasetStr}

Metadata:
- Timeframe: ${meta?.timeframe || 'unknown'}
- Unit: ${meta?.unit || 'unknown'}
- Category: ${meta?.category || 'unknown'}

Provide:
1. Analysis of current state
2. Specific recommendations for improvement
3. Priority (low, medium, high) for each
4. Expected impact
5. Effort required (low, medium, high)
6. Overall confidence (0-1)

Be practical and actionable.`;

    case AiIntent.COMPARE:
      return `Compare and contrast the data, finding key differences.

Dataset:
${datasetStr}

${selectionStr ? `Comparing against:\n${selectionStr}\n` : ''}

Metadata:
- Timeframe: ${meta?.timeframe || 'unknown'}
- Unit: ${meta?.unit || 'unknown'}

Provide:
1. Comparison analysis
2. Key differences as bullet points
3. Drivers of differences (with impact)
4. Confidence (0-1)

Highlight the most significant differences.`;

    case AiIntent.CLUSTER:
      return `Group similar items in this dataset into clusters.

Dataset:
${datasetStr}

Metadata:
- Category domain: ${meta?.category || 'general'}

Provide:
1. Cluster assignment for each item (by index)
2. Cluster names/categories
3. Confidence for each assignment (0-1)
4. Explanation of clustering approach
5. Overall confidence (0-1)

Create meaningful, coherent clusters.`;

    default:
      throw new Error(`Unknown intent: ${intent}`);
  }
}

/**
 * System prompt for all requests
 */
export const SYSTEM_PROMPT = `You are a data analysis assistant. Analyze the provided data and return structured insights in JSON format.

Guidelines:
- Be concise but insightful
- Focus on actionable insights
- Confidence scores should reflect actual certainty
- All numeric values should be precise
- Always follow the required JSON schema exactly`;
