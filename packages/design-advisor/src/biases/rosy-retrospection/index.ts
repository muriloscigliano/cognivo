/**
 * ROSY RETROSPECTION
 *
 * We remember the past as better than it was
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const rosyRetrospection: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'rosy-retrospection',
    name: 'Rosy Retrospection',
    aliases: [],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'decision-making',
      'judgment',
      'perception',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We remember the past as better than it was',

    detailed: `Rosy retrospection is a memory bias in which people recall past events more positively than they actually experienced them at the time. The past acquires a warm, golden glow that smooths over negative details and amplifies positive ones. This "nostalgia filter" means that vacations, relationships, products, and experiences are all remembered as better than real-time ratings indicated.

In UX design, rosy retrospection is a powerful lever for re-engagement and retention. Features like "On This Day," year-in-review summaries, and photo memories tap directly into this bias, presenting curated highlights from a user's past that feel warmer and more meaningful than the original moments. Users develop stronger emotional bonds with products that help them relive idealized versions of their history.

Designers should understand that rosy retrospection makes users more receptive to nostalgia-driven content, more loyal to products with long usage histories, and more likely to recommend experiences they remember fondly—even if real-time satisfaction was mediocre.`,

    psychologyBasis: {
      discoveredBy: 'Various Researchers',
      year: 1970,
      theory: 'Cognitive Bias Research',
      mechanism: `The brain systematically reconstructs memories with a positive bias through several interacting processes:

1. **Fading Affect Bias**: Negative emotions associated with events fade faster than positive emotions, leaving a net-positive memory trace
2. **Selective Rehearsal**: People preferentially recall and retell positive moments, strengthening those neural pathways while negative details decay
3. **Cognitive Dissonance Reduction**: Because we chose to spend time, money, or effort on an experience, we unconsciously upgrade our memory of it to justify the investment
4. **Schema-Driven Reconstruction**: Memory retrieval fills gaps using general positive schemas ("vacations are fun") rather than specific negative details ("the hotel was noisy")
5. **Identity Maintenance**: We prefer narratives where our past choices were good ones, leading to subtle positive reframing over time

The bias is automatic and pervasive—people rate experiences more positively in retrospect than they did in real-time diary entries during the same events.`,
    },

    realWorldExample: `In Mitchell et al.'s 1997 study, participants rated a vacation in real time using daily diaries and then rated the same vacation from memory weeks later. The retrospective ratings were consistently more positive than the daily ratings. Complaints about weather, food, and logistics faded, while highlights like scenic views and social moments were amplified. The vacation they remembered was meaningfully better than the vacation they actually had.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `Rosy retrospection shapes how users remember their history with a product, making it a key driver of nostalgia-based engagement, retention, and re-activation. Designers can leverage this to:

- Surface past content through "On This Day" and memories features that feel emotionally rewarding
- Create year-in-review experiences that celebrate a user's journey and deepen loyalty
- Use nostalgia marketing to re-engage lapsed users by reminding them of "the good times"
- Build anniversary and milestone features that mark meaningful moments
- Design re-engagement campaigns that reference positive past experiences`,

    whenToUse: [
      {
        title: 'Memories and "On This Day" Features',
        scenario:
          'When surfacing past content to drive daily engagement and emotional connection',
        example:
          'Show users photos, posts, or activities from exactly 1, 2, or 5 years ago, curated for positive sentiment',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Year-in-Review / Wrapped Experiences',
        scenario: 'When creating annual summary experiences that celebrate user activity',
        example:
          'Generate a personalized year-in-review showing top songs, places visited, milestones reached, and highlights',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Re-engagement Campaigns',
        scenario: 'When winning back lapsed users who haven\'t returned in weeks or months',
        example:
          'Send "We miss you" emails featuring the user\'s best moments, achievements, or popular content from their active period',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Anniversary and Milestone Features',
        scenario: 'When marking significant dates like account anniversaries or friendship milestones',
        example:
          'Show "You\'ve been with us for 3 years! Here\'s your journey" with a curated highlight reel',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Nostalgia Marketing',
        scenario: 'When using emotional resonance to deepen brand loyalty or drive purchases',
        example:
          'Surface "Remember when you first started?" content during renewal or upgrade flows',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Traumatic or Sensitive Content',
        reason:
          'Memories features can surface painful events like breakups, losses, or difficult periods',
        consequence:
          'Users experience distress, associate the product with pain, and may churn permanently',
        alternative:
          'Implement robust content filtering, sentiment analysis, and easy "hide this memory" controls. Allow users to block date ranges.',
      },
      {
        title: 'Manipulating Subscription Renewals',
        reason:
          'Using nostalgia to pressure users into renewing subscriptions they want to cancel',
        consequence:
          'Users feel manipulated, lose trust, and share negative experiences publicly',
        alternative:
          'Let users cancel freely. Use nostalgia features for genuine engagement, not as a retention dark pattern.',
      },
      {
        title: 'Masking Product Decline',
        reason:
          'Using rosy memories of past product quality to distract from current degradation',
        consequence:
          'Users eventually notice the gap between nostalgic framing and current reality, eroding trust',
        alternative:
          'Focus on improving the current product. Use memories features alongside genuine quality.',
      },
      {
        title: 'Ignoring User Preferences',
        reason:
          'Force-showing memories to users who have expressed they don\'t want them',
        consequence:
          'Annoyance, notification fatigue, and perception that the product ignores user agency',
        alternative:
          'Provide clear opt-out controls and respect user preferences for memories frequency and content.',
      },
    ],

    commonMistakes: [
      {
        title: 'Surfacing Negative Memories',
        description:
          'Showing "On This Day" content from breakups, job losses, illness, or other painful events',
        why: 'Automated systems cannot always detect emotional context, and negative memories create strong negative product associations',
        fix: 'Implement sentiment filtering, facial recognition for crying/distress, keyword filtering, and prominent "hide this memory" controls',
      },
      {
        title: 'Over-Frequency of Nostalgia Prompts',
        description:
          'Showing memories notifications daily or multiple times per day, creating fatigue',
        why: 'Too-frequent nostalgia prompts feel spammy and lose their emotional impact through habituation',
        fix: 'Limit memories to meaningful intervals (weekly or less). Prioritize high-quality, genuinely positive content.',
      },
      {
        title: 'Generic Rather Than Personal',
        description:
          'Creating year-in-review or memories features with generic templates that don\'t feel personal',
        why: 'Rosy retrospection is strongest for personally meaningful events. Generic summaries feel hollow.',
        fix: 'Use deeply personalized data: specific photos, exact dates, named friends, unique statistics.',
      },
      {
        title: 'No User Control',
        description:
          'Not allowing users to edit, hide, or control what memories are surfaced',
        why: 'Users have different relationships with their past. Some periods should stay forgotten.',
        fix: 'Provide "hide this day," "hide this person," and "hide this date range" controls prominently.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.HIGH,
        description:
          'Layout determines how memories and nostalgia content is presented and discovered',
        examples: [
          'Full-screen immersive memories presentations maximize emotional impact',
          'Timeline layouts reinforce the narrative arc of a user\'s journey',
          'Card-based memory surfaces allow browsing without commitment',
          'Prominent placement of "On This Day" in feeds drives discovery',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Typography sets the emotional tone for nostalgia experiences',
        examples: [
          'Warm, friendly typefaces reinforce the positive glow of memories',
          'Date-stamped headers ground memories in specific, meaningful time periods',
          'Larger type for milestone numbers ("3 Years!") creates emotional emphasis',
          'Handwriting-style fonts can enhance the personal, intimate feel of memories',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color palettes directly evoke nostalgia and warmth in memories features',
        examples: [
          'Warm tones (amber, gold, soft orange) reinforce the "rosy" quality of retrospection',
          'Sepia or faded photo filters visually signal "looking back"',
          'Seasonal color palettes match memories to their time of year',
          'Soft gradients and warm overlays create a dreamlike, idealized quality',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interaction patterns determine how users engage with and share their memories',
        examples: [
          'Swipe-through carousels create a satisfying "flipping through memories" experience',
          'Share buttons on memories drive viral distribution and social validation',
          'Tap-to-expand reveals deeper details and amplifies emotional engagement',
          'Animation and transitions between memories create a cinematic, curated feel',
        ],
      },
      content: {
        level: ImpactLevel.CRITICAL,
        description:
          'Content curation is the core of memories features—what is shown and what is hidden determines the emotional outcome',
        examples: [
          'Algorithmically selecting high-engagement content (most liked, most commented) ensures positive memories',
          'Narrative framing ("Your best moments from 2024") sets a positive interpretive lens',
          'Personalized statistics ("You visited 12 countries!") create pride and accomplishment',
          'Curated highlight reels omit mundane content that would dilute emotional impact',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Memories features must be accessible and inclusive across all users',
        examples: [
          'Alt text for memory photos must convey the emotional context, not just visual content',
          'Screen reader announcements should frame memories positively ("A memory from 3 years ago")',
          'Animation and transitions must respect reduced-motion preferences',
          'Color-based nostalgia cues need non-color alternatives for color-blind users',
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
        title: 'Facebook "On This Day" Memories',
        description:
          'Social platform surfacing positive past content with user controls',
        code: `<div class="memories-card">
  <header class="memories-header">
    <span class="icon">🕰️</span>
    <h3>On This Day</h3>
    <span class="date">3 Years Ago</span>
  </header>

  <div class="memory-content">
    <img src="beach-trip.jpg" alt="Beach sunset with friends">
    <p class="caption">Best weekend ever with the crew! 🌅</p>
    <div class="engagement">
      <span>❤️ 47 reactions</span>
      <span>12 comments</span>
    </div>
  </div>

  <div class="memory-actions">
    <button class="share-btn">Share This Memory</button>
    <button class="hide-btn">Hide This Memory</button>
    <button class="settings-btn">Memory Preferences</button>
  </div>
</div>`,
        explanation:
          'Surfaces high-engagement past content (many reactions = positive memory) with a warm visual treatment. Critically includes hide controls so users can suppress painful memories. The "3 Years Ago" framing triggers rosy retrospection naturally.',
        principle:
          'Curate positive memories with prominent user controls for sensitive content',
        metrics: {
          before: 'Daily active engagement baseline before Memories feature',
          after: '12% increase in daily engagement after Memories launch',
          improvement: 'Memories became one of the most-used daily features',
        },
      },
      {
        title: 'Spotify Wrapped Year-in-Review',
        description:
          'Annual personalized music summary that celebrates listening history',
        code: `<div class="wrapped-slide">
  <div class="wrapped-bg gradient-warm">
    <h2>Your 2024 Wrapped</h2>

    <div class="top-stat">
      <span class="number">47,832</span>
      <span class="label">minutes listened</span>
      <span class="comparison">That's more than 95% of listeners</span>
    </div>

    <div class="top-artist">
      <img src="artist-photo.jpg" alt="Artist name">
      <h3>Your #1 Artist</h3>
      <p class="artist-name">Taylor Swift</p>
      <p class="detail">You listened 342 times this year</p>
    </div>

    <div class="wrapped-actions">
      <button class="share-story">Share to Stories</button>
      <button class="share-post">Share as Post</button>
    </div>
  </div>
</div>`,
        explanation:
          'Spotify Wrapped transforms a year of listening into a celebration of personal identity. Large numbers ("47,832 minutes") create pride. Comparative stats ("more than 95%") add social validation. The share-first design drives massive viral distribution.',
        principle:
          'Transform usage data into an identity-affirming celebration that users want to share',
      },
      {
        title: 'Google Photos Memories',
        description:
          'Automatically generated photo memories surfaced at the right moment',
        code: `<div class="photo-memories">
  <h3>Remember this trip?</h3>
  <p class="subtitle">4 years ago in Barcelona</p>

  <div class="memory-reel">
    <div class="photo-grid">
      <img src="sagrada-familia.jpg" alt="Sagrada Familia cathedral">
      <img src="tapas.jpg" alt="Tapas dinner with friends">
      <img src="beach-sunset.jpg" alt="Barcelona beach at sunset">
      <img src="park-guell.jpg" alt="Colorful mosaics at Park Guell">
    </div>
    <span class="count">+23 more photos</span>
  </div>

  <div class="memory-actions">
    <button class="primary">View Full Trip</button>
    <button class="secondary">Create Movie</button>
    <button class="tertiary">Not interested</button>
  </div>
</div>`,
        explanation:
          'Groups photos by trip/event and presents them as a cohesive memory. The location-based framing ("Barcelona") triggers vivid positive recall. "Create Movie" deepens engagement by letting users actively reconstruct and share their idealized memory.',
        principle:
          'Cluster content by meaningful events and let users co-create the narrative',
      },
    ],

    bad: [
      {
        title: 'Surfacing Painful Memories Without Filters',
        description:
          'Showing "On This Day" content from a period of loss or breakup',
        code: `<!-- DON'T DO THIS -->
<div class="memories-card">
  <h3>On This Day - 1 Year Ago</h3>
  <div class="memory">
    <img src="couple-photo.jpg" alt="Photo with ex-partner">
    <p>"Best anniversary dinner ever! ❤️ @ExPartner"</p>
    <p class="reactions">❤️ 89 reactions</p>
  </div>
  <!-- No hide button, no content filtering -->
  <button>Share This Memory</button>
</div>`,
        explanation:
          'Algorithmically surfacing relationship content after a breakup causes real emotional harm. High engagement (89 reactions) makes the algorithm think this is a "good" memory to show. Without sentiment filtering, content controls, or easy hiding, this creates a deeply negative product experience.',
        principle:
          'Never surface memories without robust content filtering and prominent user controls',
      },
      {
        title: 'Nostalgia as Cancellation Blocker',
        description:
          'Using memories to guilt users out of cancelling a subscription',
        code: `<!-- DON'T DO THIS -->
<div class="cancel-flow">
  <h2>Are you sure? Look at everything you'll lose...</h2>

  <div class="guilt-memories">
    <div class="memory">Your first playlist from 2019 🎵</div>
    <div class="memory">247 hours of music this year 🎧</div>
    <div class="memory">Your Wrapped stories from 5 years 📊</div>
  </div>

  <p class="warning">⚠️ All your history and playlists will be deleted forever.</p>

  <button class="danger">Cancel and Lose Everything</button>
  <button class="primary">Keep My Memories</button>
</div>`,
        explanation:
          'Using nostalgia-laden content as a weapon during cancellation is a dark pattern. Framing cancellation as "losing memories" exploits rosy retrospection to create loss aversion. The threatening language and asymmetric button design are manipulative.',
        principle:
          'Never weaponize nostalgia to prevent users from leaving',
      },
      {
        title: 'Forced Nostalgia Notifications',
        description:
          'Bombarding users with daily memory notifications they cannot easily disable',
        code: `<!-- DON'T DO THIS -->
<div class="notification-spam">
  <!-- Monday -->
  <div class="notification">📸 You have memories from 1 year ago!</div>
  <!-- Tuesday -->
  <div class="notification">🕰️ Remember this day 2 years ago?</div>
  <!-- Wednesday -->
  <div class="notification">✨ A memory from 3 years ago is waiting!</div>
  <!-- Thursday -->
  <div class="notification">📸 You have memories from 4 years ago!</div>

  <!-- Settings buried 5 levels deep -->
  <small>To adjust: Settings → Privacy → Data → Memories → Notifications</small>
</div>`,
        explanation:
          'Daily nostalgia notifications with buried opt-out controls create notification fatigue and annoyance. The emotional manipulation of memory-baiting ("a memory is waiting!") treats user attention as a resource to exploit rather than respect.',
        principle:
          'Respect user attention; make nostalgia features opt-in with easy, accessible controls',
      },
    ],

    realWorld: [
      {
        company: 'Facebook / Instagram',
        product: 'On This Day / Memories',
        description: 'Facebook and Instagram surface past posts, photos, and stories from 1, 2, 3+ years ago. The feature algorithmically selects high-engagement content and allows users to share memories as new posts. After initial issues with painful memories, they added sentiment filtering and hide controls.',
        effectiveness: 'very-effective',
        analysis: 'Pioneered the "memories" pattern in social media. Drives significant daily engagement by giving users a reason to open the app even when they have nothing new to share. The addition of content filtering and user controls was essential for ethical implementation.',
      },
      {
        company: 'Spotify',
        product: 'Wrapped',
        description: 'Annual year-in-review experience that transforms listening data into a personalized, shareable story. Shows top artists, songs, genres, minutes listened, and comparative stats. The shareable card format drives massive organic social media distribution every December.',
        effectiveness: 'very-effective',
        analysis: 'One of the most successful examples of rosy retrospection in product design. Wrapped turns passive consumption data into an identity statement. Users share their Wrapped as self-expression, generating billions of social media impressions and driving competitor envy.',
      },
      {
        company: 'Google',
        product: 'Google Photos Memories',
        description: 'Google Photos automatically creates memory collections based on trips, events, and time periods. Uses ML to cluster photos by location and time, applies aesthetic filters, and can auto-generate highlight videos with music. Surfaced at the top of the app and via notifications.',
        effectiveness: 'very-effective',
        analysis: 'Leverages Google\'s ML capabilities to create emotionally resonant memory experiences. The auto-generated videos are particularly powerful because they add cinematic production value to ordinary moments, amplifying the rosy retrospection effect.',
      },
      {
        company: 'Apple',
        product: 'Apple Photos Memories',
        description: 'Apple Photos creates "Memories" collections with curated photos, auto-generated slideshows set to music, and themed collections (e.g., "Best of Summer," "A Year with Your Dog"). Uses on-device ML for content selection and categorization.',
        effectiveness: 'effective',
        analysis: 'Apple\'s privacy-first approach means all ML processing happens on-device, which limits the sophistication of curation compared to cloud-based solutions. However, the music-set slideshows create strong emotional responses and the themed collections are well-curated.',
      },
    ],

    abTests: [
      {
        title: 'Memories Feature: With vs Without Sentiment Filtering',
        hypothesis:
          'Adding sentiment filtering to memories will increase engagement and reduce negative feedback',
        controlVersion: {
          description:
            'Memories feature showing all past content from the same date, regardless of emotional context',
          metrics: {
            conversionRate: '34% share rate',
            timeOnPage: '1:12 average viewing time',
            scrollDepth: '18% hide/dismiss rate',
          },
        },
        treatmentVersion: {
          description:
            'Memories feature with ML-based sentiment filtering that excludes potentially negative content (breakup posts, hospital photos, funeral-related content)',
          metrics: {
            conversionRate: '52% share rate',
            timeOnPage: '2:45 average viewing time',
            scrollDepth: '4% hide/dismiss rate',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Sentiment filtering dramatically improved the memories experience. Share rate increased by 53% because users saw content they actually wanted to share. Hide/dismiss rate dropped by 78%, indicating far fewer painful memories were surfaced. Average viewing time more than doubled.',
          learnings: [
            'Content curation is essential—raw "On This Day" content includes painful memories',
            'Users are far more likely to share curated positive memories than unfiltered content',
            'Reducing negative memory exposure significantly decreases feature complaints',
            'The rosy retrospection effect is strongest when the product reinforces the positive bias',
          ],
        },
      },
      {
        title: 'Year-in-Review: Statistics Only vs Narrative + Statistics',
        hypothesis:
          'Adding narrative framing to year-in-review data will increase engagement and sharing',
        controlVersion: {
          description:
            'Year-in-review showing raw statistics: "You listened to 523 songs, 89 artists, for 31,440 minutes"',
          metrics: {
            conversionRate: '22% share rate',
            clickThroughRate: '41% completion rate',
          },
        },
        treatmentVersion: {
          description:
            'Year-in-review with narrative framing: "You started the year with jazz mornings and ended it with indie rock nights. Your musical journey took you through 89 artists across 12 genres."',
          metrics: {
            conversionRate: '61% share rate',
            clickThroughRate: '78% completion rate',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Narrative framing nearly tripled the share rate. Users completed the full review at almost double the rate. The story format transformed data into identity-affirming content that users wanted to share as self-expression.',
          learnings: [
            'Raw statistics are informative but not emotionally engaging',
            'Narrative framing activates rosy retrospection more strongly than numbers alone',
            'Users share stories about themselves, not spreadsheets about themselves',
            'The strongest year-in-review experiences combine personal narrative with impressive statistics',
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
        name: 'Memory/Nostalgia UI',
        description:
          'Warm-toned cards or overlays showing past content with date stamps like "3 Years Ago"',
        howToSpot:
          'Look for sepia filters, warm color palettes, clock/calendar icons, and "On This Day" or "Memories" labels',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Year-in-Review Presentations',
        description:
          'Full-screen, shareable summary experiences with personalized statistics and highlights',
        howToSpot:
          'Look for annual summary features, "Wrapped" or "Year in Review" branding, and share-to-social buttons',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Anniversary and Milestone Markers',
        description:
          'Celebrations of account age, relationship milestones, or usage landmarks',
        howToSpot:
          'Look for "X years with us," "Your journey," or congratulatory messages tied to dates',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Curated Photo/Content Collections',
        description:
          'Auto-generated albums, slideshows, or highlight reels from past content',
        howToSpot:
          'Look for "Best of," "Highlights," or auto-generated video/slideshow features',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Re-engagement Nostalgia Prompts',
        description:
          'Emails or notifications that reference a user\'s positive past activity to lure them back',
        howToSpot:
          'Look for "We miss you" messaging paired with user-specific past highlights or achievements',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'On This Day Pattern',
        description: 'Surfacing past content from the same calendar date in previous years',
        indicators: ['Date-stamped memory cards', '"X years ago" labels', 'Historical content in feeds or notifications', 'Share buttons on memory content'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Year-in-Review Pattern',
        description: 'Annual summary experience that curates and celebrates a user\'s activity',
        indicators: ['Personalized annual statistics', 'Narrative framing of usage data', 'Shareable summary cards', 'Ranked lists (top songs, top places, etc.)'],
        severity: ImpactLevel.CRITICAL,
        confidence: 'high',
      },
      {
        name: 'Memory Curation Pattern',
        description: 'Algorithmic selection of positive past content while filtering negative content',
        indicators: ['High-engagement content prioritized in memories', 'Sentiment filtering of surfaced content', 'User controls to hide or manage memories', 'Themed collections ("Best of Summer")'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Nostalgia Re-engagement Pattern',
        description: 'Using past positive experiences to re-activate lapsed users',
        indicators: ['"We miss you" emails with personal highlights', 'Push notifications referencing past achievements', 'Cancellation flows showing usage history', 'Return-user experiences featuring past content'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Does the feature surface past content from the user\'s history?',
      'Is the content curated to emphasize positive memories over negative ones?',
      'Are there robust controls for users to hide painful or unwanted memories?',
      'Does the feature use warm, nostalgic visual treatments (color, filters, typography)?',
      'Is there a sharing mechanism that drives viral distribution of memories?',
      'Are memories features opt-in or opt-out, and how accessible are the controls?',
      'Does the feature include sentiment filtering to avoid surfacing harmful content?',
      'Are year-in-review or summary features framed as celebrations rather than reports?',
      'Is nostalgia being used ethically (engagement) or manipulatively (preventing cancellation)?',
      'Does the design consider users with traumatic histories who may not want memories surfaced?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in rosy retrospection and nostalgia-driven design.

Analyze the provided design for rosy retrospection patterns. Identify:

1. **Memory Surfacing**: How past content, photos, or activities are presented to users
2. **Nostalgia Curation**: How content is selected and filtered for positive emotional impact
3. **Year-in-Review / Summary Experiences**: Annual or periodic retrospective features
4. **Re-engagement Nostalgia**: Use of past positive experiences to drive return visits
5. **User Controls**: Ability to manage, hide, or opt out of memory features

For each pattern found:
- Identify what memories or past content are being surfaced
- Assess whether content filtering protects users from painful memories
- Determine if nostalgia is used ethically (engagement) or manipulatively (retention tricks)
- Evaluate the quality of user controls and opt-out mechanisms
- Suggest improvements for more ethical, effective nostalgia design

Consider:
- Could the feature surface traumatic content (breakups, losses, illness)?
- Is nostalgia used to block cancellation or manipulate decisions?
- Do users have meaningful control over what memories are shown?
- Is the feature genuinely valuable or just an engagement hack?
- Are memories accessible to users with different abilities?

Provide actionable recommendations for ethical, user-centered nostalgia design.`,

    outputSchema: {
      type: 'object',
      properties: {
        nostalgiaPatterns: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              contentSurfaced: { type: 'string' },
              emotionalImpact: { type: 'string' },
              sentimentFiltering: { type: 'string' },
              userControls: { type: 'string' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'contentSurfaced',
              'emotionalImpact',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            curationQuality: { type: 'number' },
            userControlScore: { type: 'number' },
            emotionalSafety: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'curationQuality',
            'userControlScore',
            'emotionalSafety',
            'ethicalScore',
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
        'nostalgiaPatterns',
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
        title: 'Identify Memory-Worthy Content',
        description:
          'Determine which past user content and data can be surfaced as meaningful memories',
        example:
          'Photos with high engagement, milestones (first post, 100th check-in), trips, and celebrations',
        tips: [
          'Prioritize content the user actively created or engaged with',
          'Look for natural clusters: trips, events, seasons, milestones',
          'Consider both explicit content (posts, photos) and implicit data (listening history, locations)',
        ],
      },
      {
        step: 2,
        title: 'Implement Sentiment Filtering',
        description:
          'Build robust content filtering to prevent surfacing painful or traumatic memories',
        example:
          'Filter out content from periods around relationship status changes, obituary-related posts, hospital check-ins',
        tips: [
          'Use NLP to detect negative sentiment in captions and comments',
          'Cross-reference with known difficult events (unfollows, blocks, deletions)',
          'Allow users to mark date ranges as "do not show memories"',
        ],
      },
      {
        step: 3,
        title: 'Design the Nostalgia Experience',
        description:
          'Create warm, emotionally resonant presentations for memory content',
        example:
          'Use warm color palettes, gentle animations, and celebratory framing ("Remember this wonderful day?")',
        tips: [
          'Warm tones (amber, gold) reinforce the rosy quality of retrospection',
          'Time labels ("3 Years Ago") trigger natural nostalgia',
          'Narrative framing is more engaging than raw data presentation',
        ],
      },
      {
        step: 4,
        title: 'Build User Controls',
        description:
          'Provide prominent, easy-to-use controls for managing memory features',
        example:
          'Hide this memory, hide this person, hide this date range, turn off memories entirely',
        tips: [
          'Place controls on the memory card itself, not buried in settings',
          'Allow granular control (specific memories, people, date ranges)',
          'Respect user preferences immediately and persistently',
        ],
      },
      {
        step: 5,
        title: 'Enable Sharing and Social Distribution',
        description:
          'Design memories to be easily shareable as a driver of organic growth',
        example:
          'One-tap share to Stories, feed posts, or external social platforms with branded templates',
        tips: [
          'Shareable cards should be visually appealing as standalone content',
          'Include product branding subtly so shared cards drive awareness',
          'Test share formats across different social platforms for optimal display',
        ],
      },
    ],

    dos: [
      'Curate memories for positive emotional impact using sentiment analysis',
      'Provide prominent, easy-to-find controls to hide or manage memories',
      'Use warm, nostalgic visual treatments to reinforce positive recall',
      'Allow users to opt out of memories features entirely',
      'Filter out potentially painful content (breakups, losses, illness)',
      'Frame year-in-review features as celebrations, not just data reports',
      'Make memories shareable to drive organic engagement and growth',
      'Respect user-marked sensitive date ranges permanently',
    ],

    donts: [
      'Don\'t surface memories without sentiment filtering for negative content',
      'Don\'t use nostalgia to manipulate users into staying or paying',
      'Don\'t show memories from periods around known painful events',
      'Don\'t bombard users with daily memory notifications without easy opt-out',
      'Don\'t use "you\'ll lose your memories" as a cancellation deterrent',
      'Don\'t force memories features on users who have opted out',
      'Don\'t surface memories involving people the user has blocked or unfollowed',
      'Don\'t rely solely on engagement metrics to determine "good" memories',
    ],

    bestPractices: [
      {
        title: 'Sentiment-First Curation',
        description:
          'Always filter memory content through sentiment analysis before surfacing to users',
        rationale:
          'A single painful memory can create a lasting negative product association that outweighs months of positive memories',
        example:
          'Use NLP + engagement signals + user-reported preferences to score memory candidates before display',
      },
      {
        title: 'Meaningful Intervals Over Constant Prompts',
        description:
          'Surface memories at meaningful intervals (anniversaries, milestones) rather than constantly',
        rationale:
          'Nostalgia fatigue reduces emotional impact. Rare, well-timed memories feel special; daily notifications feel spammy.',
        example:
          'Show memories weekly, on exact anniversaries, or when triggered by location/context rather than daily',
      },
      {
        title: 'Narrative Over Numbers',
        description:
          'Frame retrospective content as stories rather than statistics',
        rationale:
          'Rosy retrospection is a narrative bias—people remember stories, not spreadsheets',
        example:
          '"Your summer started with road trips and ended with beach sunsets" vs "You took 47 photos in July"',
      },
      {
        title: 'Co-Creation Over Passive Display',
        description:
          'Let users participate in curating their memories rather than passively consuming them',
        rationale:
          'Active engagement with memories deepens the emotional connection and gives users agency',
        example:
          'Allow users to create custom memory collections, add captions, choose highlight photos',
      },
      {
        title: 'Ethical Nostalgia Boundaries',
        description:
          'Draw clear lines between using nostalgia for engagement versus manipulation',
        rationale:
          'Nostalgia features should make users happy, not trap them. Trust is built through respect.',
        example:
          'Never use memories in cancellation flows, payment prompts, or guilt-based re-engagement',
      },
    ],

    accessibility: [{
        wcagLevel: 'AA',
        criterion: '1.1.1',
        guideline:
          'Text Alternatives - Memory photos and content must have descriptive alt text',
        implementation:
          'Auto-generate alt text for memory photos that conveys emotional context ("Photo from your beach trip, 3 years ago") not just visual content',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.3.1',
        guideline:
          'Three Flashes or Below Threshold - Memory animations and transitions must be safe',
        implementation:
          'Ensure slideshow transitions, memory reveal animations, and year-in-review effects do not flash more than 3 times per second',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.5.1',
        guideline:
          'Pointer Gestures - Swipe-based memory navigation needs alternatives',
        implementation:
          'Provide button-based navigation alternatives for swipe carousels in memories features so users who cannot perform swipe gestures can still browse',
      },
    ],

    ethics: [
      {
        concern: 'Traumatic Memory Surfacing',
        severity: 'critical',
        explanation:
          'Memories features can surface content from painful periods (breakups, deaths, illness, job loss) causing real emotional harm',
        mitigation:
          'Implement multi-layered sentiment filtering: NLP analysis, engagement pattern detection, user-reported sensitive dates, and prominent one-tap hide controls on every memory.',
      },
      {
        concern: 'Nostalgia as Retention Dark Pattern',
        severity: 'critical',
        explanation:
          'Using "you\'ll lose your memories" messaging to prevent cancellation exploits emotional attachment',
        mitigation:
          'Never reference memories or history in cancellation flows. Allow data export. Separate the memory experience from monetization pressure.',
      },
      {
        concern: 'Notification Manipulation',
        severity: 'high',
        explanation:
          'Using emotionally-loaded memory notifications to drive app opens regardless of user value',
        mitigation:
          'Limit memory notification frequency. Make opt-out prominent. Ensure notifications lead to genuinely valuable content, not empty engagement bait.',
      },
      {
        concern: 'Children and Minors',
        severity: 'high',
        explanation:
          'Surfacing memories for young users may include content from periods they\'d rather forget (bullying, embarrassment)',
        mitigation:
          'Apply extra-strict sentiment filtering for users under 18. Consider not enabling memories for minors by default.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Cognitive, Emotional, and Temporal Correlates of Autobiographical Memory: Are Rosy Perceptions Related to the Fading Affect Bias?',
        author: 'Walker, W. R., Skowronski, J. J., & Thompson, C. P.',
        year: 2003,
        description:
          'Demonstrates that the fading affect bias—negative emotions fading faster than positive ones—underlies rosy retrospection in autobiographical memory',
        type: 'foundational',
      },
      {
        title: 'A Trip into the Past: Temporal, Emotional, and Practical Aspects of Touring',
        author: 'Mitchell, T. R., Thompson, L., Peterson, E., & Cronk, R.',
        year: 1997,
        doi: '10.1006/jvbe.1997.1597',
        description:
          'The seminal vacation study showing people rate experiences more positively in retrospect than they did in real-time diary entries during the experience',
        type: 'foundational',
      },
      {
        title: 'The Fading Affect Bias: But What the Hell is it For?',
        author: 'Walker, W. R., & Skowronski, J. J.',
        year: 2009,
        description:
          'Explores the evolutionary function of rosy retrospection and why negative emotions fade faster than positive ones in memory',
        type: 'advanced',
      },
      {
        title: 'Looking Forward to Looking Back: An Integrative Review of Nostalgia Research',
        author: 'Sedikides, C., Wildschut, T., Arndt, J., & Routledge, C.',
        year: 2008,
        description:
          'Comprehensive review of nostalgia research connecting rosy retrospection to self-continuity, social connectedness, and meaning',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Stumbling on Happiness',
        author: 'Gilbert, Daniel',
        year: 2006,
        isbn: '9781400077427',
        description:
          'Explores how memory biases including rosy retrospection cause people to mispredict what will make them happy',
        type: 'foundational',
      },
      {
        title: 'The Seven Sins of Memory',
        author: 'Schacter, Daniel L.',
        year: 2001,
        isbn: '9780618219193',
        description:
          'Covers memory biases and distortions including the positive memory bias that drives rosy retrospection',
        type: 'foundational',
      },
    ],

    articles: [
      {
        title: 'The Psychology Behind Spotify Wrapped',
        author: 'Psychology Today',
        url: 'https://www.psychologytoday.com/us/blog/the-psychology-of-design',
        description:
          'Analysis of how Spotify Wrapped leverages rosy retrospection and identity psychology to drive engagement',
        type: 'practical',
      },
      {
        title: 'Designing for Nostalgia in Digital Products',
        author: 'UX Collective',
        url: 'https://uxdesign.cc/designing-for-nostalgia',
        description:
          'Practical guide to using nostalgia and memory biases ethically in product design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'Why We Remember Things Better Than They Were',
        author: 'Vsauce',
        url: 'https://www.youtube.com/watch?v=rosy-retrospection',
        description:
          'Accessible explanation of rosy retrospection and the fading affect bias with everyday examples',
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
      'social-proof',
      'recency-effect',
      'von-restorff-effect',
      'loss-aversion',
    ],

    conflicts: [
      'base-rate-neglect',
    ],

    confusedWith: [
      'recency-bias',
      'salience-bias',
      'vividness-effect',
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'recency-bias',
        'salience-bias',
      ],
    },
  },
};
