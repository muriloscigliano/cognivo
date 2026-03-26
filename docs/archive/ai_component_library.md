# AI-Native Component Library  
## Master Component Table (Markdown Export)

## 1. Base Layout Components
| Component | Description |
|----------|-------------|
| `LayoutGrid` | Grid container for dashboards and layouts. |
| `LayoutSection` | Page or module section wrapper. |
| `LayoutStack` | Vertical or horizontal spacing stack. |
| `LayoutContainer` | Max-width centered content container. |
| `LayoutSidebar` | Side navigation or insight panel container. |
| `LayoutHeader` | Top navigation/header bar. |
| `LayoutFooter` | Footer or bottom status bar. |
| `DashboardGrid` | Prebuilt adaptive layout for dashboard cards. |

## 2. Base Display Components
| Component | Description |
|----------|-------------|
| `Text` | Generic text wrapper (semantic & tokens). |
| `Heading` | Titles, section headers, card titles. |
| `Label` | Small UI labels. |
| `StatText` | Large stat numbers or deltas. |
| `Icon` | Icon wrapper. |
| `IconBadge` | Icon inside a badge bubble. |
| `IconAvatar` | Circular icon/avatar. |
| `Badge` | Status or category indicator. |
| `Chip` | Toggleable small UI element. |
| `CategoryChip` | Chips for categories (spending, tags). |
| `StatusChip` | Chips for statuses (success, pending). |
| `KpiNumber` | Large KPI metric display. |
| `KpiDelta` | Percentage change indicator. |
| `KpiGroup` | Multiple KPIs in a row layout. |

## 3. Data Display Components
| Component | Description |
|----------|-------------|
| `Table` | Standard table with sorting and styles. |
| `TableHeader` | Table head row. |
| `TableRow` | Table body row. |
| `TableCell` | Table cell. |
| `TableSelection` | Checkbox row selection. |
| `TableToolbar` | Filters, actions, density toggles. |
| `TablePagination` | Navigation for table pages. |
| `TableFilters` | Filter UI for table data. |
| `TableGroupHeader` | Divider header for grouped rows. |
| `List` | Standard list container. |
| `ListItem` | Row-style list item. |
| `ListItemAvatar` | Avatar & icon inside list item. |
| `ListItemMeta` | Secondary text or metadata. |
| `ListDivider` | Horizontal line separator. |
| `DataCard` | Key-value pair card. |
| `MetricCard` | Metric display card. |
| `CategoryCard` | Category breakdown card. |
| `ComparisonCard` | Comparison between two values. |
| `TransactionList` | List specialized for transactions. |
| `TransactionItem` | Transaction row. |
| `TransactionAmount` | Styled amount (positive/negative). |
| `TransactionCategory` | Spending category chip or label. |

## 4. Chart & Data Visualization Components
| Component | Description |
|----------|-------------|
| `MiniBarChart` | Tiny bar chart inside cards. |
| `MiniLineChart` | Tiny line chart for trends. |
| `MiniSparkline` | Micro sparkline chart. |
| `MiniDonut` | Circular percentage donut. |
| `BarChart` | Full bar chart. |
| `LineChart` | Full line chart. |
| `AreaChart` | Full area chart. |
| `DonutChart` | Full donut/pie chart. |
| `PieChart` | Basic pie chart. |
| `RadarChart` | Radar/spider chart. |
| `HeatmapChart` | Heatmap (dates, metrics, etc.). |
| `TimelineChart` | Time series timeline chart. |
| `AnomalyHighlight` | Highlights anomalies on charts. |
| `ForecastCurve` | Predicted future curve. |
| `InsightAnnotation` | On-chart annotations. |
| `TrendMarker` | Up/down trend indicator. |

## 5. Interactive Components
| Component | Description |
|----------|-------------|
| `SearchBar` | Basic search input. |
| `SearchFilter` | Filter dropdown or controls. |
| `FilterChips` | Applied filter chips. |
| `FilterPanel` | Advanced filter drawer. |
| `SmartSearchBar` | Semantic/AI-assisted search. |
| `Sorter` | Sorting control (asc/desc). |
| `GroupSelector` | Group-by control. |
| `SegmentSwitcher` | Segment/tabs switcher. |
| `TabGroup` | Tabs navigation. |
| `Pagination` | Page selector. |
| `Breadcrumbs` | Navigation breadcrumbs. |
| `Stepper` | Multi-step navigation. |

