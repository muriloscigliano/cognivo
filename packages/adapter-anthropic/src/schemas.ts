import { AiIntent } from '@cognivo/core';

/**
 * Anthropic Tool Definition
 *
 * Anthropic uses `tool_use` for structured outputs.
 * Each intent maps to a tool definition with an input_schema.
 */
export interface ToolDefinition {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

/**
 * Tool definitions for each AI intent.
 *
 * These map each intent to an Anthropic tool definition that produces
 * structured output matching the AiResult interface.
 */
export const tools: Record<AiIntent, ToolDefinition> = {
  [AiIntent.EXPLAIN]: {
    name: 'explain_result',
    description: 'Provide an explanation of the data with key insights and drivers',
    input_schema: {
      type: 'object',
      properties: {
        explanation: {
          type: 'string',
          description: 'Clear explanation of what is happening in the data',
        },
        bullets: {
          type: 'array',
          items: { type: 'string' },
          description: 'Key bullet points',
        },
        drivers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              factor: { type: 'string' },
              impact: {
                type: 'number',
                description: 'Impact from -100 to 100',
              },
              confidence: {
                type: 'number',
                description: 'Confidence from 0 to 1',
              },
            },
            required: ['factor', 'impact', 'confidence'],
          },
        },
        anomalies: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              index: { type: 'number' },
              value: {},
              reason: { type: 'string' },
              severity: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
              },
            },
            required: ['index', 'reason', 'severity'],
          },
        },
        confidence: {
          type: 'number',
          description: 'Overall confidence from 0 to 1',
        },
      },
      required: ['explanation', 'confidence'],
    },
  },

  [AiIntent.SUMMARIZE]: {
    name: 'summarize_result',
    description: 'Provide a concise summary of the data with key takeaways',
    input_schema: {
      type: 'object',
      properties: {
        explanation: {
          type: 'string',
          description: 'Concise summary of the data',
        },
        bullets: {
          type: 'array',
          items: { type: 'string' },
          description: 'Key takeaways',
        },
        confidence: { type: 'number' },
      },
      required: ['explanation', 'bullets', 'confidence'],
    },
  },

  [AiIntent.FORECAST]: {
    name: 'forecast_result',
    description: 'Provide forecast predictions for future values',
    input_schema: {
      type: 'object',
      properties: {
        explanation: {
          type: 'string',
          description: 'Explanation of the forecast methodology',
        },
        forecast: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              timestamp: { type: 'string' },
              value: { type: 'number' },
              confidence: { type: 'number' },
              lowerBound: { type: 'number' },
              upperBound: { type: 'number' },
            },
            required: ['timestamp', 'value', 'confidence'],
          },
          description: 'Array of forecast predictions',
        },
        confidence: { type: 'number' },
      },
      required: ['explanation', 'forecast', 'confidence'],
    },
  },

  [AiIntent.DETECT_ANOMALY]: {
    name: 'detect_anomaly_result',
    description: 'Detect anomalies and unusual patterns in the data',
    input_schema: {
      type: 'object',
      properties: {
        explanation: {
          type: 'string',
          description: 'Summary of anomalies found',
        },
        anomalies: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              index: { type: 'number' },
              value: {},
              reason: { type: 'string' },
              severity: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
              },
              confidence: { type: 'number' },
            },
            required: ['index', 'reason', 'severity'],
          },
        },
        confidence: { type: 'number' },
      },
      required: ['explanation', 'anomalies', 'confidence'],
    },
  },

  [AiIntent.CLASSIFY]: {
    name: 'classify_result',
    description: 'Classify and categorize items in the dataset',
    input_schema: {
      type: 'object',
      properties: {
        explanation: {
          type: 'string',
          description: 'Explanation of classification methodology',
        },
        classifications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              itemIndex: { type: 'number' },
              category: { type: 'string' },
              confidence: { type: 'number' },
            },
            required: ['itemIndex', 'category', 'confidence'],
          },
        },
        confidence: { type: 'number' },
      },
      required: ['explanation', 'classifications', 'confidence'],
    },
  },

  [AiIntent.OPTIMIZE]: {
    name: 'optimize_result',
    description: 'Suggest optimizations and improvements based on the data',
    input_schema: {
      type: 'object',
      properties: {
        explanation: {
          type: 'string',
          description: 'Analysis of optimization opportunities',
        },
        recommendations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              priority: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
              },
              impact: { type: 'string' },
              effort: {
                type: 'string',
                enum: ['low', 'medium', 'high'],
              },
            },
            required: ['title', 'description', 'priority'],
          },
        },
        confidence: { type: 'number' },
      },
      required: ['explanation', 'recommendations', 'confidence'],
    },
  },

  [AiIntent.COMPARE]: {
    name: 'compare_result',
    description: 'Compare and contrast data, finding key differences',
    input_schema: {
      type: 'object',
      properties: {
        explanation: {
          type: 'string',
          description: 'Comparison analysis',
        },
        bullets: {
          type: 'array',
          items: { type: 'string' },
          description: 'Key differences',
        },
        drivers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              factor: { type: 'string' },
              impact: { type: 'number' },
              confidence: { type: 'number' },
            },
            required: ['factor', 'impact', 'confidence'],
          },
        },
        confidence: { type: 'number' },
      },
      required: ['explanation', 'confidence'],
    },
  },

  [AiIntent.CLUSTER]: {
    name: 'cluster_result',
    description: 'Group similar items in the dataset into clusters',
    input_schema: {
      type: 'object',
      properties: {
        explanation: {
          type: 'string',
          description: 'Explanation of clustering approach',
        },
        classifications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              itemIndex: { type: 'number' },
              category: { type: 'string' },
              confidence: { type: 'number' },
            },
            required: ['itemIndex', 'category', 'confidence'],
          },
          description: 'Cluster assignments',
        },
        confidence: { type: 'number' },
      },
      required: ['explanation', 'classifications', 'confidence'],
    },
  },
};
