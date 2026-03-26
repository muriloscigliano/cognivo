import { createVueWrapper } from '../create-wrapper.js';
export const AiDataCard = createVueWrapper('ai-data-card', {
  title: { type: String },
  subtitle: { type: String },
  icon: { type: String },
  headerStatus: { type: String },
  headerStatusLabel: { type: String },
  fields: { type: Array },
  actions: { type: Array },
  compact: { type: Boolean },
  loading: { type: Boolean },
  highlighted: { type: Boolean },
}, {});