## 6. AI-Enhanced Components
| Component | Description |
|----------|-------------|
| `AiInsightCard` | Card with AI explanations, drivers, insights. |
| `AiMetricCard` | AI-enhanced KPI with context. |
| `AiTrendCard` | AI trend explanation card. |
| `AiForecastCard` | Predictive card with AI forecasts. |
| `AiAnomalyCard` | Detects anomalies and explains them. |
| `AiInsightsScroller` | Vertical insights feed. |
| `AiTable` | Table with AI classification/explain/anomaly detection. |
| `AiTableToolbar` | Toolbar with AI filtering and suggestions. |
| `AiTableExplain` | Explanation of selected table rows. |
| `AiTableAnomaly` | Anomaly marking for table rows. |
| `AiTableCluster` | AI-driven grouping/clustering. |
| `AiTableAutoTag` | Auto-tagging rows based on AI. |
| `AiList` | List with smart grouping + insight summary. |
| `AiListCluster` | Clustering for list items. |
| `AiAutoTagList` | Auto-tag list items. |
| `AiListSummary` | AI-generated list summaries. |
| `AiMiniChart` | Mini chart with smart annotations. |
| `AiTrendChart` | Chart with explanations for spikes/drops. |
| `AiForecastChart` | Chart with future predictions. |
| `AiAnomalyChart` | Chart highlighting unusual values. |
| `AiChartSummary` | Narrative summary of chart data. |
| `AiContextCard` | Context-aware insight block. |
| `AiContextSummary` | Automatic summary of page/dataset context. |
| `AiContextExplanation` | Explains user selections or data chunks. |
| `AiRegion` | Smart region that observes page data. |
| `AiRegionSummary` | Summary block of a region. |
| `AiRegionForecast` | Forecast block for a region. |

## 7. AI Action Components
| Component | Description |
|----------|-------------|
| `AiButton` | General-purpose AI trigger button. |
| `AiMagicButton` | ⚡ Quick AI action trigger. |
| `AiExplainButton` | Explain visible data. |
| `AiForecastButton` | Generate predictions. |
| `AiDetectAnomalyButton` | Detect anomalies. |
| `AiSuggestButton` | Suggest improvements or fixes. |
| `AiClassifyButton` | Auto-label or categorize data. |
| `AiActionMenu` | Dropdown with AI actions. |
| `AiBulkActionMenu` | Multi-row AI actions for lists/tables. |
| `AiInsightChip` | Small inline insight chip. |
| `AiTagChip` | Auto-generated AI tag. |
| `AiCategoryChip` | Category assigned by AI. |

## 8. Panels, Drawers & Modals
| Component | Description |
|----------|-------------|
| `AiInsightPanel` | Right-side panel for AI insights. |
| `AiExplainPanel` | Breakdown/explanation of data. |
| `AiAnomalyPanel` | List of anomalies with reasons. |
| `AiForecastPanel` | Forecasts + drivers. |
| `AiRecommendationPanel` | Recommended actions. |
| `AiSidebar` | Sidebar with contextual suggestions. |
| `AiContextSidebar` | Smart sidebar based on page context. |
| `AiResultModal` | Modal displaying AI output. |
| `AiDetailModal` | More granular data exploration. |

## 9. System & Utility Components
| Component | Description |
|----------|-------------|
| `AiProvider` | Injects the AiClient into the app. |
| `AiClient` | Interface for connecting any LLM/backend. |
| `AiIntentRegistry` | Registry of supported AI intents. |
| `AiContextBuilder` | Builder for structured AI context. |
| `AiLoadingIndicator` | Animated loading/“thinking” indicator. |
| `AiThinkingAnimation` | Dot or pulse animation. |
| `AiConfidenceBadge` | Badge showing AI confidence level. |
| `AiSourceList` | Shows sources or citations. |
| `AiDebugPanel` | Debug panel for AI requests/responses. |
| `ExplainTooltip` | Tooltip with contextual AI explanation. |
| `ForecastBadge` | Badge for forecasting results. |
| `AnomalyBadge` | Badge for detected anomalies. |
| `AutoTagBadge` | Smart tag generated by AI. |
