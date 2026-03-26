/**
 * ILLUSORY CORRELATION (SOCIAL)
 *
 * We perceive false relationships between minority group membership
 * and uncommon (often negative) behaviors due to paired distinctiveness.
 */

import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const illusoryCorrelationSocial: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'illusory-correlation-social',
    name: 'Illusory Correlation (Social)',
    aliases: [
      'Paired Distinctiveness',
      'Distinctive Co-occurrence Bias',
      'Group-Attribution Error',
    ],
    category: BiasCategory.SOCIAL,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'stereotype',
      'minority-group',
      'distinctiveness',
      'fairness',
      'inclusion',
      'algorithms',
      'content-moderation',
      'recommendation-systems',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple:
      'We perceive false correlations between minority group membership and negative behaviors due to paired distinctiveness.',

    detailed: `Illusory correlation (social) is a cognitive bias in which people overestimate the association between two variables that are each statistically infrequent—typically minority group membership and uncommon negative behaviors. Because both are distinctive, co-occurrences are encoded more deeply in memory, producing a perceived relationship where none exists.

Hamilton and Gifford's 1976 experiments demonstrated this clearly: participants read descriptions of behaviors performed by members of two groups (a majority and a minority). Even when the ratio of positive-to-negative behaviors was identical for both groups, participants attributed more negative behaviors to the minority group. The mechanism—paired distinctiveness—requires no pre-existing prejudice; the memory bias alone is sufficient to form stereotypes.

In product design, this bias has far-reaching consequences for recommendation algorithms, content moderation pipelines, analytics dashboards, hiring platforms, and any system that presents data about identifiable groups. If left unchecked, algorithms and interfaces can amplify illusory correlations, reinforcing stereotypes at scale. Designers must actively audit for correlation bias and build safeguards into data presentation, algorithmic filtering, and content curation.`,

    psychologyBasis: {
      discoveredBy: 'David Hamilton and Robert Gifford',
      year: 1976,
      theory: 'Paired Distinctiveness / Illusory Correlation Theory',
      mechanism: `The brain disproportionately encodes and retrieves co-occurrences of two distinctive (infrequent) events. This happens because:

1. **Paired Distinctiveness**: When two statistically uncommon events co-occur (e.g., a minority group member performing a rare negative behavior), the pairing stands out in memory
2. **Encoding Salience**: Distinctive events receive deeper cognitive processing and stronger memory traces than common events
3. **Retrieval Bias**: When asked to judge the frequency of group-behavior pairings, the more memorable distinctive pairs are recalled more easily, inflating perceived frequency
4. **Confirmation Loop**: Once an illusory correlation forms, people selectively attend to confirming instances and discount disconfirming ones, strengthening the false association over time
5. **No Prejudice Required**: The effect arises from basic memory processes alone—no pre-existing stereotype is needed to produce biased judgments

The mechanism is automatic and occurs without conscious awareness, making it especially dangerous in algorithmic systems that mirror or amplify human judgment patterns.`,
    },

    realWorldExample: `In Hamilton and Gifford's original 1976 experiment, participants read 39 behavioral descriptions: 26 by "Group A" members (majority) and 13 by "Group B" members (minority). For both groups, the ratio of positive-to-negative behaviors was the same (roughly 2:1). Yet when asked to assign behaviors to groups, participants systematically over-attributed negative behaviors to the minority Group B. The minority group was rated less favorably overall—purely because of paired distinctiveness between two infrequent categories (minority membership + negative behavior), not because of any actual difference in behavior rates.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Illusory correlation (social) affects how digital products present, filter, and recommend content about identifiable groups. Designers must actively counteract this bias to build equitable systems:

- Audit recommendation algorithms for spurious correlations between user demographics and content or behavior categories
- Ensure content moderation systems do not disproportionately flag or suppress content from minority communities
- Design analytics dashboards that present group-level data with proper base rates to prevent false pattern perception
- Build inclusive recommendation systems that sample diversely rather than reinforcing popularity-driven correlations
- Implement fairness metrics in any system that categorizes, ranks, or filters people or content by group attributes`,

    whenToUse: [
      {
        title: 'Algorithm Fairness Audits',
        scenario:
          'When building or maintaining recommendation, ranking, or classification algorithms',
        example:
          'Run regular bias audits comparing recommendation rates across demographic groups, flagging any statistically unjustified correlation between group membership and content categories',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Diverse Content Sampling',
        scenario:
          'When curating content feeds, search results, or discovery surfaces',
        example:
          'Implement diversity-aware sampling that ensures minority-created content appears proportionally rather than being under-represented due to engagement-biased ranking',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Fair Content Moderation',
        scenario:
          'When designing automated or human-in-the-loop content moderation systems',
        example:
          'Track and equalize false-positive moderation rates across user demographics; surface base-rate context to human moderators reviewing flagged content',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Equitable Analytics Dashboards',
        scenario:
          'When displaying aggregate data broken down by group or demographic',
        example:
          'Always show base rates and sample sizes alongside group-level metrics so viewers cannot form illusory correlations from raw counts',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Inclusive Hiring Platforms',
        scenario:
          'When designing candidate search, scoring, or filtering tools',
        example:
          'Remove or blind demographic signals from ranking algorithms; present candidate pools with diversity metrics and warn when group-level disparities emerge',
        impact: ImpactLevel.CRITICAL,
      },
    ],

    whenToAvoid: [
      {
        title: 'Highlighting Group Differences Without Context',
        reason:
          'Presenting group-level statistics without base rates or sample sizes invites illusory correlation formation',
        consequence:
          'Users form false stereotypes about groups based on salient but unrepresentative data points',
        alternative:
          'Always display base rates, confidence intervals, and sample sizes alongside any group comparison data',
      },
      {
        title: 'Demographic-Based Filtering Defaults',
        reason:
          'Defaulting filters or segments to demographic dimensions primes users to look for group-level patterns that may not exist',
        consequence:
          'Decision-makers develop biased mental models about demographic groups',
        alternative:
          'Default to behavior-based or outcome-based segmentation; make demographic breakdowns opt-in with appropriate context',
      },
      {
        title: 'Anecdotal Case Studies Without Data',
        reason:
          'Featuring individual stories from minority groups without statistical context amplifies paired distinctiveness',
        consequence:
          'Memorable individual stories become falsely representative of the entire group',
        alternative:
          'Pair individual stories with aggregate data showing actual distributions and base rates',
      },
      {
        title: 'Single-Incident Reporting',
        reason:
          'Surfacing single negative incidents involving minority groups with high visual salience triggers paired distinctiveness encoding',
        consequence:
          'Users overestimate frequency of negative behaviors by minority group members',
        alternative:
          'Report incidents with comparative context showing base rates across all groups',
      },
    ],

    commonMistakes: [
      {
        title: 'Ignoring Base Rates in Dashboards',
        description:
          'Showing raw counts of events per group without normalizing for group size',
        why: 'A minority group with 10 incidents out of 100 members (10%) looks smaller than a majority group with 50 incidents out of 1000 members (5%), but the rate is actually double',
        fix: 'Always normalize data by group size and display rates rather than raw counts; include sample size labels',
      },
      {
        title: 'Engagement-Driven Amplification',
        description:
          'Allowing engagement signals alone to drive content ranking, which can amplify distinctive (often negative) content about minority groups',
        why: 'Distinctive co-occurrences generate more engagement (clicks, shares, comments), creating a feedback loop that amplifies illusory correlations',
        fix: 'Incorporate fairness constraints into ranking algorithms; cap viral amplification of content involving identifiable groups',
      },
      {
        title: 'Unaudited Moderation Models',
        description:
          'Deploying content moderation classifiers without disaggregated performance analysis',
        why: 'Models trained on biased data inherit and amplify illusory correlations, disproportionately flagging minority content',
        fix: 'Measure precision, recall, and false-positive rates per demographic group; retrain or recalibrate when disparities exceed thresholds',
      },
      {
        title: 'Stereotyped Default Avatars or Categories',
        description:
          'Using demographic-stereotyped imagery, default avatars, or category labels in UI',
        why: 'Visual stereotypes prime illusory correlation by reinforcing distinctive group-behavior associations',
        fix: 'Use neutral, inclusive imagery; let users self-select representation; avoid demographic-based category labels',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines which group-level data is most visible and how comparisons are framed',
        examples: [
          'Side-by-side group comparisons without base rates invite false pattern detection',
          'Dashboard layouts that place minority-group data in prominent positions increase distinctiveness encoding',
          'Data tables sorted by incident count rather than rate amplify raw-count misperceptions',
          'Card layouts featuring outlier cases prominently anchor group perception',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text emphasis on group labels and metrics affects which associations users encode',
        examples: [
          'Bold group labels in data tables increase category salience and prime correlation detection',
          'Large-font incident counts without rate context distort perceived frequency',
          'Headline framing ("Group X linked to Y") creates strong associative encoding',
          'Footnote-sized base rates fail to counteract headline-level correlations',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color coding groups creates strong visual associations that can reinforce stereotypes',
        examples: [
          'Using red/negative colors for minority-group data bars implies danger or badness',
          'Color-coding demographic groups in charts creates persistent visual associations',
          'Heat maps using saturated colors for minority-group cells amplify perceived severity',
          'Inconsistent color scales across group comparisons distort relative magnitude',
        ],
      },
      interaction: {
        level: ImpactLevel.HIGH,
        description:
          'Interactive filtering, sorting, and drilling into data shapes which correlations users discover',
        examples: [
          'Allowing free-form demographic filtering without context warnings enables bias exploration',
          'Drill-down paths that lead to small-sample group breakdowns invite unreliable conclusions',
          'Sorting by negative metrics surfaces minority groups with small samples disproportionately',
          'Hover tooltips showing only counts without rates reinforce raw-number misperceptions',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content selection, framing, and editorial choices are the primary vector for amplifying or mitigating illusory correlations',
        examples: [
          'News feeds that surface distinctive negative events involving minority groups reinforce stereotypes',
          'Case studies featuring minority individuals in negative contexts create memorable but unrepresentative associations',
          'Content recommendation systems that cluster users by demographics risk creating filter bubbles that reinforce correlations',
          'Editorial decisions about which stories to feature can amplify or counteract paired distinctiveness',
        ],
      },
      accessibility: {
        level: ImpactLevel.MEDIUM,
        description:
          'Accessible data presentation must also be fair data presentation',
        examples: [
          'Screen reader users encounter data in DOM order; ensure base rates precede or accompany raw group counts',
          'Alt text for charts must include rates and context, not just salient peaks or outliers',
          'Data sonification should normalize by group size to avoid encoding illusory correlations aurally',
          'Keyboard navigation through data tables should surface contextual help about interpreting group comparisons',
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
        title: 'Bias-Aware Analytics Dashboard',
        description:
          'HR analytics dashboard showing hiring funnel data with automatic base-rate normalization and bias warnings',
        code: `<div class="analytics-dashboard">
  <h3>Hiring Funnel Analysis</h3>
  <div class="bias-alert">
    <span class="icon">&#9888;</span>
    <p><strong>Fairness Notice:</strong> Data normalized by group size.
    Raw counts can create misleading impressions.
    <a href="#methodology">See methodology</a></p>
  </div>

  <table class="funnel-table">
    <thead>
      <tr>
        <th>Stage</th>
        <th>Group A (n=2,847)</th>
        <th>Group B (n=312)</th>
        <th>Parity Index</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Applied</td>
        <td>100%</td>
        <td>100%</td>
        <td class="parity good">1.00</td>
      </tr>
      <tr>
        <td>Phone Screen</td>
        <td>34.2%</td>
        <td>33.7%</td>
        <td class="parity good">0.99</td>
      </tr>
      <tr>
        <td>Onsite</td>
        <td>12.1%</td>
        <td>11.8%</td>
        <td class="parity good">0.98</td>
      </tr>
      <tr>
        <td>Offer</td>
        <td>4.3%</td>
        <td>4.1%</td>
        <td class="parity good">0.95</td>
      </tr>
    </tbody>
  </table>
  <p class="footnote">Parity Index: 1.0 = perfect parity.
  Values between 0.80-1.20 considered within acceptable range.</p>
</div>`,
        explanation:
          'By normalizing to rates instead of raw counts, displaying sample sizes, and including a parity index, this dashboard prevents users from forming illusory correlations between group membership and hiring outcomes. The bias alert primes users to think critically about the data.',
        principle:
          'Base-rate normalization and contextual framing prevent illusory correlation formation in data presentation',
        metrics: {
          before: '62% of managers reported "seeing patterns" in raw-count dashboards that did not exist in the normalized data',
          after: '14% reported seeing unsupported patterns after dashboard redesign with normalization',
          improvement: '77% reduction in false pattern perception',
        },
      },
      {
        title: 'Diverse Content Recommendation Feed',
        description:
          'Social platform content feed with diversity-aware ranking and transparent sourcing',
        code: `<div class="content-feed">
  <div class="feed-controls">
    <span class="diversity-indicator" title="Content diversity score: 8.4/10">
      Diversity: &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9601;&#9601; 8.4
    </span>
    <button class="feed-settings">Feed Settings</button>
  </div>

  <article class="feed-item">
    <div class="source-context">
      <span class="source-tag">Trending in Technology</span>
      <span class="sample-info">From 12,400 posts today</span>
    </div>
    <h4>Open Source Contributors Reshape Cloud Infrastructure</h4>
    <p>A diverse group of developers from 47 countries...</p>
  </article>

  <article class="feed-item">
    <div class="source-context">
      <span class="source-tag">Community Spotlight</span>
      <span class="sample-info">Selected for diverse perspectives</span>
    </div>
    <h4>Local Entrepreneurs Building Sustainable Businesses</h4>
    <p>Founders from underrepresented backgrounds share...</p>
  </article>
</div>`,
        explanation:
          'The feed includes a diversity score indicator, transparent sourcing labels, and sample-size context. Content is selected using diversity-aware ranking that prevents over-representation of sensational stories about any group. Users can see and adjust how their feed is curated.',
        principle:
          'Transparent, diversity-aware content curation prevents algorithmic amplification of illusory correlations',
      },
      {
        title: 'Fair Moderation Review Interface',
        description:
          'Content moderation tool showing base-rate context to human reviewers',
        code: `<div class="moderation-review">
  <div class="content-under-review">
    <h4>Flagged Content</h4>
    <p class="flagged-text">[Content displayed here]</p>
    <span class="flag-reason">Flagged by: automated classifier</span>
  </div>

  <div class="fairness-context">
    <h5>Review Context</h5>
    <div class="stat-row">
      <span class="label">Classifier accuracy for this content type:</span>
      <span class="value">73% (27% false positive rate)</span>
    </div>
    <div class="stat-row">
      <span class="label">False positive rate, this demographic:</span>
      <span class="value warn">41% — above platform average of 27%</span>
    </div>
    <div class="bias-warning">
      <p><strong>Note:</strong> This demographic group has a higher
      false-positive rate. Please review carefully before actioning.</p>
    </div>
  </div>

  <div class="actions">
    <button class="approve">Approve Content</button>
    <button class="escalate">Escalate for Second Review</button>
    <button class="remove">Remove Content</button>
  </div>
</div>`,
        explanation:
          'By surfacing disaggregated false-positive rates and warning moderators when a demographic group is disproportionately flagged, this interface directly counteracts the paired distinctiveness that would otherwise reinforce illusory correlations between minority group membership and policy violations.',
        principle:
          'Disaggregated fairness metrics in moderation tools interrupt the illusory correlation feedback loop',
      },
    ],

    bad: [
      {
        title: 'Raw-Count Crime Statistics Dashboard',
        description:
          'City dashboard showing crime counts by neighborhood demographics without normalization',
        code: `<!-- DON'T DO THIS -->
<div class="crime-dashboard">
  <h3>Incidents by Neighborhood</h3>
  <div class="stat-card red">
    <h4>District 7 (65% Minority)</h4>
    <span class="big-number">247 incidents</span>
  </div>
  <div class="stat-card green">
    <h4>District 3 (12% Minority)</h4>
    <span class="big-number">89 incidents</span>
  </div>
  <p class="takeaway">District 7 has 2.8x more incidents</p>
</div>`,
        explanation:
          'This dashboard creates a textbook illusory correlation. It shows raw counts without normalizing for population size, labels districts by minority percentage (making demographics salient), uses red/green color coding that implies judgment, and presents a misleading comparison. If District 7 has 3x the population, the per-capita rate may actually be lower.',
        principle:
          'Raw counts with salient demographic labels and evaluative color coding are the fastest path to reinforcing illusory correlations',
      },
      {
        title: 'Engagement-Optimized News Feed',
        description:
          'News feed that amplifies sensational stories about minority groups because they drive clicks',
        code: `<!-- DON'T DO THIS -->
<div class="news-feed">
  <article class="trending">
    <span class="badge hot">TRENDING</span>
    <h3>[Minority Group Member] Arrested in Major Fraud Case</h3>
    <p>54,000 shares | 12,000 comments</p>
  </article>
  <article class="trending">
    <span class="badge hot">VIRAL</span>
    <h3>[Another Minority Group] Linked to Security Breach</h3>
    <p>38,000 shares | 8,500 comments</p>
  </article>
  <!-- Positive stories about same groups buried below fold -->
</div>`,
        explanation:
          'Engagement-driven ranking surfaces distinctive negative stories about minority groups because they generate more clicks and shares (paired distinctiveness makes them attention-grabbing). This creates a feedback loop: more exposure leads to more engagement, which leads to more amplification, reinforcing the false correlation between minority groups and negative events.',
        principle:
          'Engagement-optimized ranking without fairness constraints systematically amplifies illusory correlations',
      },
      {
        title: 'Uncontextualized Group Comparison Chart',
        description:
          'Analytics chart comparing groups on negative metrics without base rates or confidence intervals',
        code: `<!-- DON'T DO THIS -->
<div class="comparison-chart">
  <h3>Support Ticket Escalation by User Segment</h3>
  <div class="bar-chart">
    <div class="bar" style="width: 85%;">
      <span>Segment D (n=23): 85%</span>
    </div>
    <div class="bar" style="width: 34%;">
      <span>Segment A (n=1,247): 34%</span>
    </div>
    <div class="bar" style="width: 31%;">
      <span>Segment B (n=892): 31%</span>
    </div>
    <div class="bar" style="width: 29%;">
      <span>Segment C (n=654): 29%</span>
    </div>
  </div>
</div>`,
        explanation:
          'Segment D appears to have a dramatically higher escalation rate, but it only has 23 members—far too few for a reliable percentage. The chart sorts by rate (drawing attention to the smallest group), displays no confidence intervals, and presents the comparison without any statistical context. This is how illusory correlations form in data-driven organizations.',
        principle:
          'Small-sample groups will always produce extreme rates; displaying them without confidence intervals invites false conclusions',
      },
    ],

    realWorld: [
      {
        company: 'Twitter/X',
        product: 'Algorithmic Bias Audit (2021)',
        url: 'https://blog.twitter.com/engineering/en_us/topics/insights/2021/algorithmic-bias-bounty-challenge',
        description:
          'Twitter conducted an internal audit revealing that its image-cropping algorithm disproportionately favored lighter-skinned faces. The algorithm had learned an illusory correlation between skin tone and "interesting" image regions from biased training data.',
        effectiveness: 'effective',
        analysis:
          'By publicly auditing and then removing the biased auto-crop feature, Twitter demonstrated how algorithmic systems can encode illusory correlations from training data. The transparency of the audit set a positive precedent for platform accountability.',
      },
      {
        company: 'LinkedIn',
        product: 'Fairness-Aware Ranking',
        description:
          'LinkedIn implemented fairness constraints in its recruiter search results to prevent the correlation between gender and job categories from biasing which candidates appeared in search results. The system monitors demographic parity in ranking outcomes.',
        effectiveness: 'effective',
        analysis:
          'By measuring and constraining demographic disparities in search ranking, LinkedIn directly addresses the risk of illusory correlation between demographic attributes and job fitness. The system actively de-biases rather than passively presenting correlated results.',
      },
      {
        company: 'YouTube',
        product: 'Recommendation Diversity Controls',
        description:
          'YouTube introduced recommendation diversity mechanisms to prevent its algorithm from creating narrow content corridors that could reinforce correlations between creator demographics and content quality perceptions.',
        effectiveness: 'somewhat-effective',
        analysis:
          'While YouTube has taken steps toward diversity in recommendations, the engagement-driven core ranking still has potential to amplify distinctive content about minority groups. The tension between engagement optimization and fairness remains partially unresolved.',
      },
      {
        company: 'Nextdoor',
        product: 'Anti-Profiling Prompt',
        description:
          'After users were posting racially profiled "suspicious activity" reports, Nextdoor redesigned its reporting flow to require specific behavioral descriptions rather than physical/demographic descriptions, interrupting the illusory correlation between race and criminality.',
        effectiveness: 'very-effective',
        analysis:
          'By structurally requiring behavior-based rather than appearance-based reporting, Nextdoor directly broke the paired distinctiveness pathway. Reports of racial profiling dropped significantly, demonstrating that UX design can interrupt bias at the point of user input.',
      },
    ],

    abTests: [
      {
        title: 'Dashboard Data Presentation: Raw Counts vs Normalized Rates',
        hypothesis:
          'Displaying normalized rates with base-rate context will reduce false pattern perception across demographic groups',
        controlVersion: {
          description:
            'Analytics dashboard showing raw incident counts per demographic group, sorted by count descending, with bar chart visualization',
          metrics: {
            conversionRate: '62% of viewers reported "clear patterns" linking minority groups to negative outcomes',
            scrollDepth: '38%',
          },
        },
        treatmentVersion: {
          description:
            'Same data displayed as per-capita rates with confidence intervals, sample sizes, and a fairness context banner. Sorted alphabetically rather than by metric value',
          metrics: {
            conversionRate: '14% of viewers reported seeing group-level patterns (matching actual data, which showed no significant difference)',
            scrollDepth: '71%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The normalized dashboard reduced false pattern perception by 77%. Users spent nearly twice as long reviewing the data (indicating more careful analysis) and were far less likely to draw unwarranted conclusions about group differences. Exit surveys showed users felt the normalized version was "more trustworthy" and "more professional."',
          learnings: [
            'Raw counts systematically produce illusory correlations when group sizes differ',
            'Confidence intervals are the single most effective intervention for small-sample groups',
            'Sorting by metric value (rather than alphabetically) amplifies the impression of group differences',
            'Fairness context banners significantly increase critical evaluation of data',
          ],
        },
      },
      {
        title: 'Content Moderation: Blind Review vs Demographic-Visible Review',
        hypothesis:
          'Removing demographic signals from moderation review will reduce disparate false-positive rates',
        controlVersion: {
          description:
            'Standard moderation queue showing user profile photo, name, and account details alongside flagged content',
          metrics: {
            conversionRate: '41% false-positive rate for minority users vs 27% overall',
            clickThroughRate: '2.3 minutes average review time',
          },
        },
        treatmentVersion: {
          description:
            'Blinded moderation queue showing only the flagged content text, context of the conversation, and platform policy references. No user profile information visible during initial review',
          metrics: {
            conversionRate: '29% false-positive rate for minority users vs 28% overall',
            clickThroughRate: '2.8 minutes average review time',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Blinding demographic information during initial review nearly eliminated the disparate false-positive rate (from 14-point gap to 1-point gap). Review times increased slightly but accuracy improved substantially. Moderators reported feeling "more confident" in blinded decisions.',
          learnings: [
            'Demographic visibility during moderation directly enables illusory correlation effects',
            'Blinding is the most effective single intervention for moderation fairness',
            'Slightly longer review times are a worthwhile tradeoff for substantially fairer outcomes',
            'Two-stage review (blinded first, then contextualized) is optimal for both accuracy and fairness',
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
        name: 'Unnormalized Group Comparisons',
        description:
          'Charts or tables comparing groups by raw counts rather than per-capita rates, especially when group sizes differ significantly',
        howToSpot:
          'Look for bar charts, tables, or stat cards showing group-level counts without denominators or sample sizes',
        severity: ImpactLevel.CRITICAL,
      },
      {
        name: 'Demographic-Salient Labels',
        description:
          'Group labels that foreground demographic identity (race, ethnicity, gender) rather than behavioral or outcome categories',
        howToSpot:
          'Check if data breakdowns lead with demographic descriptors rather than functional categories',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Evaluative Color Coding on Group Data',
        description:
          'Red/green or positive/negative color coding applied to demographic group metrics',
        howToSpot:
          'Look for heat maps, conditional formatting, or color-coded bars that map judgment colors onto group identifiers',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Missing Confidence Intervals',
        description:
          'Small-sample group data displayed as precise percentages without error bars or confidence ranges',
        howToSpot:
          'Check for groups with small n-values showing precise metrics without any indication of statistical uncertainty',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Sorted-by-Severity Group Lists',
        description:
          'Group comparisons sorted by negative metric values, placing small-sample outlier groups at the top',
        howToSpot:
          'Check default sort order in tables and charts showing group-level negative metrics',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Paired Distinctiveness Amplification',
        description: 'Interface patterns that make co-occurrences of minority group membership and negative events more salient than other combinations',
        indicators: [
          'Negative headlines or alerts featuring minority group identifiers',
          'Trending or viral tags on content about minority groups involved in negative events',
          'Engagement-ranked feeds where distinctive negative content rises to top',
          'Notification systems that alert on negative events with group attribution',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Base-Rate Neglect in Data Presentation',
        description: 'Data visualizations that present group comparisons without the statistical context needed for accurate interpretation',
        indicators: [
          'Raw counts without population denominators',
          'Percentages without sample sizes',
          'No confidence intervals on small-sample data',
          'Sorted comparisons without statistical significance indicators',
        ],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Algorithmic Correlation Reinforcement',
        description: 'System patterns where algorithmic outputs reinforce pre-existing or statistically spurious correlations',
        indicators: [
          'Recommendation algorithms trained on historically biased data without fairness constraints',
          'Content classifiers with undisclosed demographic performance disparities',
          'Search ranking that correlates demographic features with quality or relevance signals',
          'Feedback loops where biased outputs generate biased training data',
        ],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Stereotyped Visual Representation',
        description: 'UI patterns that reinforce stereotypical associations between groups and roles, behaviors, or outcomes',
        indicators: [
          'Stock imagery mapping demographics to occupational stereotypes',
          'Default avatar systems that encode demographic assumptions',
          'Category icons or illustrations reinforcing group-role associations',
          'Onboarding flows that assume group-based preferences',
        ],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are group-level comparisons displaying rates (per capita) or raw counts?',
      'Do all group metrics include sample sizes and confidence intervals?',
      'Is the default sort order neutral (alphabetical) rather than by metric value?',
      'Are demographic labels necessary, or could the analysis use behavioral categories instead?',
      'Does color coding on group data avoid evaluative connotations (red=bad, green=good)?',
      'Have recommendation/ranking algorithms been audited for demographic parity?',
      'Do content moderation systems track false-positive rates per demographic group?',
      'Are small-sample groups flagged or excluded from comparisons to prevent outlier effects?',
      'Does the interface provide base-rate context before presenting group breakdowns?',
      'Are there feedback loop risks where biased outputs become biased training inputs?',
      'Has the design been tested with diverse user groups to validate fairness assumptions?',
      'Do data visualizations pass the "paired distinctiveness" test—would a distinctive co-occurrence be overemphasized?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology, algorithmic fairness, and UX design, specializing in illusory correlation (social variant).

Analyze the provided design for patterns that could create, amplify, or reinforce illusory correlations between group membership and behaviors. Identify:

1. **Data Presentation**: How group-level data is displayed—raw counts vs rates, presence of base rates, sample sizes, confidence intervals
2. **Demographic Salience**: Whether group identifiers are unnecessarily prominent or evaluatively color-coded
3. **Algorithmic Fairness**: Whether ranking, recommendation, or moderation systems have fairness constraints
4. **Content Curation**: Whether content feeds or search results could amplify distinctive co-occurrences involving minority groups
5. **Visual Encoding**: Whether chart types, sort orders, or visual hierarchies could prime false correlation detection

For each pattern found:
- Identify how paired distinctiveness could be triggered
- Assess whether base rates and statistical context are provided
- Determine if the pattern could reinforce stereotypes at scale
- Evaluate fairness implications across different user groups
- Suggest specific interventions to mitigate illusory correlation risk

Consider:
- Could this design lead users to perceive correlations that do not exist in the underlying data?
- Are minority groups or small-sample categories presented in ways that invite false generalizations?
- Do algorithmic systems have feedback loops that could amplify initial biases?
- Is demographic information necessary for the user's task, or could it be removed or blinded?
- Are there structural interventions (normalization, blinding, diversity constraints) that would reduce bias risk?

Provide actionable recommendations for equitable, bias-aware design.`,

    outputSchema: {
      type: 'object',
      properties: {
        correlationRisks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              groupsAffected: { type: 'string' },
              distinctivenessMechanism: { type: 'string' },
              baseRateProvided: { type: 'boolean' },
              stereotypeRisk: { type: 'string' },
              severity: { type: 'string' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'groupsAffected',
              'baseRateProvided',
              'severity',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            baseRateCoverage: { type: 'number' },
            demographicSalience: { type: 'number' },
            algorithmicFairness: { type: 'number' },
            stereotypeRisk: { type: 'number' },
          },
          required: [
            'baseRateCoverage',
            'demographicSalience',
            'algorithmicFairness',
            'stereotypeRisk',
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
        'correlationRisks',
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
        title: 'Audit Data Presentation for Base-Rate Neglect',
        description:
          'Review all interfaces that display group-level data and ensure rates are normalized by group size with sample sizes visible',
        example:
          'Replace "District 7: 247 incidents" with "District 7: 8.7 incidents per 1,000 residents (n=28,400)"',
        tips: [
          'Normalize all group comparisons to per-capita or per-unit rates',
          'Display sample sizes alongside every group metric',
          'Add confidence intervals for groups with fewer than 100 members',
        ],
      },
      {
        step: 2,
        title: 'Reduce Unnecessary Demographic Salience',
        description:
          'Evaluate whether demographic group labels are necessary for the user task; remove or de-emphasize when not essential',
        example:
          'In a support dashboard, segment by "plan tier" or "account age" rather than user demographics unless demographic analysis is specifically requested',
        tips: [
          'Default to behavioral or functional segmentation',
          'Make demographic breakdowns opt-in, not default',
          'When demographic labels are necessary, present them neutrally without evaluative color coding',
        ],
      },
      {
        step: 3,
        title: 'Implement Algorithmic Fairness Constraints',
        description:
          'Add fairness metrics and constraints to any algorithm that ranks, recommends, classifies, or filters content or people',
        example:
          'Add demographic parity monitoring to search ranking: alert when any group\'s appearance rate deviates more than 20% from its base rate in the candidate pool',
        tips: [
          'Define fairness metrics appropriate to your context (demographic parity, equalized odds, etc.)',
          'Monitor metrics continuously, not just at launch',
          'Build automated alerts for when fairness thresholds are breached',
        ],
      },
      {
        step: 4,
        title: 'Design Bias-Interrupting UX Patterns',
        description:
          'Build structural interventions into user workflows that interrupt the cognitive pathway to illusory correlation',
        example:
          'In moderation review, show content first without demographic context (blinded review), then reveal context only for appeal decisions',
        tips: [
          'Use two-stage review processes: blinded first, then contextualized',
          'Add fairness context banners to data dashboards',
          'Require behavioral descriptions rather than demographic descriptions in reporting flows',
        ],
      },
      {
        step: 5,
        title: 'Test with Diverse Users and Measure Fairness Outcomes',
        description:
          'Validate that your design does not produce differential outcomes or perceptions across demographic groups',
        example:
          'Run A/B tests measuring false-pattern perception rates across participant demographics; track disaggregated moderation outcomes over time',
        tips: [
          'Include diverse participants in usability testing',
          'Measure perception of group differences (should match actual data)',
          'Track disaggregated outcomes longitudinally to catch drift',
        ],
      },
    ],

    dos: [
      'Always normalize group comparisons by group size (use rates, not raw counts)',
      'Display sample sizes and confidence intervals for all group-level metrics',
      'Default to behavioral or functional segmentation rather than demographic breakdowns',
      'Audit algorithms regularly for demographic parity in outcomes',
      'Use blinded review processes for moderation and evaluation tasks',
      'Include fairness context banners when displaying group comparison data',
      'Require behavioral descriptions rather than demographic ones in user reporting flows',
      'Test designs with diverse user groups to validate fairness assumptions',
    ],

    donts: [
      'Don\'t display raw counts for group comparisons when group sizes differ',
      'Don\'t use evaluative color coding (red/green) on demographic group data',
      'Don\'t sort group comparisons by negative metric values as the default',
      'Don\'t amplify engagement-driven content about minority groups without fairness constraints',
      'Don\'t deploy classification or moderation models without disaggregated performance analysis',
      'Don\'t use demographic-stereotyped imagery in default avatars, icons, or illustrations',
      'Don\'t present small-sample group metrics as precise values without uncertainty indicators',
      'Don\'t allow free-form demographic filtering in analytics without contextual fairness warnings',
    ],

    bestPractices: [
      {
        title: 'Base-Rate First Presentation',
        description:
          'Present overall base rates and distributions before showing any group-level breakdown',
        rationale:
          'Establishing the base rate first anchors users to the true distribution, making deviations interpretable in context rather than forming standalone impressions',
        example:
          'Show "Overall escalation rate: 32%" before breaking down by any group dimension',
      },
      {
        title: 'Confidence-Interval-Required Threshold',
        description:
          'For groups below a minimum sample size, display confidence intervals or suppress the metric entirely',
        rationale:
          'Small-sample groups produce extreme rates that are statistically meaningless but cognitively compelling; confidence intervals communicate the uncertainty',
        example:
          'If group n < 30, display "Insufficient data for reliable comparison" instead of a precise percentage',
      },
      {
        title: 'Blinded-First Review Workflow',
        description:
          'Structure evaluation and moderation workflows to review content or candidates without demographic context first',
        rationale:
          'Removing demographic signals during initial evaluation eliminates the opportunity for paired distinctiveness to influence judgment',
        example:
          'Moderation queue shows only content and policy references; reviewer profile is hidden until after initial decision',
      },
      {
        title: 'Diversity-Constrained Ranking',
        description:
          'Add diversity constraints to ranking and recommendation algorithms that ensure proportional representation',
        rationale:
          'Unconstrained engagement-driven ranking systematically amplifies distinctive content, reinforcing illusory correlations',
        example:
          'Content feed ensures no single demographic group exceeds 2x its base-rate proportion in top-10 results',
      },
      {
        title: 'Continuous Fairness Monitoring',
        description:
          'Implement dashboards that track fairness metrics over time with automated alerts',
        rationale:
          'Algorithmic bias can drift over time as data distributions change; continuous monitoring catches regressions before they compound',
        example:
          'Weekly fairness report comparing false-positive moderation rates across demographic groups, with alert threshold at 10% disparity',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Ensure base-rate context is programmatically associated with group data',
        implementation:
          'Use table captions, ARIA-describedby, or structured data relationships to ensure screen reader users encounter sample sizes and base rates alongside group metrics, not in visually separate footnotes',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not use color alone to encode group-level judgments',
        implementation:
          'Supplement color coding with text labels, patterns, or icons. Never use red/green alone to indicate "bad/good" group performance, as this conflates color accessibility with bias amplification',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Non-text Content - Chart alt text must include base rates and context, not just salient peaks',
        implementation:
          'Alt text for group comparison charts should state overall distribution and sample sizes, not just "Group X has the highest rate" which reinforces illusory correlations for screen reader users',
      },
    ],

    ethics: [
      {
        concern: 'Algorithmic Stereotype Amplification',
        severity: 'critical',
        explanation:
          'Algorithms trained on historically biased data can encode and amplify illusory correlations at scale, affecting millions of users and reinforcing systemic discrimination',
        mitigation:
          'Implement fairness constraints in all ranking, recommendation, and classification systems. Audit disaggregated performance metrics regularly. Establish bias review boards for high-impact algorithmic decisions.',
      },
      {
        concern: 'Disparate Moderation Impact',
        severity: 'critical',
        explanation:
          'Content moderation systems with unequal false-positive rates across demographics effectively silence minority voices while appearing neutral',
        mitigation:
          'Track and equalize false-positive rates across demographic groups. Use blinded review processes. Provide appeals pathways with demographic-aware fairness context.',
      },
      {
        concern: 'Data Presentation Bias',
        severity: 'high',
        explanation:
          'Dashboards and reports that present group data without statistical context enable decision-makers to form and act on illusory correlations',
        mitigation:
          'Require base-rate normalization and confidence intervals for all group-level data. Add fairness context banners. Default to non-demographic segmentation.',
      },
      {
        concern: 'Feedback Loop Entrenchment',
        severity: 'high',
        explanation:
          'When biased algorithmic outputs generate user behavior data that becomes training data, initial biases become self-reinforcing and increasingly difficult to reverse',
        mitigation:
          'Monitor for feedback loops. Use counterfactual fairness analysis. Periodically retrain models on debiased data. Implement circuit breakers that halt amplification when disparity thresholds are exceeded.',
      },
      {
        concern: 'Informed Consent for Demographic Analysis',
        severity: 'medium',
        explanation:
          'Users may not be aware their demographic data is being used in group-level analyses that could produce biased outcomes',
        mitigation:
          'Be transparent about how demographic data is used. Provide opt-out mechanisms. Prefer self-reported demographic data over inferred attributes.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Illusory Correlation in Interpersonal Perception: A Cognitive Basis of Stereotypic Judgments',
        author: 'Hamilton, D. L., & Gifford, R. K.',
        year: 1976,
        doi: '10.1016/0022-1031(76)90063-9',
        description:
          'The foundational paper demonstrating how paired distinctiveness creates illusory correlations between minority groups and infrequent behaviors, forming the cognitive basis of stereotyping',
        type: 'foundational',
      },
      {
        title: 'Illusory Correlation as a Basis for Stereotyping: Evidence from a Computer-Based Task',
        author: 'Hamilton, D. L., & Rose, T. L.',
        year: 1980,
        description:
          'Extended the illusory correlation paradigm to show how expectations about group-trait associations bias information processing',
        type: 'advanced',
      },
      {
        title: 'Fairness and Abstraction in Sociotechnical Systems',
        author: 'Selbst, A. D., Boyd, D., Friedler, S. A., Venkatasubramanian, S., & Vertesi, J.',
        year: 2019,
        doi: '10.1145/3287560.3287598',
        description:
          'Examines how fairness concepts must account for social context, directly relevant to preventing illusory correlations in algorithmic systems',
        type: 'advanced',
      },
      {
        title: 'Datasheets for Datasets',
        author: 'Gebru, T., Morgenstern, J., Vecchione, B., et al.',
        year: 2021,
        doi: '10.1145/3458723',
        description:
          'Proposes documentation standards for datasets that can help identify and prevent illusory correlation risks in training data',
        type: 'practical',
      },
    ],

    books: [
      {
        title: 'Stereotypes and Prejudice: Essential Readings',
        author: 'Hamilton, David L. (Ed.)',
        year: 2005,
        isbn: '9780863775895',
        description:
          'Comprehensive collection including Hamilton\'s key papers on illusory correlation as the cognitive foundation of stereotyping',
        type: 'foundational',
      },
      {
        title: 'Algorithms of Oppression',
        author: 'Noble, Safiya Umoja',
        year: 2018,
        isbn: '9781479837243',
        description:
          'Examines how search algorithms reinforce racist stereotypes through systematic illusory correlations in information retrieval',
        type: 'practical',
      },
      {
        title: 'Race After Technology',
        author: 'Benjamin, Ruha',
        year: 2019,
        isbn: '9781509526406',
        description:
          'Explores how design choices in technology encode and amplify racial biases, including illusory correlations',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'Racial Discrimination in Face Recognition Technology',
        author: 'Buolamwini, J., & Gebru, T.',
        url: 'https://www.media.mit.edu/projects/gender-shades/overview/',
        description:
          'Gender Shades project revealing how facial recognition systems encode illusory correlations between demographics and classification accuracy',
        type: 'case-study',
      },
      {
        title: 'Fairness in Machine Learning',
        author: 'Google AI',
        url: 'https://developers.google.com/machine-learning/fairness-overview',
        description:
          'Practical guide to identifying and mitigating bias in ML systems, including correlation-based discrimination',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Coded Gaze: Bias in Artificial Intelligence',
        author: 'Joy Buolamwini',
        url: 'https://www.youtube.com/watch?v=162VzSzzoPs',
        description:
          'TED talk on how AI systems encode and amplify human biases, including illusory correlations',
        type: 'foundational',
      },
    ],

    demos: [],
  },

  //===========================================
  // RELATIONSHIPS
  //===========================================
  relationships: {
    complements: [
      'confirmation-bias',
      'out-group-homogeneity-bias',
      'availability-heuristic',
      'stereotyping',
    ],

    conflicts: [
      'base-rate-fallacy', // Understanding base rates directly counteracts illusory correlation
    ],

    confusedWith: [
      'confirmation-bias', // Confirmation bias maintains correlations; illusory correlation creates them
      'availability-heuristic', // Availability inflates frequency of memorable events; illusory correlation links two distinctive categories
      'out-group-homogeneity-bias', // Seeing outgroups as homogeneous is related but mechanistically different
    ],

    hierarchy: {
      parent: 'illusory-correlation',
      children: [
        'paired-distinctiveness',
        'expectancy-based-illusory-correlation',
      ],
    },
  },
};
