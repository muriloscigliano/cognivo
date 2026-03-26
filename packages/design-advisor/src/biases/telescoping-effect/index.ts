/**
 * TELESCOPING EFFECT
 *
 * Distorted perception of time: recent events feel more distant,
 * and distant events feel more recent than they actually are.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const telescopingEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'telescoping-effect',
    name: 'Telescoping Effect',
    aliases: ['Forward Telescoping', 'Backward Telescoping', 'Temporal Displacement'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
    ],
    tags: [
      'memory',
      'time-perception',
      'timestamps',
      'timelines',
      'temporal-judgment',
      'recency',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We perceive recent events as more remote and distant events as more recent than they actually are.',

    detailed: `The telescoping effect is a memory bias that distorts our perception of when events occurred. It manifests in two directions:

**Forward telescoping**: Distant events are remembered as having happened more recently than they actually did. A product launch from 8 months ago might feel like it was "just a couple of months ago."

**Backward telescoping**: Recent events are remembered as having happened further in the past than they actually did. Something that happened 2 days ago might feel like it was "last week."

In UX design, this bias has significant implications for how users perceive timestamps, activity timelines, usage streaks, and time-based analytics. When users misjudge when events occurred, they may undervalue recent activity, overestimate how long ago they last engaged, or misinterpret usage patterns. Designing accurate yet intuitive time displays requires understanding how temporal memory distorts reality.`,

    psychologyBasis: {
      discoveredBy: 'Neter, J. & Waksberg, J.',
      year: 1964,
      theory: 'Temporal Displacement in Autobiographical Memory',
      mechanism: `The brain reconstructs temporal information rather than storing exact timestamps. This distortion happens because:

1. **Boundary Effects**: Events near the boundaries of a reference period are displaced inward (forward telescoping) because they are salient enough to be recalled but their exact timing is uncertain
2. **Memory Strength Heuristic**: We use the vividness or clarity of a memory as a proxy for recency -- vivid distant memories feel more recent
3. **Compression of Time**: Routine or uneventful periods are compressed in memory, making distant landmarks feel closer
4. **Landmark Anchoring**: Significant events serve as temporal anchors, but the intervals between landmarks are poorly encoded
5. **Asymmetric Distortion**: Forward telescoping (distant feels recent) is generally stronger than backward telescoping (recent feels distant), especially for memorable events`,
    },

    realWorldExample: `In Neter and Waksberg's foundational 1964 study on consumer expenditure surveys, respondents consistently reported purchases as having occurred more recently than they actually did (forward telescoping). When asked about purchases in the last month, people included items bought 6-8 weeks prior. This led to systematic overreporting of spending frequency. The effect has since been confirmed across domains -- from crime victimization surveys to medical visit recall -- and has major implications for any interface relying on user-reported temporal data.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The telescoping effect directly impacts how users interpret temporal information in interfaces. Since users systematically misjudge when events occurred, designers must consider:

- Timestamp format choices (relative vs absolute) and their impact on temporal accuracy
- Activity timeline fidelity and how compressed views distort time perception
- Usage streak displays and whether users feel their engagement is accurate
- Analytics dashboards where time-based data drives decisions
- "Time ago" displays that can either correct or amplify telescoping distortions`,

    whenToUse: [
      {
        title: 'Absolute Timestamps for Precision',
        scenario:
          'When users need to accurately recall or verify when events happened',
        example:
          'Show "March 18, 2026" instead of "2 days ago" for financial transactions or audit logs',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Relative Timestamps for Recency',
        scenario: 'When conveying freshness matters more than exact timing',
        example:
          'Show "5 minutes ago" for social feed posts to emphasize liveness and currency',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Hybrid Timestamp Displays',
        scenario: 'When both recency and precision matter to users',
        example:
          'Show "2 days ago (March 18)" combining relative context with absolute accuracy',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Timeline Visualization Scaling',
        scenario: 'When displaying activity over varying time periods',
        example:
          'Use proportional time axes in activity timelines rather than collapsing gaps, so users perceive temporal distribution accurately',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Usage Streak Reinforcement',
        scenario: 'When motivating continued engagement through streak displays',
        example:
          'Show explicit date ranges ("Active Mar 10-20") rather than just "10-day streak" to combat backward telescoping making recent activity feel older',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Exploiting Time Distortion for Urgency',
        reason:
          'Making events seem more recent than they are to create false urgency',
        consequence:
          'Users lose trust when they discover temporal manipulation, e.g., "just posted" labels on old content',
        alternative:
          'Use honest timestamps and let genuine recency drive engagement',
      },
      {
        title: 'Hiding Inactivity Gaps',
        reason:
          'Compressing or hiding periods of inactivity to make engagement look continuous',
        consequence:
          'Users may not recognize their own usage patterns, leading to inaccurate self-assessment',
        alternative:
          'Show activity gaps honestly; design empty states that encourage re-engagement',
      },
      {
        title: 'Vague Temporal Labels in Critical Contexts',
        reason:
          'Using "a while ago" or "recently" for medical, legal, or financial events',
        consequence:
          'Telescoping distortion compounds vague labels, causing significant misjudgment of timing',
        alternative:
          'Always use precise dates and times for consequential events',
      },
      {
        title: 'Overriding User Mental Models',
        reason:
          'Forcing absolute timestamps when users expect relative ones (or vice versa)',
        consequence:
          'Cognitive friction as users must translate between temporal formats',
        alternative:
          'Offer both formats with the primary matching context and user expectations',
      },
    ],

    commonMistakes: [
      {
        title: 'Relative-Only Timestamps Beyond a Week',
        description:
          'Showing "12 days ago" or "3 weeks ago" without absolute dates',
        why: 'Beyond a few days, relative timestamps become increasingly vague and compound telescoping distortion -- users cannot mentally reconstruct the actual date',
        fix: 'Switch from relative to absolute timestamps after 7 days, or always show both',
      },
      {
        title: 'Non-Proportional Timelines',
        description:
          'Activity timelines that compress or expand time unevenly without visual indication',
        why: 'Users assume timeline spacing represents proportional time, so uneven compression distorts temporal perception',
        fix: 'Use proportional time axes, or clearly mark breaks and scale changes in the timeline',
      },
      {
        title: 'Ambiguous "Last Active" Displays',
        description:
          'Showing "Last active: recently" or "Last seen: a while ago" without specifics',
        why: 'Forward telescoping makes users recall distant events as recent, so vague labels reinforce inaccurate temporal judgments',
        fix: 'Show specific timestamps: "Last active: March 15, 2026 at 3:42 PM"',
      },
      {
        title: 'Streak Displays Without Date Context',
        description:
          'Showing "15-day streak!" without indicating which days',
        why: 'Backward telescoping makes recent days feel further away, so users may doubt the streak accuracy',
        fix: 'Show a calendar or date range alongside streak counts to ground the number in reality',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.MEDIUM,
        description:
          'Layout determines how temporal information is spatially organized and perceived',
        examples: [
          'Timeline layouts create spatial metaphors for time that can correct or amplify telescoping',
          'Chronological vs reverse-chronological ordering affects which events feel recent',
          'Grouping events by date headers ("Today", "Yesterday", "March 15") anchors temporal perception',
          'Horizontal timelines imply continuous time flow; vertical lists collapse it',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typographic treatment of timestamps affects their prominence and perceived precision',
        examples: [
          'Smaller, muted timestamps suggest less importance of exact timing',
          'Bold date headers in activity feeds anchor temporal context',
          'Monospace fonts for timestamps signal precision and accuracy',
          'Relative timestamps in lighter text feel more casual and approximate',
        ],
      },
      color: {
        level: ImpactLevel.MEDIUM,
        description:
          'Color can encode temporal information and reinforce time perception',
        examples: [
          'Fading color intensity for older events reinforces temporal distance',
          'Consistent color for timestamps avoids false urgency signals',
          'Heat-map coloring in activity calendars makes temporal density visible',
          'Using warm colors for recent and cool colors for older events matches intuition',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive elements can help users explore and correct their temporal assumptions',
        examples: [
          'Hover/tap on relative timestamps to reveal absolute dates',
          'Zoomable timelines let users explore different temporal scales',
          'Scrubbing through activity history reveals actual time distribution',
          'Toggle between relative and absolute timestamp modes',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Timestamp format and temporal language directly shape time perception accuracy',
        examples: [
          '"2 days ago" vs "March 18, 2026" creates fundamentally different temporal anchors',
          'Date grouping headers ("Today", "This Week", "March 2026") segment time meaningfully',
          'Explicit durations ("took 3 days") are more accurate than implied ones',
          'Calendar views provide absolute temporal context that counters telescoping',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Temporal information must be accessible and unambiguous for all users',
        examples: [
          'Screen readers must announce full dates, not just relative times, for temporal context',
          'ARIA time elements with datetime attributes provide machine-readable timestamps',
          'Avoid relying solely on color gradients to convey temporal distance',
          'Provide text alternatives for visual timeline representations',
        ],
      },
    },
  },

  //===========================================
  // EXAMPLES
  //===========================================
  examples: {
    good: [
      {
        title: 'Hybrid Timestamp Display',
        description:
          'Activity feed showing both relative and absolute timestamps for accurate time perception',
        code: `<ul class="activity-feed">
  <li class="activity-item">
    <div class="activity-content">
      <p><strong>Maria</strong> updated the project brief</p>
    </div>
    <time datetime="2026-03-20T09:15:00Z" class="timestamp">
      <span class="relative">5 hours ago</span>
      <span class="absolute">Today at 9:15 AM</span>
    </time>
  </li>
  <li class="activity-item">
    <div class="activity-content">
      <p><strong>James</strong> uploaded design files</p>
    </div>
    <time datetime="2026-03-18T14:30:00Z" class="timestamp">
      <span class="relative">2 days ago</span>
      <span class="absolute">March 18 at 2:30 PM</span>
    </time>
  </li>
  <li class="activity-item">
    <div class="activity-content">
      <p><strong>Sarah</strong> created this project</p>
    </div>
    <time datetime="2026-02-10T10:00:00Z" class="timestamp">
      <span class="absolute">February 10, 2026</span>
    </time>
  </li>
</ul>`,
        explanation:
          'Showing both relative and absolute timestamps lets users perceive recency while retaining temporal accuracy. For older events (beyond a week), only the absolute date is shown since relative labels like "38 days ago" are cognitively difficult to map.',
        principle:
          'Hybrid timestamps correct telescoping by anchoring relative perception to absolute dates',
        metrics: {
          before: '43% of users misjudged event timing by more than 2 days',
          after: '12% of users misjudged event timing by more than 2 days',
          improvement: '72% reduction in temporal misjudgment',
        },
      },
      {
        title: 'Proportional Activity Timeline',
        description:
          'Project timeline with proportional time axis and visible gap indicators',
        code: `<div class="project-timeline" role="figure" aria-label="Project activity timeline">
  <div class="timeline-axis">
    <span class="date-marker" style="left: 0%">Feb 1</span>
    <span class="date-marker" style="left: 33%">Feb 15</span>
    <span class="date-marker" style="left: 66%">Mar 1</span>
    <span class="date-marker" style="left: 100%">Mar 20</span>
  </div>
  <div class="timeline-events">
    <div class="event" style="left: 5%" title="Feb 3: Project kickoff">
      <span class="event-dot active"></span>
    </div>
    <div class="event" style="left: 15%" title="Feb 8: Design review">
      <span class="event-dot active"></span>
    </div>
    <div class="gap-indicator" style="left: 20%; width: 30%">
      <span class="gap-label">18 days inactive</span>
    </div>
    <div class="event" style="left: 55%" title="Mar 4: Development started">
      <span class="event-dot active"></span>
    </div>
    <div class="event" style="left: 95%" title="Mar 19: Beta release">
      <span class="event-dot current"></span>
    </div>
  </div>
</div>`,
        explanation:
          'Proportional spacing shows actual time distribution. The explicit gap indicator prevents forward telescoping from making the Feb 8 design review feel more recent than it was. Users see that most activity is clustered, with a clear inactive period.',
        principle:
          'Proportional timelines and visible gaps counteract temporal compression in memory',
      },
      {
        title: 'Contextualized Usage Streak',
        description:
          'Learning app streak display with calendar context to ground temporal perception',
        code: `<div class="streak-display">
  <h3>Your Learning Streak</h3>
  <div class="streak-summary">
    <span class="streak-count">12 days</span>
    <span class="streak-dates">March 9 - March 20, 2026</span>
  </div>
  <div class="streak-calendar" role="grid" aria-label="Activity calendar">
    <div class="week">
      <span class="day inactive" aria-label="March 8, inactive">8</span>
      <span class="day active" aria-label="March 9, active">9</span>
      <span class="day active" aria-label="March 10, active">10</span>
      <span class="day active" aria-label="March 11, active">11</span>
      <span class="day active" aria-label="March 12, active">12</span>
      <span class="day active" aria-label="March 13, active">13</span>
      <span class="day active" aria-label="March 14, active">14</span>
    </div>
    <div class="week">
      <span class="day active" aria-label="March 15, active">15</span>
      <span class="day active" aria-label="March 16, active">16</span>
      <span class="day active" aria-label="March 17, active">17</span>
      <span class="day active" aria-label="March 18, active">18</span>
      <span class="day active" aria-label="March 19, active">19</span>
      <span class="day active today" aria-label="March 20, today, active">20</span>
      <span class="day future" aria-label="March 21">21</span>
    </div>
  </div>
</div>`,
        explanation:
          'The calendar grid anchors the streak to specific dates, preventing backward telescoping from making the start feel further away. Users can visually verify their activity rather than relying on potentially distorted temporal memory.',
        principle:
          'Calendar visualizations ground abstract streak counts in concrete temporal reality',
      },
    ],

    bad: [
      {
        title: 'Vague Relative Timestamps for Old Events',
        description:
          'Social platform showing only relative timestamps even for months-old content',
        code: `<!-- DON'T DO THIS -->
<div class="post">
  <div class="post-header">
    <span class="author">Alex Chen</span>
    <span class="timestamp">3 weeks ago</span>
  </div>
  <p>Launched the new dashboard feature!</p>
  <div class="comments">
    <div class="comment">
      <span class="timestamp">2 weeks ago</span>
      <p>Great work!</p>
    </div>
    <div class="comment">
      <span class="timestamp">a while ago</span>
      <p>Love it!</p>
    </div>
  </div>
</div>`,
        explanation:
          'Relative timestamps like "3 weeks ago" and especially "a while ago" are cognitively imprecise. Forward telescoping makes users perceive these events as more recent than they were. Without absolute dates, users cannot reconstruct accurate timelines of activity.',
        principle:
          'Vague temporal labels amplify telescoping distortion rather than correcting it',
      },
      {
        title: 'Compressed Timeline Hiding Inactivity',
        description:
          'Project management tool collapsing empty time periods without indication',
        code: `<!-- DON'T DO THIS -->
<div class="project-timeline">
  <div class="event">
    <span class="date">Jan 15</span>
    <p>Project started</p>
  </div>
  <div class="event">
    <span class="date">Jan 20</span>
    <p>Requirements complete</p>
  </div>
  <!-- 2 months of inactivity hidden -->
  <div class="event">
    <span class="date">Mar 18</span>
    <p>Development resumed</p>
  </div>
  <div class="event">
    <span class="date">Mar 20</span>
    <p>Beta deployed</p>
  </div>
</div>`,
        explanation:
          'By placing Jan 20 and Mar 18 events adjacent without visual gap indication, the timeline implies continuous progress. Forward telescoping already makes the January events feel more recent -- hiding the 2-month gap amplifies this distortion. Users and stakeholders will misjudge project velocity.',
        principle:
          'Hidden time gaps compound telescoping distortion and misrepresent actual timelines',
      },
      {
        title: 'Misleading "Last Active" Display',
        description:
          'SaaS dashboard showing vague last-active labels for customer accounts',
        code: `<!-- DON'T DO THIS -->
<table class="customer-list">
  <tr>
    <td>Acme Corp</td>
    <td class="status active">Active</td>
    <td class="last-active">Recently</td>
  </tr>
  <tr>
    <td>Globex Inc</td>
    <td class="status active">Active</td>
    <td class="last-active">Not long ago</td>
  </tr>
  <tr>
    <td>Initech LLC</td>
    <td class="status warning">At risk</td>
    <td class="last-active">A while back</td>
  </tr>
</table>`,
        explanation:
          '"Recently", "Not long ago", and "A while back" are meaningless temporal labels. Forward telescoping already makes distant events feel recent -- adding vague labels makes it impossible for account managers to accurately assess engagement timing. This can delay churn intervention.',
        principle:
          'Vague temporal labels in business contexts lead to poor decision-making about engagement timing',
      },
    ],

    realWorld: [
      {
        company: 'Slack',
        product: 'Message Timestamps',
        description: 'Slack uses hybrid timestamps: "5 minutes ago" for very recent messages, then "11:30 AM" for same-day, then "Yesterday at 3:15 PM", then full dates like "March 15, 2026". This progressive approach matches how temporal precision degrades in human memory, providing the right format at each distance.',
        effectiveness: 'very-effective',
        analysis: 'Slack\'s tiered timestamp strategy counteracts telescoping by switching to absolute dates before relative labels become too vague. The transition points (minutes, same-day, yesterday, date) align with natural cognitive boundaries for temporal perception.',
      },
      {
        company: 'GitHub',
        product: 'Contribution Graph',
        description: 'GitHub\'s contribution graph uses a proportional calendar heat map showing exactly which days had commits over the past year. Each square represents one day with consistent spacing, making activity gaps and clusters immediately visible.',
        effectiveness: 'very-effective',
        analysis: 'The proportional calendar layout directly counters telescoping by making temporal distribution visually explicit. Users cannot compress inactive periods in memory because the empty squares are visible. This creates accurate perception of coding consistency.',
      },
      {
        company: 'Google',
        product: 'Google Photos Timeline',
        description: 'Google Photos organizes images by exact date with both absolute dates and relative descriptors ("2 years ago today"). The "Rediscover this day" feature deliberately highlights how distant events actually are, correcting forward telescoping.',
        effectiveness: 'effective',
        analysis: 'By showing "2 years ago today" alongside a memory, Google corrects the common forward telescoping illusion where vivid memories feel more recent. Users often express surprise at how long ago photos were taken, confirming the bias correction.',
      },
      {
        company: 'Jira',
        product: 'Sprint Timelines',
        description: 'Jira displays sprint burndown charts with proportional time axes and explicit sprint boundary dates. The timeline shows exactly how work was distributed across the sprint, preventing retrospective distortion of effort patterns.',
        effectiveness: 'effective',
        analysis: 'Proportional time axes in burndown charts prevent teams from misremembering their work distribution. Without this, forward telescoping would make early sprint work feel more recent, distorting retrospective assessments of team velocity.',
      },
    ],

    abTests: [
      {
        title: 'Relative vs Hybrid Timestamps in Activity Feeds',
        hypothesis:
          'Hybrid timestamps (relative + absolute) will improve users\' ability to accurately recall when events occurred',
        controlVersion: {
          description:
            'Activity feed showing only relative timestamps: "5 min ago", "2 days ago", "3 weeks ago"',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '1:45',
            scrollDepth: '52%',
          },
        },
        treatmentVersion: {
          description:
            'Activity feed showing hybrid timestamps: "2 days ago (March 18)" for recent events, absolute dates for older events',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '2:10',
            scrollDepth: '61%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Users with hybrid timestamps were 72% more accurate when asked to recall when specific events occurred. Temporal misjudgment (off by >2 days) dropped from 43% to 12%. Users also reported higher confidence in their understanding of project timelines.',
          learnings: [
            'Hybrid timestamps significantly improve temporal accuracy without adding cognitive load',
            'Users naturally ignore the absolute date when recency is sufficient, so showing both does not clutter',
            'The improvement was most pronounced for events 3-14 days old -- the peak telescoping distortion zone',
            'Older events (30+ days) showed little difference since both formats used absolute dates',
          ],
        },
      },
      {
        title: 'Proportional vs Compressed Activity Timelines',
        hypothesis:
          'Proportional timelines will give users more accurate perception of project pace',
        controlVersion: {
          description:
            'Project timeline with events equally spaced regardless of actual time intervals, hiding gaps',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '3:20',
          },
        },
        treatmentVersion: {
          description:
            'Project timeline with proportional time axis, visible gap indicators, and date markers',
          metrics: {
            conversionRate: 'N/A',
            timeOnPage: '4:05',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Project managers using proportional timelines estimated project velocity 68% more accurately. They were 3x more likely to identify stalled phases and 2x more likely to take corrective action on delayed milestones.',
          learnings: [
            'Compressed timelines cause managers to overestimate project pace by ~40%',
            'Visible gap indicators triggered proactive follow-up in 78% of cases where gaps exceeded 5 days',
            'Users initially preferred the cleaner compressed view but chose proportional after experiencing both',
            'The effect was strongest for projects spanning 2-6 months where telescoping distortion peaks',
          ],
        },
      },
    ],
  },

  //===========================================
  // DETECTION
  //===========================================
  detection: {
    visualCues: [
      {
        name: 'Relative-Only Timestamps',
        description:
          'Timestamps showing only relative time ("3 days ago", "last week") without absolute dates',
        howToSpot:
          'Look for timestamp displays that lack specific dates, especially for events older than a few days',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Compressed Timelines',
        description:
          'Activity timelines where events are equally spaced regardless of actual time intervals',
        howToSpot:
          'Check if timeline spacing represents proportional time or if gaps are hidden between events',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Vague Temporal Language',
        description:
          'Labels like "recently", "a while ago", "not long ago" without specific meaning',
        howToSpot:
          'Scan for temporal descriptors that cannot be mapped to a specific date or date range',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Missing Date Context on Streaks',
        description:
          'Streak counters or activity counts without calendar or date-range context',
        howToSpot:
          'Look for isolated numbers ("15-day streak") without visual grounding in a calendar or date display',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Inconsistent Timestamp Formats',
        description:
          'Mixed temporal formats within the same view (some relative, some absolute, some vague)',
        howToSpot:
          'Compare timestamp formats across a single page or feed; inconsistency amplifies temporal confusion',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Relative Timestamp Degradation',
        description: 'Relative timestamps used far beyond their useful range, creating imprecise temporal perception',
        indicators: [
          '"3 weeks ago" or "2 months ago" as sole timestamp',
          'No absolute date available on hover or tap',
          'Entire activity feeds using only relative timestamps',
          'No transition point from relative to absolute format',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Timeline Compression Pattern',
        description: 'Activity timelines that collapse or hide time gaps, distorting temporal distribution',
        indicators: [
          'Events separated by weeks appear adjacent',
          'No gap indicators or scale breaks',
          'Non-proportional spacing without visual cues',
          'Missing date axis or date markers',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Temporal Ambiguity Pattern',
        description: 'Vague or missing temporal information that leaves users relying on distorted memory',
        indicators: [
          '"Last active: recently" without specifics',
          'No timestamps on important events',
          '"Updated" without saying when',
          'Activity logs without date grouping',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Streak Without Calendar Pattern',
        description: 'Numeric streak or activity counts without temporal grounding',
        indicators: [
          'Streak number without date range',
          'Activity count without time period',
          '"Active for 30 days" without start/end dates',
          'Progress bars without temporal context',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are timestamps relative, absolute, or hybrid -- and is the choice appropriate for the time distance?',
      'At what point do relative timestamps transition to absolute dates?',
      'Are activity timelines proportionally spaced or compressed?',
      'Are time gaps between events visible or hidden?',
      'Do streak displays include calendar context or date ranges?',
      'Can users access absolute dates for any event (via hover, tap, or toggle)?',
      'Are temporal labels specific enough to be useful ("2 days ago" vs "recently")?',
      'Does the timeline view match the actual temporal distribution of events?',
      'Are timestamps consistent in format across the same view?',
      'Have we tested whether users can accurately recall when events occurred using our temporal displays?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the telescoping effect and temporal perception biases.

Analyze the provided design for telescoping effect patterns. Identify:

1. **Timestamp Formats**: Whether relative, absolute, or hybrid timestamps are used and their appropriateness for the time distance
2. **Timeline Proportionality**: Whether activity timelines represent time proportionally or compress/hide gaps
3. **Temporal Precision**: Whether temporal language is specific enough to resist telescoping distortion
4. **Streak and Activity Displays**: Whether usage counts and streaks are grounded in calendar context
5. **Format Transitions**: Whether there are appropriate transition points from relative to absolute timestamps

For each pattern found:
- Identify where telescoping distortion is likely to occur
- Assess whether the temporal display corrects or amplifies the bias
- Determine if users can accurately judge when events occurred
- Evaluate whether the design serves user decision-making needs
- Suggest improvements for temporal accuracy

Consider:
- Are distant events made to feel artificially recent (forward telescoping)?
- Are recent events made to feel artificially distant (backward telescoping)?
- Can users reconstruct accurate timelines from the information presented?
- Are time-based decisions supported by precise temporal data?
- Are there accessibility implications for temporal displays?

Provide actionable recommendations for improving temporal accuracy in the interface.`,

    outputSchema: {
      type: 'object',
      properties: {
        temporalPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              timestampFormat: { type: 'string' },
              telescopingRisk: { type: 'string' },
              distortionDirection: { type: 'string' },
              accuracyAssessment: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'timestampFormat',
              'telescopingRisk',
              'distortionDirection',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            temporalAccuracy: { type: 'number' },
            timelineProportionality: { type: 'number' },
            formatConsistency: { type: 'number' },
            userDecisionSupport: { type: 'number' },
          },
          required: [
            'temporalAccuracy',
            'timelineProportionality',
            'formatConsistency',
            'userDecisionSupport',
          ],
        },
        recommendations: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              priority: { type: 'number' },
              title: { type: 'string' },
              description: { type: 'string' },
              expectedImpact: { type: 'string' },
            },
            required: ['priority', 'title', 'description'],
          },
        },
      },
      required: [
        'temporalPatterns',
        'overallAssessment',
        'recommendations',
      ],
    },
  },

  //===========================================
  // GUIDELINES
  //===========================================
  guidelines: {
    implementation: [
      {
        step: 1,
        title: 'Audit Temporal Displays',
        description:
          'Inventory all timestamps, timelines, and temporal language in the interface',
        example:
          'Map every place a date, time, or relative timestamp appears: activity feeds, dashboards, notifications, logs',
        tips: [
          'Include implicit temporal displays like "New" badges or "Updated" labels',
          'Note which formats are used at which time distances',
          'Identify areas where temporal accuracy affects user decisions',
        ],
      },
      {
        step: 2,
        title: 'Define Timestamp Strategy',
        description:
          'Choose appropriate timestamp formats for different time distances and contexts',
        example:
          '<1 hour: "5 min ago" | Same day: "11:30 AM" | Yesterday: "Yesterday at 3:15 PM" | This week: "Tuesday (Mar 18)" | Older: "March 10, 2026"',
        tips: [
          'Define clear transition points between relative and absolute formats',
          'Match precision to context: casual feeds can be looser, financial logs must be exact',
          'Consider offering both formats simultaneously for medium-distance events (2-14 days)',
        ],
      },
      {
        step: 3,
        title: 'Design Proportional Timelines',
        description:
          'Ensure activity timelines represent time proportionally or clearly indicate compression',
        example:
          'Use a proportional time axis with date markers, or show explicit gap indicators between event clusters',
        tips: [
          'If compression is necessary for layout, mark scale breaks visually',
          'Add date axis markers at regular intervals',
          'Show gap indicators with duration labels ("18 days inactive")',
        ],
      },
      {
        step: 4,
        title: 'Ground Counts in Context',
        description:
          'Pair numeric counts (streaks, activity counts) with calendar or date-range context',
        example:
          'Show "12-day streak (March 9 - March 20)" instead of just "12-day streak"',
        tips: [
          'Add mini-calendar visualizations alongside streak counters',
          'Show date ranges for activity summaries',
          'Use calendar heat maps for long-term engagement displays',
        ],
      },
      {
        step: 5,
        title: 'Test Temporal Accuracy',
        description:
          'Measure whether users can accurately recall or judge when events occurred',
        example:
          'Ask users: "When did event X happen?" and compare their answer to the actual date',
        tips: [
          'Test with events at different time distances (1 day, 1 week, 1 month, 3 months)',
          'Measure both direction and magnitude of temporal misjudgment',
          'Compare accuracy across different timestamp formats to optimize',
        ],
      },
    ],

    dos: [
      'Use hybrid timestamps (relative + absolute) for events 2-14 days old',
      'Transition from relative to absolute timestamps after 7 days maximum',
      'Make proportional timelines the default for activity displays',
      'Show explicit gap indicators when compressing inactive time periods',
      'Ground streak counts and activity metrics in calendar context',
      'Provide absolute dates on hover/tap for all relative timestamps',
      'Use consistent timestamp formats within the same view',
      'Test temporal accuracy with real users across different time distances',
    ],

    donts: [
      'Don\'t use relative timestamps as the sole format for events older than a week',
      'Don\'t compress timeline gaps without visual indication',
      'Don\'t use vague temporal labels ("recently", "a while ago") in decision-critical contexts',
      'Don\'t show streak counts without date ranges or calendar context',
      'Don\'t manipulate timestamps to make old content appear fresh',
      'Don\'t mix temporal formats inconsistently within the same view',
      'Don\'t assume users can mentally calculate dates from relative timestamps',
      'Don\'t hide inactivity periods in timelines to make engagement look continuous',
    ],

    bestPractices: [
      {
        title: 'Tiered Timestamp Strategy',
        description:
          'Define explicit transition points between temporal formats based on time distance',
        rationale:
          'Each temporal format has an optimal range; relative timestamps degrade beyond a few days, while absolute dates are overly precise for very recent events',
        example:
          'Minutes: "5 min ago" | Hours: "3 hours ago" | Yesterday: "Yesterday 3:15 PM" | This week: "Tuesday, Mar 18" | Older: "March 10, 2026"',
      },
      {
        title: 'Progressive Temporal Detail',
        description:
          'Reveal more temporal detail on interaction (hover, tap, expand)',
        rationale:
          'Surface-level relative timestamps serve scanning; detailed absolute dates serve investigation',
        example:
          'Default: "2 days ago" | Hover: "March 18, 2026 at 2:30 PM UTC"',
      },
      {
        title: 'Proportional Timeline Default',
        description:
          'Always use proportional time axes in timeline visualizations unless compression is explicitly marked',
        rationale:
          'Non-proportional timelines create false narratives about activity distribution that compound telescoping',
        example:
          'Sprint burndown with proportional days, gap indicators for weekends, date markers every 3 days',
      },
      {
        title: 'Calendar-Grounded Streaks',
        description:
          'Pair every streak or activity count with a visual calendar or date range',
        rationale:
          'Abstract numbers invite telescoping distortion; calendar grounding provides objective temporal context',
        example:
          '"15-day streak" paired with a mini calendar showing highlighted active days with date labels',
      },
      {
        title: 'Temporal Consistency Within Views',
        description:
          'Use the same timestamp format for all items within a single feed, list, or view',
        rationale:
          'Mixed formats create cognitive friction and make temporal comparison between items unreliable',
        example:
          'All items in an activity feed use the same tiered strategy, switching formats at the same distance thresholds',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Use semantic time elements with machine-readable datetime attributes',
        implementation:
          'Use <time datetime="2026-03-18T14:30:00Z"> elements so screen readers and assistive technology can parse and announce accurate dates regardless of visual format',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not rely solely on color to convey temporal distance',
        implementation:
          'When using color gradients to show event age (e.g., fading intensity), pair with text labels or position cues so color-blind users perceive temporal distance',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Provide text alternatives for visual timelines',
        implementation:
          'Timeline visualizations must have text alternatives listing events with their full dates, accessible via screen readers or an alternative list view',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Use descriptive temporal group headings',
        implementation:
          'Group activity items under clear date headings ("Today", "Yesterday", "March 15, 2026") that screen readers announce as section boundaries',
      },
    ],

    ethics: [
      {
        concern: 'Timestamp Manipulation',
        severity: 'critical',
        explanation:
          'Deliberately making old content appear recent through manipulated timestamps or deceptive relative labels',
        mitigation:
          'Always display honest, accurate timestamps. Never show "just posted" or "new" for content that is not genuinely recent.',
      },
      {
        concern: 'Hidden Inactivity',
        severity: 'high',
        explanation:
          'Compressing or hiding activity gaps to create a false impression of consistent engagement',
        mitigation:
          'Show activity gaps honestly. Use proportional timelines or explicit gap indicators. Let users see their true usage patterns.',
      },
      {
        concern: 'Artificial Urgency Through Recency',
        severity: 'high',
        explanation:
          'Exploiting forward telescoping to make time-limited offers feel more imminent than they are',
        mitigation:
          'Use countdown timers with absolute end dates rather than vague "ending soon" labels. Be transparent about actual deadlines.',
      },
      {
        concern: 'Distorted Usage Analytics',
        severity: 'medium',
        explanation:
          'Presenting user engagement data with compressed timelines that make usage appear more frequent or consistent than reality',
        mitigation:
          'Use proportional time axes in analytics dashboards. Show actual dates and time gaps. Let data tell the true story.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Measurement Errors in Consumer Expenditure Surveys',
        author: 'Neter, J., & Waksberg, J.',
        year: 1964,
        description:
          'The foundational study documenting telescoping in consumer expenditure recall, showing systematic forward displacement of purchase events',
        type: 'foundational',
      },
      {
        title: 'Memory for the Time of Past Events',
        author: 'Janssen, S. M. J., Chessa, A. G., & Murre, J. M. J.',
        year: 2006,
        doi: '10.3758/BF03193136',
        description:
          'Comprehensive study of temporal memory distortion, modeling both forward and backward telescoping across different time distances',
        type: 'foundational',
      },
      {
        title: 'Telescoping in Dating of Personal Events',
        author: 'Thompson, C. P., Skowronski, J. J., & Lee, D. J.',
        year: 1988,
        description:
          'Demonstrated that event importance and emotional intensity moderate telescoping effects, with more memorable events showing stronger forward telescoping',
        type: 'advanced',
      },
      {
        title: 'The Influence of Retrieval on Retention',
        author: 'Roediger, H. L., & Karpicke, J. D.',
        year: 2006,
        description:
          'Research on how memory retrieval processes affect temporal judgments, with implications for designing recall-based interfaces',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'The Seven Sins of Memory: How the Mind Forgets and Remembers',
        author: 'Schacter, Daniel L.',
        year: 2001,
        isbn: '9780618219193',
        description:
          'Comprehensive coverage of memory biases including temporal misattribution, the category under which telescoping falls',
        type: 'foundational',
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers heuristics in temporal judgment and how System 1 thinking leads to systematic temporal distortions',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'Designing Better Timestamps for User Interfaces',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/date-display/',
        description:
          'Practical UX guidelines for timestamp formats, including when to use relative vs absolute dates',
        type: 'practical',
      },
    ],

    videos: [],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'recency-effect',       // Recent events feel more important, telescoping distorts when they occurred
      'peak-end-rule',        // Peak moments are temporally displaced by telescoping
      'serial-position-effect', // Position in sequence interacts with temporal memory
      'hindsight-bias',       // "I knew it all along" interacts with distorted temporal recall
    ],

    conflicts: [
      'duration-neglect',     // Telescoping distorts duration perception; duration neglect ignores it entirely
    ],

    confusedWith: [
      'recency-bias',         // Recency is about weighting recent info more; telescoping is about misperceiving when things occurred
      'availability-heuristic', // Available memories feel recent (related but distinct mechanism)
      'time-discounting',     // Temporal discounting is about value decay over time, not perception of when events happened
    ],

    hierarchy: {
      parent: 'memory-bias',
      children: [
        'forward-telescoping',
        'backward-telescoping',
      ],
    },
  },
};
