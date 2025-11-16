import { AiIntent } from '@cognivo/core';

/**
 * JSON Schemas for OpenAI structured outputs
 *
 * Each intent has a corresponding schema that defines
 * the expected structure of the AI response.
 */

export const schemas = {
  [AiIntent.EXPLAIN]: {
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
    additionalProperties: false,
  },

  [AiIntent.FORECAST]: {
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
    additionalProperties: false,
  },

  [AiIntent.DETECT_ANOMALY]: {
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
    additionalProperties: false,
  },

  [AiIntent.SUMMARIZE]: {
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
    additionalProperties: false,
  },

  [AiIntent.CLASSIFY]: {
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
    additionalProperties: false,
  },

  [AiIntent.OPTIMIZE]: {
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
    additionalProperties: false,
  },

  [AiIntent.COMPARE]: {
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
    additionalProperties: false,
  },

  [AiIntent.CLUSTER]: {
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
    additionalProperties: false,
  },
};
