/**
 * ZEIGARNIK EFFECT
 *
 * We remember interrupted tasks better than completed ones
 */


import type { BiasCard } from '../core/types.js';
import {
  BiasCategory,
  ImpactLevel,
} from '../core/types.js';

export const zeigarnikEffect: BiasCard = {
  //===========================================
  // METADATA
  //===========================================
  metadata: {
    id: 'zeigarnik-effect',
    name: 'Zeigarnik Effect',
    aliases: ['Incomplete Task Effect', 'Open Loop Effect'],
    category: BiasCategory.MEMORY,
    relatedCategories: [
      BiasCategory.DECISION_MAKING,
      BiasCategory.PERCEPTION,
      BiasCategory.MEMORY,
    ],
    tags: [
      'memory',
      'task-completion',
      'motivation',
      'engagement',
      'progress',
      'open-loops',
    ],
  },

  //===========================================
  // DEFINITION
  //===========================================
  definition: {
    simple: 'We remember interrupted tasks better than completed ones',

    detailed: `The Zeigarnik Effect is a memory phenomenon where incomplete or interrupted tasks are remembered significantly better than completed ones. The mind maintains a state of cognitive tension for unfinished activities, keeping them active in working memory until they are resolved or completed.

This effect creates a powerful psychological "open loop" — an unresolved mental thread that demands closure. Once a task is completed, the tension dissipates and the memory fades more quickly. This is why cliffhangers in storytelling are so effective, and why we can recall the details of an abandoned shopping cart but not one we checked out last week.

In UX design, the Zeigarnik Effect is the engine behind progress bars, incomplete profile nudges, streak systems, save-for-later features, and "continue where you left off" prompts. When used ethically, it motivates users to complete valuable actions. When abused, it creates guilt, anxiety, and dark-pattern manipulation.`,

    psychologyBasis: {
      discoveredBy: 'Bluma Zeigarnik',
      year: 1927,
      theory: 'Gestalt Psychology / Field Theory (Kurt Lewin)',
      mechanism: `The brain maintains cognitive tension for incomplete tasks, keeping them active in memory until resolved. This happens because:

1. **Open Loop Persistence**: Unfinished tasks create a quasi-need — a state of mental tension that keeps the task rehearsed in working memory
2. **Closure Drive**: The mind seeks completion and resolution; incomplete items generate an intrinsic motivation to finish
3. **Interrupted Encoding**: When a task is interrupted, the brain encodes the interruption context alongside the task, creating stronger and more distinctive memory traces
4. **Goal Activation**: Unfulfilled goals remain cognitively active, causing related information to be more accessible in memory (demonstrated by Ovsiankina's resumption effect)
5. **Tension Discharge**: Completing the task releases the cognitive tension, allowing the memory to fade — which is why completed tasks are recalled less vividly

The effect is stronger when the person is invested in the task and weaker when the task feels externally imposed or meaningless.`,
    },

    realWorldExample: `In Zeigarnik's original 1927 experiment, participants were given a series of simple tasks (puzzles, arithmetic, crafts). Half the tasks were interrupted before completion. When asked to recall which tasks they had performed, participants remembered the interrupted tasks nearly twice as well as the completed ones. The unresolved cognitive tension kept those tasks front-of-mind.`,
  },

  //===========================================
  // DESIGN IMPACT
  //===========================================
  designImpact: {
    description: `The Zeigarnik Effect is one of the most powerful engagement drivers in product design. By showing users their incomplete state and the path to completion, designers create intrinsic motivation to continue. This effect influences:

- Progress indicators that show how close users are to finishing a task
- Profile completion nudges that highlight missing information
- Onboarding checklists that break setup into visible, trackable steps
- Save-for-later and draft states that pull users back
- Streak systems and daily goals that create open loops around consistency
- Cliffhanger content and autoplay features that exploit the desire for closure`,

    whenToUse: [
      {
        title: 'Onboarding Flows',
        scenario:
          'When guiding new users through multi-step setup or configuration',
        example:
          'Show a checklist with 3 of 7 steps completed, with a progress bar at 43%, making the incomplete state visible and the next step clear',
        impact: ImpactLevel.CRITICAL,
      },
      {
        title: 'Profile Completion',
        scenario: 'When encouraging users to fill in optional profile data',
        example:
          'Display "Your profile is 65% complete" with specific missing fields highlighted, creating an open loop around the incomplete profile',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Learning and Education',
        scenario: 'When motivating users to continue courses or training programs',
        example:
          'Show lesson progress with "2 of 5 lessons completed" and a preview of the next lesson topic to create anticipation',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'E-commerce Cart Recovery',
        scenario: 'When reminding users about abandoned carts or saved items',
        example:
          'Send "You left 3 items in your cart" with thumbnails of the specific products, reactivating the open purchase loop',
        impact: ImpactLevel.HIGH,
      },
      {
        title: 'Content Consumption',
        scenario: 'When encouraging users to continue consuming content',
        example:
          'Show "Continue watching" or "Continue reading" with a progress indicator showing where the user left off',
        impact: ImpactLevel.MEDIUM,
      },
      {
        title: 'Task Management',
        scenario: 'When helping users track and complete work items',
        example:
          'Display incomplete tasks prominently with clear progress, making the open loops visible and actionable',
        impact: ImpactLevel.MEDIUM,
      },
    ],

    whenToAvoid: [
      {
        title: 'Overwhelming Task Lists',
        reason:
          'Too many open loops create anxiety rather than motivation',
        consequence:
          'Users feel overwhelmed, paralyzed, or guilty about the volume of incomplete items, leading to avoidance and churn',
        alternative:
          'Limit visible incomplete tasks to 3-5 at a time. Prioritize and batch remaining tasks behind progressive disclosure.',
      },
      {
        title: 'Low-Value or Optional Tasks',
        reason:
          'Creating completion pressure for trivial tasks erodes trust and annoys users',
        consequence:
          'Users resent being nudged to complete tasks they do not care about, damaging the relationship with the product',
        alternative:
          'Only apply completion nudges to tasks that genuinely benefit the user. Let optional tasks remain quiet.',
      },
      {
        title: 'Guilt-Tripping Notifications',
        reason:
          'Using the Zeigarnik Effect to guilt users into returning is manipulative',
        consequence:
          'Users feel anxious, stressed, or manipulated, leading to notification fatigue and app deletion',
        alternative:
          'Frame reminders positively ("Pick up where you left off!") rather than negatively ("You haven\'t finished!").',
      },
      {
        title: 'Health and Wellbeing Contexts',
        reason:
          'Streak pressure and completion anxiety can harm mental health',
        consequence:
          'Users exercise while injured, skip sleep to maintain streaks, or feel disproportionate guilt over missed goals',
        alternative:
          'Offer "streak freezes", celebrate effort over perfection, and allow graceful breaks without punishment.',
      },
    ],

    commonMistakes: [
      {
        title: 'Too Many Open Loops',
        description:
          'Showing dozens of incomplete tasks, badges, and progress bars simultaneously across the interface',
        why: 'The Zeigarnik Effect generates cognitive tension per open loop; too many loops overwhelm working memory and cause anxiety instead of motivation',
        fix: 'Limit visible incomplete items. Use progressive disclosure and prioritize the 1-3 most important next actions.',
      },
      {
        title: 'No Clear Path to Completion',
        description:
          'Showing progress percentages without making the next step obvious or actionable',
        why: 'An open loop without a clear resolution path creates frustration, not motivation — the user feels stuck, not driven',
        fix: 'Always pair progress indicators with a clear, single next action. "Your profile is 70% complete — add a photo to reach 85%."',
      },
      {
        title: 'Artificial or Meaningless Progress',
        description:
          'Inflating the number of steps or creating fake milestones to manipulate engagement',
        why: 'Users quickly recognize artificial padding and lose trust in the progress system entirely',
        fix: 'Ensure every step in a progress flow delivers real value to the user. Remove steps that exist only to extend the loop.',
      },
      {
        title: 'Punitive Streak Breaks',
        description:
          'Resetting all progress or removing rewards when a user misses a single day',
        why: 'Harsh punishment for breaking a streak converts positive motivation into resentment and churn',
        fix: 'Offer streak freezes, grace periods, or partial credit. Celebrate the streak length, not the break.',
      },
    ],

    impactAreas: {
      layout: {
        level: ImpactLevel.CRITICAL,
        description:
          'Layout determines where progress indicators, checklists, and incomplete-state cues appear, directly influencing how strongly the open loop is perceived',
        examples: [
          'Persistent progress bars in headers or sidebars keep the open loop visible',
          'Checklist layouts with completed and uncompleted items create clear visual gaps',
          'Dashboard cards showing incomplete tasks pull attention to unresolved items',
          'Sticky "continue" banners keep the re-entry point always accessible',
        ],
      },
      typography: {
        level: ImpactLevel.MEDIUM,
        description:
          'Text weight, completion language, and progress labels frame the emotional tone of the open loop',
        examples: [
          'Bold "2 of 5 complete" labels make progress state immediately scannable',
          'Muted text on completed items vs bold text on next steps directs attention forward',
          'Encouraging microcopy ("Almost there!") sustains positive motivation',
          'Progress percentages in large type create a strong numerical anchor for completion',
        ],
      },
      color: {
        level: ImpactLevel.HIGH,
        description:
          'Color encodes completion state, creating instant visual distinction between done and not-done',
        examples: [
          'Green checkmarks on completed steps vs grey or outline on incomplete steps',
          'Progress bar fill color transitioning from red to yellow to green as completion nears',
          'Highlighted or colored badges on incomplete profile sections draw attention',
          'Dimmed or desaturated completed items let incomplete items stand out',
        ],
      },
      interaction: {
        level: ImpactLevel.CRITICAL,
        description:
          'Interactions determine how users re-enter incomplete tasks, experience completion moments, and receive progress feedback',
        examples: [
          '"Continue where you left off" buttons reduce friction for resuming tasks',
          'Completion animations (confetti, checkmarks) provide satisfying closure and tension release',
          'Auto-save with visible draft indicators maintain the loop without losing progress',
          'Swipe-to-complete gestures in task lists give tactile satisfaction to closing loops',
        ],
      },
      content: {
        level: ImpactLevel.HIGH,
        description:
          'Content framing determines whether open loops feel motivating or anxiety-inducing',
        examples: [
          '"3 steps to go" is more motivating than "You have not completed 3 steps"',
          'Previewing the next step or reward sustains forward momentum',
          'Cliffhanger summaries at the end of content sections pull users into the next section',
          'Draft labels and "saved for later" text keep purchase or creation loops active',
        ],
      },
      accessibility: {
        level: ImpactLevel.HIGH,
        description:
          'Progress states, completion indicators, and open-loop cues must be perceivable and understandable by all users',
        examples: [
          'Screen readers must announce progress state ("Step 3 of 7, 43% complete")',
          'Color-coded progress must have text or icon alternatives for color-blind users',
          'Keyboard users must be able to navigate directly to their next incomplete task',
          'ARIA progressbar roles and aria-valuenow attributes convey completion state programmatically',
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
        title: 'LinkedIn Profile Completion Bar',
        description:
          'Profile strength indicator showing completion percentage with specific suggestions for improvement',
        code: `<div class="profile-completion">
  <h3>Profile Strength: Intermediate</h3>
  <div class="progress-bar" role="progressbar"
       aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-fill" style="width: 65%"></div>
  </div>
  <p class="progress-label">65% complete</p>

  <div class="next-steps">
    <h4>Add these to reach All-Star:</h4>
    <ul class="suggestions">
      <li class="suggestion">
        <span class="icon">📸</span>
        <div>
          <strong>Add a profile photo</strong>
          <p>Profiles with photos get 21x more views</p>
        </div>
        <button class="action">Add</button>
      </li>
      <li class="suggestion">
        <span class="icon">📝</span>
        <div>
          <strong>Write a summary</strong>
          <p>Tell visitors about your experience and goals</p>
        </div>
        <button class="action">Write</button>
      </li>
    </ul>
  </div>
</div>`,
        explanation:
          'The visible progress bar creates an open loop — "65% complete" implies 35% missing. Specific next steps make the path to closure actionable. The benefit statements ("21x more views") add value to completion rather than relying on guilt.',
        principle:
          'Show clear progress with actionable next steps and genuine user benefit',
        metrics: {
          before: '23% of users completed profiles with no progress indicator',
          after: '55% of users completed profiles with completion bar and suggestions',
          improvement: '139% increase in profile completion rate',
        },
      },
      {
        title: 'Duolingo Daily Goal and Streak System',
        description:
          'Lesson progress tracking with daily goals and streak counter that motivates consistent practice',
        code: `<div class="daily-progress">
  <div class="streak-counter">
    <span class="flame-icon">🔥</span>
    <span class="streak-number">14</span>
    <span class="streak-label">day streak</span>
  </div>

  <div class="daily-goal">
    <h4>Daily Goal</h4>
    <div class="goal-progress" role="progressbar"
         aria-valuenow="30" aria-valuemin="0" aria-valuemax="50">
      <div class="goal-fill" style="width: 60%"></div>
    </div>
    <p>30 / 50 XP today</p>
    <p class="encouragement">One more lesson to hit your goal!</p>
  </div>

  <div class="lesson-progress">
    <h4>Spanish Basics 2</h4>
    <div class="lessons">
      <span class="lesson complete" aria-label="Lesson 1 complete">✓</span>
      <span class="lesson complete" aria-label="Lesson 2 complete">✓</span>
      <span class="lesson current" aria-label="Lesson 3 in progress">3</span>
      <span class="lesson locked" aria-label="Lesson 4 locked">4</span>
      <span class="lesson locked" aria-label="Lesson 5 locked">5</span>
    </div>
  </div>
</div>`,
        explanation:
          'Multiple Zeigarnik loops work together: the daily XP goal (60% done), the lesson unit (2 of 5), and the streak (14 days — do not break it). Each loop is independent but reinforcing, creating strong but manageable motivation.',
        principle:
          'Layer complementary open loops that reinforce each other without overwhelming',
        metrics: {
          before: '12% daily return rate without streak system',
          after: '47% daily return rate with streak and daily goals',
          improvement: '292% increase in daily active engagement',
        },
      },
      {
        title: 'Netflix "Continue Watching" and Autoplay',
        description:
          'Resume viewing row and automatic next episode queuing that leverages unfinished narrative loops',
        code: `<section class="continue-watching">
  <h2>Continue Watching</h2>
  <div class="show-cards">
    <div class="show-card">
      <div class="thumbnail">
        <img src="show-1.jpg" alt="Breaking Bad S3E7">
        <div class="progress-bar">
          <div class="watched" style="width: 73%"></div>
        </div>
      </div>
      <p class="show-title">Breaking Bad</p>
      <p class="episode-info">S3:E7 · 18 min remaining</p>
    </div>
    <div class="show-card">
      <div class="thumbnail">
        <img src="show-2.jpg" alt="The Crown S2E1">
        <div class="progress-bar">
          <div class="watched" style="width: 0%"></div>
        </div>
      </div>
      <p class="show-title">The Crown</p>
      <p class="episode-info">S2:E1 · Next Episode</p>
    </div>
  </div>
</section>

<!-- Autoplay countdown after episode -->
<div class="autoplay-next">
  <p>Next Episode in <strong>5</strong> seconds</p>
  <p class="next-title">S3:E8 — "I See You"</p>
  <button class="play-now">Play Now</button>
  <button class="cancel">Cancel</button>
</div>`,
        explanation:
          'The "Continue Watching" row surfaces unfinished narrative loops — you left a show mid-episode, so the story is unresolved. Autoplay exploits the open loop at episode boundaries: the cliffhanger creates tension, and autoplay provides instant resolution.',
        principle:
          'Surface unfinished content with clear re-entry points; leverage narrative cliffhangers for natural continuation',
      },
      {
        title: 'Gmail Draft Indicator',
        description:
          'Visual indicator for unsent drafts that keeps the communication loop visible',
        code: `<div class="email-list">
  <div class="email-row draft">
    <span class="draft-label">Draft</span>
    <span class="recipient">To: Sarah Chen</span>
    <span class="subject">Re: Q3 Planning — </span>
    <span class="preview">I think we should consider the budget for...</span>
    <span class="timestamp">2 hours ago</span>
  </div>
  <div class="email-row">
    <span class="sender">Mike Torres</span>
    <span class="subject">Weekly sync notes</span>
    <span class="preview">Here are the notes from today's meeting...</span>
    <span class="timestamp">3:42 PM</span>
  </div>
</div>

<style>
.draft { background: var(--cg-color-surface-warning-subtle); }
.draft-label {
  color: var(--cg-color-text-warning);
  font-weight: var(--cg-font-weight-bold);
  text-transform: uppercase;
  font-size: var(--cg-font-size-xs);
}
</style>`,
        explanation:
          'The red "Draft" label in the inbox creates a persistent open loop — you started composing a reply but never sent it. The visual distinction from regular emails keeps the unfinished communication task in awareness without being aggressive.',
        principle:
          'Subtle but persistent visual cues maintain open loops without creating anxiety',
      },
    ],

    bad: [
      {
        title: 'Overwhelming Incomplete Task Overload',
        description:
          'Dashboard showing dozens of incomplete items simultaneously, creating anxiety instead of motivation',
        code: `<!-- DON'T DO THIS -->
<div class="dashboard-alerts">
  <div class="alert urgent">⚠️ Profile incomplete (45%)</div>
  <div class="alert urgent">⚠️ 7 unread notifications</div>
  <div class="alert urgent">⚠️ 3 pending invitations</div>
  <div class="alert warning">📋 12 incomplete tasks</div>
  <div class="alert warning">📋 5 overdue assignments</div>
  <div class="alert warning">📋 2 expiring certifications</div>
  <div class="alert info">💡 8 suggested connections</div>
  <div class="alert info">💡 4 recommended courses</div>
  <div class="alert info">💡 Complete your skills assessment</div>
  <div class="badge-counter">23 items need attention</div>
</div>`,
        explanation:
          'Nine simultaneous open loops with urgent styling overwhelm working memory. Instead of motivating completion, this creates decision paralysis and guilt. Users either ignore everything or feel anxious every time they open the app.',
        principle:
          'Too many open loops at once cause paralysis, not motivation — limit visible incomplete items to 3-5',
      },
      {
        title: 'Guilt-Tripping Streak Loss Notifications',
        description:
          'Manipulative notifications that shame users for missing a day or breaking a streak',
        code: `<!-- DON'T DO THIS -->
<div class="notification guilt-trip">
  <div class="sad-mascot">😢</div>
  <h3>You broke your 47-day streak!</h3>
  <p>All that progress... gone.</p>
  <p class="shame">Your friends Sarah and Mike are still going strong.</p>
  <p class="threat">If you don't practice today,
  you'll fall behind even further!</p>
  <button class="urgent-cta">Don't Give Up!</button>
</div>

<!-- Even worse: -->
<div class="push-notification">
  <p>🔴 These lessons won't learn themselves!
  You haven't practiced in 2 days.</p>
</div>`,
        explanation:
          'Using sad mascots, social comparison, and threatening language to guilt users into returning is manipulative. It converts the positive open loop of "I want to complete this" into the negative loop of "I will feel terrible if I do not." This erodes trust and causes app avoidance.',
        principle:
          'Never weaponize open loops through guilt, shame, or social comparison — it destroys long-term engagement',
      },
      {
        title: 'Artificial Progress Inflation',
        description:
          'Padding completion flows with unnecessary steps to create more engagement hooks',
        code: `<!-- DON'T DO THIS -->
<div class="onboarding-progress">
  <h3>Account Setup: 20% Complete</h3>
  <div class="progress-bar"><div class="fill" style="width: 20%"></div></div>

  <ol class="setup-steps">
    <li class="complete">✓ Create account</li>
    <li class="current">Upload profile photo</li>
    <li>Add bio</li>
    <li>Set notification preferences</li>
    <li>Connect social accounts</li>
    <li>Invite 5 friends</li>
    <li>Follow 10 topics</li>
    <li>Like 3 posts</li>
    <li>Share your first post</li>
    <li>Complete your first week</li>
  </ol>
</div>`,
        explanation:
          'Ten steps where five are artificial engagement hooks ("Invite 5 friends", "Like 3 posts") disguised as setup. The low progress percentage (20%) after creating an account feels manipulative. Users recognize padding and lose trust in the entire progress system.',
        principle:
          'Every step in a completion flow must deliver genuine value to the user — never pad for engagement metrics',
      },
    ],

    realWorld: [
      {
        company: 'LinkedIn',
        product: 'Profile Strength Meter',
        description: 'LinkedIn displays a profile completion percentage and "Profile Strength" label (Beginner, Intermediate, All-Star) with specific suggestions for what to add next. The visible gap between current level and "All-Star" creates a persistent open loop that drives profile completion.',
        effectiveness: 'very-effective',
        analysis: 'LinkedIn\'s profile completion meter is one of the most successful implementations of the Zeigarnik Effect in SaaS. By quantifying completeness and providing actionable next steps, they increased profile completion rates dramatically. The "All-Star" label creates aspiration without guilt.',
      },
      {
        company: 'Duolingo',
        product: 'Streak System and Daily Goals',
        description: 'Duolingo uses daily XP goals, lesson progress trees, and streak counters that create multiple reinforcing open loops. The streak counter is especially powerful — each day without practice threatens to break the chain, creating strong return motivation.',
        effectiveness: 'very-effective',
        analysis: 'Duolingo\'s streak system is arguably the most famous Zeigarnik Effect implementation in consumer apps. The daily loop is manageable (one lesson), the streak creates long-term continuity, and the lesson tree shows macro progress. However, they have faced criticism for streak anxiety and have added "streak freezes" as mitigation.',
      },
      {
        company: 'Netflix',
        product: 'Autoplay Next Episode',
        description: 'Netflix automatically queues the next episode after a cliffhanger ending, capitalizing on the narrative open loop. The "Continue Watching" row on the home screen surfaces all unfinished shows, creating multiple content loops.',
        effectiveness: 'very-effective',
        analysis: 'Netflix\'s autoplay leverages the Zeigarnik Effect at the story level — episodes end on cliffhangers, creating narrative tension, and autoplay resolves the friction of starting the next episode. The "Continue Watching" row transforms every started-but-unfinished show into a visible open loop.',
      },
      {
        company: 'Gmail',
        product: 'Draft Reminders',
        description: 'Gmail keeps unsent drafts visible in the inbox with a red "Draft" label and also surfaces them inline within conversation threads. The persistent visibility of unfinished messages creates a gentle but effective open loop.',
        effectiveness: 'effective',
        analysis: 'Gmail\'s draft system is a tasteful Zeigarnik implementation. The red label is noticeable but not aggressive, the draft is easy to resume, and the system does not send guilt-tripping reminders. It respects user agency while keeping the open loop visible.',
      },
      {
        company: 'GitHub',
        product: 'Contribution Graph',
        description: 'GitHub\'s contribution heat map creates visible gaps on days without commits. The green squares and grey gaps create an implicit open loop around maintaining a consistent contribution pattern.',
        effectiveness: 'effective',
        analysis: 'The contribution graph is a passive Zeigarnik implementation — it does not actively nag, but the visual pattern of green squares and grey gaps creates an open loop for developers who care about consistency. The design is informational rather than manipulative.',
      },
    ],

    abTests: [
      {
        title: 'Onboarding Checklist: With vs Without Progress Bar',
        hypothesis:
          'Adding a visible progress bar to onboarding will increase step completion rate',
        controlVersion: {
          description:
            'Onboarding flow with numbered steps but no visible progress bar or completion percentage',
          metrics: {
            conversionRate: '34%',
            timeOnPage: '2:10',
            scrollDepth: '60%',
          },
        },
        treatmentVersion: {
          description:
            'Same onboarding flow with a prominent progress bar showing "3 of 7 steps complete (43%)" and highlighting the next recommended step',
          metrics: {
            conversionRate: '58%',
            timeOnPage: '4:35',
            scrollDepth: '92%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'The visible progress bar increased onboarding completion by 71%. Users spent twice as long engaging with the flow. The explicit incomplete state (43%) created a strong open loop that motivated users to continue through all steps.',
          learnings: [
            'Quantified progress creates stronger open loops than step numbers alone',
            'Users who saw the progress bar were 2.3x more likely to return within 24 hours to complete remaining steps',
            'The effect was strongest between 40-70% completion — too early or too late showed smaller gains',
            'Adding "estimated time remaining" alongside the bar further improved completion by 12%',
          ],
        },
      },
      {
        title: 'Cart Abandonment: Generic vs Specific Reminder',
        hypothesis:
          'Showing specific abandoned items will increase cart recovery rate compared to generic reminders',
        controlVersion: {
          description:
            'Generic email: "You have items in your cart! Complete your purchase today."',
          metrics: {
            conversionRate: '5.2%',
            clickThroughRate: '11%',
          },
        },
        treatmentVersion: {
          description:
            'Specific email showing thumbnails of the 3 abandoned items with "You left these behind" and individual progress toward free shipping',
          metrics: {
            conversionRate: '14.8%',
            clickThroughRate: '28%',
          },
        },
        results: {
          winner: 'treatment',
          analysis:
            'Specific item reminders nearly tripled cart recovery. Seeing the actual products reactivated the original purchase open loop far more effectively than generic reminders. The shipping progress bar ("$12 away from free shipping") added a second Zeigarnik loop.',
          learnings: [
            'Specific, visual reminders reactivate open loops more effectively than generic nudges',
            'Showing the exact items creates stronger memory recall of the original shopping intent',
            'Adding a secondary open loop (shipping progress) compounded the effect',
            'Timing matters: emails sent 2-4 hours after abandonment performed 40% better than 24-hour emails',
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
        name: 'Progress Bars and Completion Meters',
        description:
          'Horizontal bars, circular gauges, or percentage indicators showing partial completion',
        howToSpot:
          'Look for partially filled bars, "X% complete" labels, or circular progress indicators anywhere in the interface',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Checklists with Incomplete Items',
        description:
          'Lists mixing checked and unchecked items, completed and remaining steps',
        howToSpot:
          'Look for checkmark icons next to completed items alongside empty circles or outlined checkboxes for remaining items',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Continue / Resume Prompts',
        description:
          '"Continue where you left off", "Resume", or "Pick up where you left off" calls to action',
        howToSpot:
          'Look for CTAs that reference a previous incomplete session, especially on landing pages and home screens',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Draft and Saved State Indicators',
        description:
          'Labels like "Draft", "Saved", "In Progress" that mark incomplete user-created content',
        howToSpot:
          'Look for status badges on content items, especially in inboxes, document lists, or form histories',
        severity: ImpactLevel.MEDIUM,
      },
      {
        name: 'Streak Counters and Daily Goals',
        description:
          'Flame icons, day counters, or daily progress trackers that create recurring open loops',
        howToSpot:
          'Look for sequential day counts, flame or fire icons, "X day streak" badges, or daily XP/point trackers',
        severity: ImpactLevel.HIGH,
      },
      {
        name: 'Empty State Placeholders',
        description:
          'Placeholder content or ghost elements indicating where user content should go but is missing',
        howToSpot:
          'Look for dotted borders, placeholder avatars, "Add your first X" prompts, or silhouette placeholders',
        severity: ImpactLevel.MEDIUM,
      },
    ],

    patterns: [
      {
        name: 'Completion Nudge Pattern',
        description: 'Explicit progress indicators combined with specific calls to action for the next incomplete step',
        indicators: ['Profile completion percentage', '"X of Y steps complete"', 'Highlighted next action', 'Progress bar with milestone markers'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Streak and Consistency Pattern',
        description: 'Daily or recurring goals that create open loops around maintaining a chain of activity',
        indicators: ['Day streak counters', 'Contribution heat maps', 'Daily goal progress', '"Don\'t break the chain" messaging'],
        severity: ImpactLevel.HIGH,
        confidence: 'high',
      },
      {
        name: 'Resume and Re-entry Pattern',
        description: 'Surfacing previously started but incomplete activities with easy one-click resume',
        indicators: ['"Continue Watching" rows', '"Resume where you left off"', 'Recently viewed with progress indicators', 'Abandoned cart reminders'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'high',
      },
      {
        name: 'Cliffhanger and Autoplay Pattern',
        description: 'Content that ends at a tension point followed by automatic or low-friction continuation',
        indicators: ['Autoplay countdowns', '"Next episode" previews', 'Cliffhanger endings with "Continue" buttons', 'Chapter teasers or previews of upcoming content'],
        severity: ImpactLevel.MEDIUM,
        confidence: 'medium',
      },
    ],

    checklistQuestions: [
      'Are there visible progress indicators showing incomplete state?',
      'Do users see how far they are from completion and what steps remain?',
      'Is there a "continue where you left off" or resume mechanism?',
      'Are streaks, chains, or recurring daily goals present?',
      'How many open loops are visible simultaneously — is the count manageable (3-5)?',
      'Are incomplete state indicators creating motivation or anxiety?',
      'Do progress flows have genuine value at each step, or are steps padded?',
      'Are there draft, saved, or in-progress state indicators?',
      'How does the interface handle streak breaks or missed goals — gracefully or punitively?',
      'Are completion nudges framed positively (gain) or negatively (guilt)?',
    ],
  },

  //===========================================
  // AI INTENT
  //===========================================
  intent: {
    systemPrompt: `You are an expert in cognitive psychology and UX design, specializing in the Zeigarnik Effect — the tendency to remember incomplete tasks better than completed ones.

Analyze the provided design for Zeigarnik Effect patterns. Identify:

1. **Open Loops**: Incomplete tasks, progress indicators, and unfinished states visible to the user
2. **Completion Nudges**: Prompts encouraging users to finish started tasks or fill in missing information
3. **Streak and Consistency Mechanics**: Daily goals, streak counters, or chain systems
4. **Resume Mechanisms**: "Continue where you left off" features and re-entry points
5. **Closure Moments**: How the interface rewards and marks task completion

For each pattern found:
- Identify the type and strength of the open loop
- Assess whether the number of simultaneous open loops is manageable (3-5) or overwhelming
- Determine if the loop motivates or creates anxiety
- Evaluate whether completion steps deliver genuine user value
- Check if streak or goal breaks are handled gracefully
- Assess ethical implications (guilt-tripping, manipulation, artificial padding)

Consider:
- Is the design creating a healthy number of open loops, or overwhelming the user?
- Are completion nudges framed positively or negatively?
- Do progress indicators show actionable next steps?
- Are streaks creating motivation or unhealthy obligation?
- Is there a graceful way to pause or abandon without guilt?
- Are all completion steps genuinely valuable, or are some artificial padding?

Provide actionable recommendations for ethical, effective use of the Zeigarnik Effect.`,

    outputSchema: {
      type: 'object',
      properties: {
        openLoops: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              location: { type: 'string' },
              strength: { type: 'string' },
              motivationVsAnxiety: { type: 'string' },
              hasActionableNextStep: { type: 'boolean' },
              ethical: { type: 'boolean' },
              recommendation: { type: 'string' },
            },
            required: [
              'type',
              'location',
              'strength',
              'motivationVsAnxiety',
              'ethical',
            ],
          },
        },
        overallAssessment: {
          type: 'object',
          properties: {
            openLoopCount: { type: 'number' },
            balanceScore: { type: 'number' },
            closureSatisfaction: { type: 'number' },
            ethicalScore: { type: 'number' },
          },
          required: [
            'openLoopCount',
            'balanceScore',
            'closureSatisfaction',
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
        'openLoops',
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
        title: 'Identify High-Value Completion Goals',
        description:
          'Determine which user tasks genuinely benefit from completion motivation — not every action needs an open loop',
        example:
          'Goal: Increase onboarding completion from 34% to 60% because completed onboarding correlates with 3x higher retention',
        tips: [
          'Focus on tasks where completion directly benefits the user',
          'Avoid creating open loops for low-value or optional actions',
          'Map the user journey to find natural completion milestones',
        ],
      },
      {
        step: 2,
        title: 'Design the Progress Indicator',
        description:
          'Create a clear, honest visual representation of progress that shows both how far the user has come and how far they have to go',
        example:
          'A progress bar showing "3 of 5 steps complete (60%)" with the next step highlighted and labeled',
        tips: [
          'Use percentage AND step count for maximum clarity',
          'Highlight the next specific action, not just the overall bar',
          'Ensure the total step count is honest — never pad with artificial steps',
        ],
      },
      {
        step: 3,
        title: 'Limit Simultaneous Open Loops',
        description:
          'Ensure users see no more than 3-5 incomplete items at once to maintain motivation without causing overwhelm',
        example:
          'Show the top 3 most important incomplete tasks; hide the rest behind "View all tasks"',
        tips: [
          'Prioritize open loops by user value, not recency',
          'Use progressive disclosure for additional incomplete items',
          'Consider a single "focus task" mode for users who seem overwhelmed',
        ],
      },
      {
        step: 4,
        title: 'Design Satisfying Closure Moments',
        description:
          'Make task completion feel rewarding to provide the tension release that makes the loop cycle work',
        example:
          'Checkmark animation, confetti burst, or encouraging message when a step is completed',
        tips: [
          'Completion should feel better than the tension of incompleteness',
          'Use micro-animations and positive language for closure moments',
          'Show what was unlocked or achieved by completing the task',
        ],
      },
      {
        step: 5,
        title: 'Handle Breaks and Abandonment Gracefully',
        description:
          'Design for users who pause, leave, or abandon tasks — they should be able to return or let go without guilt',
        example:
          'Streak freeze options, "Welcome back!" instead of "You left!", and easy task dismissal',
        tips: [
          'Never shame or guilt-trip users who return after a break',
          'Offer streak freezes, grace periods, or partial credit',
          'Allow users to dismiss or archive incomplete tasks they no longer want',
        ],
      },
      {
        step: 6,
        title: 'Measure Motivation vs Anxiety',
        description:
          'Track whether your open loops are driving positive engagement or negative stress',
        example:
          'Survey users: "Does seeing your incomplete tasks make you feel motivated or stressed?" alongside behavioral metrics',
        tips: [
          'Monitor both completion rates AND user sentiment',
          'Watch for avoidance behavior (users ignoring or hiding progress)',
          'A/B test the number and prominence of open loops',
        ],
      },
    ],

    dos: [
      'Show clear, honest progress with specific next steps',
      'Limit visible incomplete items to 3-5 at a time',
      'Frame completion positively ("Almost there!") not negatively ("You have not finished!")',
      'Provide satisfying closure moments (animations, celebrations, unlocks)',
      'Offer streak freezes and grace periods for recurring goals',
      'Make it easy to resume incomplete tasks with one click',
      'Ensure every completion step delivers genuine user value',
      'Allow users to dismiss or archive tasks they no longer want to complete',
    ],

    donts: [
      'Don\'t overwhelm users with dozens of simultaneous open loops',
      'Don\'t guilt-trip or shame users for incomplete tasks or broken streaks',
      'Don\'t pad progress flows with artificial steps to inflate engagement',
      'Don\'t use punitive mechanics (resetting all progress) for missed goals',
      'Don\'t create open loops for tasks that do not genuinely benefit the user',
      'Don\'t make it impossible to dismiss or hide incomplete task reminders',
      'Don\'t use sad mascots or emotional manipulation to drive completion',
      'Don\'t send aggressive push notifications about unfinished tasks',
    ],

    bestPractices: [
      {
        title: 'The 3-5 Loop Limit',
        description:
          'Never show more than 3-5 simultaneous open loops in a single view',
        rationale:
          'Working memory can hold roughly 4 items; exceeding this causes overwhelm and paralysis rather than motivation',
        example:
          'Show top 3 incomplete onboarding tasks; hide remaining behind "View all (7 remaining)"',
      },
      {
        title: 'Pair Progress with Next Action',
        description:
          'Every progress indicator should be accompanied by a clear, single next action',
        rationale:
          'Progress without a next step creates frustration; progress with a clear action creates momentum',
        example:
          '"65% complete — Add a profile photo to reach 80%" with an inline "Add Photo" button',
      },
      {
        title: 'Celebrate Completion, Not Just Progress',
        description:
          'Design explicit closure moments that release the cognitive tension built up by the open loop',
        rationale:
          'Without satisfying closure, users do not experience the reward that makes them want to start the next loop',
        example:
          'Confetti animation + "You did it!" message + showing what was unlocked when onboarding completes',
      },
      {
        title: 'Graceful Streak Recovery',
        description:
          'Always provide a way to recover from or gracefully handle a broken streak',
        rationale:
          'Punitive streak breaks cause churn; graceful recovery maintains long-term engagement',
        example:
          'Offer 1 free "streak freeze" per month, or show "Your longest streak: 47 days — beat your record!" after a break',
      },
      {
        title: 'Completion Thresholds That Matter',
        description:
          'Set completion milestones at points that deliver real value to the user',
        rationale:
          'Users quickly detect when milestones are arbitrary; meaningful thresholds build trust in the progress system',
        example:
          '"At 80% profile completion, your profile appears in search results" — a real benefit tied to a real threshold',
      },
    ],

    accessibility: [
      {
        wcagLevel: 'AA',
        criterion: '4.1.2',
        guideline:
          'Name, Role, Value - Progress indicators must have programmatic state',
        implementation:
          'Use role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax. Announce progress changes to screen readers via aria-live regions.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.3.1',
        guideline:
          'Info and Relationships - Completion state must be conveyed beyond color',
        implementation:
          'Use checkmark icons, text labels ("Complete", "In Progress"), and semantic list structures alongside color coding for completed vs incomplete items.',
      },
      {
        wcagLevel: 'AA',
        criterion: '2.4.6',
        guideline:
          'Headings and Labels - Progress sections need clear, descriptive headings',
        implementation:
          'Label progress sections with headings like "Setup Progress: 3 of 7 Complete" so screen reader users can navigate directly to their completion state.',
      },
      {
        wcagLevel: 'AA',
        criterion: '1.4.1',
        guideline:
          'Use of Color - Do not rely only on color to indicate completion state',
        implementation:
          'Combine color (green for complete, grey for incomplete) with icons (checkmark, empty circle) and text labels to ensure all users can perceive completion state.',
      },
    ],

    ethics: [
      {
        concern: 'Completion Anxiety',
        severity: 'high',
        explanation:
          'Too many visible open loops or aggressive incomplete-state indicators can cause anxiety, guilt, and avoidance rather than motivation',
        mitigation:
          'Limit simultaneous open loops to 3-5. Frame progress positively. Allow users to dismiss or hide completion nudges. Monitor user sentiment alongside completion metrics.',
      },
      {
        concern: 'Streak Pressure and Wellbeing',
        severity: 'high',
        explanation:
          'Streak mechanics can cause users to prioritize maintaining streaks over their health, sleep, or wellbeing',
        mitigation:
          'Offer streak freezes and grace periods. Celebrate streaks without punishing breaks. Never frame a broken streak as a total loss. Consider caps or diminishing returns on very long streaks.',
      },
      {
        concern: 'Artificial Progress Padding',
        severity: 'medium',
        explanation:
          'Adding unnecessary steps to completion flows to inflate engagement metrics while wasting user time',
        mitigation:
          'Ensure every step in a progress flow delivers genuine value. Audit flows regularly and remove steps that exist only for metric inflation. Be transparent about what each step achieves.',
      },
      {
        concern: 'Guilt-Based Re-engagement',
        severity: 'critical',
        explanation:
          'Using sad mascots, shame language, or social comparison to guilt users into returning to the app',
        mitigation:
          'Frame all re-engagement positively ("Welcome back!" not "You abandoned us!"). Never compare users negatively to peers. Allow users to opt out of re-engagement notifications.',
      },
    ],
  },

  //===========================================
  // RESOURCES
  //===========================================
  resources: {
    papers: [
      {
        title: 'Das Behalten erledigter und unerledigter Handlungen (On Finished and Unfinished Tasks)',
        author: 'Zeigarnik, B.',
        year: 1927,
        description:
          'The foundational paper demonstrating that interrupted tasks are recalled approximately twice as well as completed tasks',
        type: 'foundational',
      },
      {
        title: 'Die Wiederaufnahme unterbrochener Handlungen (The Resumption of Interrupted Activities)',
        author: 'Ovsiankina, M.',
        year: 1928,
        description:
          'Companion study showing that people have a strong tendency to resume interrupted tasks even without external motivation (the Ovsiankina effect)',
        type: 'foundational',
      },
      {
        title: 'Consider It Done! Plan Making Can Eliminate the Cognitive Effects of Unfulfilled Goals',
        author: 'Masicampo, E. J., & Baumeister, R. F.',
        year: 2011,
        doi: '10.1037/a0024192',
        description:
          'Demonstrates that making a concrete plan to complete a task can reduce the Zeigarnik Effect, even before the task is actually completed',
        type: 'advanced',
      },
    ],

    books: [
      {
        title: 'Thinking, Fast and Slow',
        author: 'Kahneman, Daniel',
        year: 2011,
        isbn: '9780374275631',
        description:
          'Covers the Zeigarnik Effect in the context of cognitive ease and the brain\'s goal management system',
        type: 'foundational',
      },
      {
        title: 'Hooked: How to Build Habit-Forming Products',
        author: 'Eyal, Nir',
        year: 2014,
        isbn: '9781591847786',
        description:
          'Practical application of the Zeigarnik Effect in product design through the Hook Model\'s variable reward and investment phases',
        type: 'practical',
      },
    ],

    articles: [
      {
        title: 'The Zeigarnik Effect in UX Design',
        author: 'Nielsen Norman Group',
        url: 'https://www.nngroup.com/articles/zeigarnik-effect/',
        description:
          'Practical guide to leveraging incomplete tasks and progress indicators in user experience design',
        type: 'practical',
      },
    ],

    videos: [
      {
        title: 'The Zeigarnik Effect: Why Unfinished Tasks Stick in Your Mind',
        author: 'Sprouts',
        url: 'https://www.youtube.com/watch?v=JDvFJVCMBwE',
        description:
          'Animated explanation of the Zeigarnik Effect with everyday examples and design applications',
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
      'endowment-effect',     // Investment in partial progress increases perceived value
      'goal-gradient-effect',  // Motivation increases as users approach completion
      'loss-aversion',         // Fear of losing streak/progress amplifies the open loop
      'sunk-cost-fallacy',     // Prior effort makes abandoning incomplete tasks harder
    ],

    conflicts: [
      'paradox-of-choice',     // Too many open loops can cause decision paralysis
      'cognitive-overload',    // Excessive incomplete items overwhelm working memory
    ],

    confusedWith: [
      'goal-gradient-effect',  // Related but distinct: goal-gradient is about acceleration near the end
      'endowment-effect',      // Overlaps but endowment is about ownership, not incompleteness
      'sunk-cost-fallacy',     // Both involve prior effort, but Zeigarnik is about memory, not investment
    ],

    hierarchy: {
      parent: 'cognitive-bias',
      children: [
        'ovsiankina-effect',    // Specific tendency to resume interrupted tasks
        'cliffhanger-effect',   // Narrative application of the Zeigarnik Effect
      ],
    },
  },
};
