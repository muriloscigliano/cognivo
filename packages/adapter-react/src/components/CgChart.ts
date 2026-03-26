import { createWrapper } from '../create-wrapper.js';

export interface CgChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface CgChartProps {
  /** Chart data points. */
  data?: CgChartDataPoint[];
  /** Chart visualization type. */
  type?: 'bar' | 'line' | 'pie' | 'donut' | 'area' | 'sparkline';
  /** Chart title. */
  title?: string;
  /** Chart subtitle. */
  subtitle?: string;
  /** Chart height in pixels or CSS value. */
  height?: string | number;
  /** Whether to show the legend. */
  showLegend?: boolean;
  /** Whether to show values on the chart. */
  showValues?: boolean;
  /** Whether to show the grid. */
  showGrid?: boolean;
  /** Text shown when there is no data. */
  emptyText?: string;
  className?: string;
}

export const CgChart = createWrapper<CgChartProps>(
  'cg-chart',
  ['data', 'type', 'title', 'subtitle', 'height', 'showLegend', 'showValues', 'showGrid', 'emptyText'],
  {}
);
