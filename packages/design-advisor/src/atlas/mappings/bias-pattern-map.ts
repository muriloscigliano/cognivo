/**
 * Bias-Pattern Map
 *
 * Cross-references Atlas pattern IDs to cognitive bias IDs from
 * the design-advisor bias library. Each entry lists the most
 * impactful biases that are activated, exploitable, or need mitigation
 * when implementing that Atlas pattern.
 *
 * Keys: Atlas pattern IDs (e.g., "task_generate")
 * Values: Arrays of bias IDs from the bias registry
 *
 * @module @cognivo/design-advisor/atlas/mappings/bias-pattern-map
 */

export const BIAS_PATTERN_MAP: Record<string, string[]> = {
  // =========================================================================
  // AI TASKS
  // =========================================================================

  // Inbound Layer
  task_detect: [
    'confirmation-bias',       // Users trust detection results that confirm expectations
    'attentional-bias',        // Attention drawn to detected items, ignoring missed ones
    'availability-heuristic',  // False positive frequency affects perceived accuracy
    'anchoring-bias',          // First detection result anchors subsequent judgment
    'pareidolia',              // Seeing patterns where none exist (false positives)
  ],

  task_extract: [
    'anchoring-bias',          // First extracted value anchors perception
    'framing-effect',          // How extracted data is presented changes interpretation
    'confirmation-bias',       // Users accept extracted values that match expectations
    'availability-heuristic',  // Salient extractions overweight importance
  ],

  task_estimate: [
    'anchoring-bias',          // Initial estimate anchors all adjustments
    'overconfidence-bias',     // Users overtrust precise-looking estimates
    'optimism-bias',           // Estimates systematically skew optimistic
    'planning-fallacy',        // Time/effort estimates consistently too low
  ],

  task_monitor: [
    'attentional-bias',        // Alert fatigue from too many notifications
    'availability-heuristic',  // Recent alerts inflate perceived risk
    'normalcy-bias',           // Ignoring warnings because "nothing happened before"
    'status-quo-bias',         // Resistance to acting on monitoring signals
  ],

  task_retrieve: [
    'availability-heuristic',  // Top results perceived as most important
    'primacy-effect',          // First results disproportionately influential
    'recency-effect',          // Recent results overweighted
    'framing-effect',          // How results are presented affects selection
    'anchoring-bias',          // First result anchors relevance expectations
  ],

  task_segment: [
    'framing-effect',          // Segment boundaries influence interpretation
    'contrast-effect',         // Adjacent segments compared, not evaluated independently
    'anchoring-bias',          // First segmentation attempt anchors refinement
  ],

  // Internal Layer
  task_explain: [
    'illusion-control',        // Explanations create false sense of understanding
    'confirmation-bias',       // Users accept explanations matching prior beliefs
    'anchoring-bias',          // First explanation anchors understanding
    'dunning-kruger-effect',   // Overconfidence in understanding from simple explanations
    'framing-effect',          // How explanation is framed changes trust
  ],

  task_forecast: [
    'anchoring-bias',          // Forecast number becomes anchor for decisions
    'overconfidence-bias',     // Users ignore confidence intervals
    'optimism-bias',           // Optimistic forecasts preferred
    'planning-fallacy',        // Forecasts underestimate time and cost
    'representativeness-heuristic', // Small patterns extrapolated too far
  ],

  task_classify: [
    'anchoring-bias',          // First classification anchors perception
    'confirmation-bias',       // Users accept confirming classifications
    'framing-effect',          // Category labels influence perception of items
    'stereotyping',            // Automated classification reinforces biases
    'representativeness-heuristic', // Items classified by surface similarity
  ],

  task_match: [
    'confirmation-bias',       // Users accept matches that confirm expectations
    'halo-effect',             // One good match attribute inflates overall assessment
    'contrast-effect',         // Matches evaluated relative to adjacent options
    'mere-exposure-effect',    // Familiar items perceived as better matches
  ],

  task_rank: [
    'primacy-effect',          // Top-ranked items get disproportionate attention
    'anchoring-bias',          // #1 ranking anchors perception of all items
    'bandwagon-effect',        // High-ranked items attract more engagement
    'framing-effect',          // Ranking criteria framing affects perceived quality
    'contrast-effect',         // Items evaluated relative to neighbors
  ],

  task_regress: [
    'anchoring-bias',          // Predicted values anchor expectations
    'overconfidence-bias',     // Precise numbers feel more trustworthy
    'regression-toward-mean',  // Extreme predictions regress naturally
    'representativeness-heuristic', // Patterns in noise mistaken for signal
  ],

  task_synthesize: [
    'framing-effect',          // How synthesis is structured shapes understanding
    'anchoring-bias',          // Opening summary point anchors interpretation
    'availability-heuristic',  // Vivid sources overrepresented in synthesis
    'confirmation-bias',       // Users accept syntheses matching prior beliefs
  ],

  task_verify: [
    'confirmation-bias',       // Verification results accepted if they agree
    'authority-bias',          // AI verification perceived as authoritative
    'illusion-control',        // Verification creates false certainty
    'overconfidence-bias',     // Verified claims treated as certain
  ],

  task_simulate: [
    'overconfidence-bias',     // Simulation outputs treated as predictions
    'anchoring-bias',          // First simulation anchors scenario thinking
    'planning-fallacy',        // Best-case simulations overweighted
    'illusion-control',        // Manipulating simulation parameters feels like control
    'framing-effect',          // Scenario framing influences decisions
  ],

  task_represent: [
    'clustering-illusion',     // Patterns perceived in embedding visualizations
    'anchoring-bias',          // Initial embedding shapes semantic landscape
    'framing-effect',          // Dimensionality reduction choices affect interpretation
  ],

  task_cluster: [
    'clustering-illusion',     // Meaningful groups perceived in noise
    'confirmation-bias',       // Clusters interpreted to confirm hypotheses
    'stereotyping',            // Cluster labels can reinforce group biases
    'framing-effect',          // Cluster naming influences perception
  ],

  // Outbound Layer
  task_generate: [
    'authority-bias',          // AI-generated content perceived as authoritative
    'anchoring-bias',          // First generation anchors expectations
    'mere-exposure-effect',    // Repeated AI style becomes preferred
    'framing-effect',          // Generation framing influences acceptance
    'illusion-control',        // Prompt editing feels like full control
    'overconfidence-bias',     // Generated content treated as fact
  ],

  task_transform: [
    'contrast-effect',         // Before/after comparison influences judgment
    'anchoring-bias',          // Original version anchors quality assessment
    'framing-effect',          // Transformation type label affects perception
    'endowment-effect',        // Users prefer original over transformed version
  ],

  task_translate: [
    'fluency-heuristic',       // Fluent translation perceived as more accurate
    'authority-bias',          // Machine translation trusted too much
    'framing-effect',          // Translation choices change meaning subtly
  ],

  // Interactive Layer
  task_adapt: [
    'mere-exposure-effect',    // Adapted content becomes comfortable, limiting growth
    'confirmation-bias',       // Adaptation reinforces existing preferences
    'status-quo-bias',         // Users resist changing adapted defaults
    'framing-effect',          // How adaptation is communicated affects acceptance
  ],

  task_act: [
    'illusion-control',        // Users feel in control of autonomous actions
    'authority-bias',          // AI actions trusted without verification
    'omission-bias',           // Inaction perceived as safer than wrong action
    'action-bias',             // Preference for action even when waiting is better
  ],

  task_explore: [
    'availability-heuristic',  // Recent exploration results overweighted
    'confirmation-bias',       // Exploration directed toward confirming beliefs
    'anchoring-bias',          // Initial exploration path anchors strategy
    'satisficing',             // First acceptable result stops exploration
  ],

  task_plan: [
    'planning-fallacy',        // Plans underestimate time and complexity
    'optimism-bias',           // Plans skew toward best-case scenarios
    'anchoring-bias',          // First plan draft anchors all revisions
    'sunk-cost-fallacy',       // Commitment to plan despite contrary evidence
    'illusion-control',        // Detailed plans feel more controllable
  ],

  // =========================================================================
  // HUMAN TASKS
  // =========================================================================

  human_authenticate: [
    'status-quo-bias',         // Users keep existing auth methods
    'default-effect',          // Default auth flow followed without question
  ],

  human_grant_consent: [
    'default-effect',          // Default consent options disproportionately accepted
    'framing-effect',          // How consent options are presented matters
    'status-quo-bias',         // Existing permissions maintained
    'anchoring-bias',          // First consent screen anchors privacy expectations
  ],

  human_connect_integration: [
    'authority-bias',          // Well-known integration brands trusted more
    'default-effect',          // Default integration settings accepted
    'status-quo-bias',         // Existing integrations maintained
  ],

  human_upload_file: [
    'endowment-effect',        // Users overvalue their uploaded content
    'sunk-cost-fallacy',       // Time spent uploading prevents abandonment
  ],

  human_type_input: [
    'anchoring-bias',          // Placeholder text anchors input
    'framing-effect',          // Input labels frame expected responses
    'priming-effect',          // Suggested prompts prime user behavior
  ],

  human_voice_command: [
    'authority-bias',          // Voice AI perceived as knowledgeable
    'fluency-heuristic',       // Fluent voice response = higher trust
  ],

  human_gesture: [
    'illusion-control',        // Physical gestures feel more in-control
  ],

  human_navigate_space: [
    'serial-position-effect',  // First and last nav items remembered best
    'primacy-effect',          // First navigation option preferred
  ],

  human_adjust_control: [
    'anchoring-bias',          // Default slider position anchors adjustment
    'status-quo-bias',         // Default settings rarely changed
    'illusion-control',        // Granular controls feel like full control
  ],

  human_configure: [
    'default-effect',          // Default configurations overwhelmingly kept
    'choice-overload',         // Too many settings cause decision paralysis
    'status-quo-bias',         // Existing configuration maintained
    'anchoring-bias',          // Default values anchor all adjustments
  ],

  human_select_option: [
    'decoy-effect',            // Asymmetrically dominated options steer selection
    'framing-effect',          // Option presentation affects choice
    'anchoring-bias',          // First or default option anchors comparison
    'choice-overload',         // Too many options cause decision paralysis
    'default-effect',          // Pre-selected option disproportionately chosen
  ],

  human_choose: [
    'loss-aversion',           // Fear of losing unchosen option
    'regret-aversion',         // Anticipated regret delays commitment
    'endowment-effect',        // Chosen option immediately overvalued
    'commitment-bias',         // Choice becomes defended post-decision
    'choice-supportive-bias',  // Chosen option rationalized after the fact
  ],

  human_start_process: [
    'action-bias',             // Preference for starting over analyzing
    'optimism-bias',           // Process expected to go smoothly
    'planning-fallacy',        // Underestimate process complexity
  ],

  human_stop_process: [
    'sunk-cost-fallacy',       // Reluctance to stop after investment
    'loss-aversion',           // Stopping feels like losing progress
    'status-quo-bias',         // Prefer continuation over interruption
  ],

  human_compare: [
    'contrast-effect',         // Items judged relative to each other
    'anchoring-bias',          // First item compared anchors evaluation
    'framing-effect',          // Comparison dimensions affect outcome
    'decoy-effect',            // Third option makes one of two look better
  ],

  human_organize: [
    'serial-position-effect',  // First and last items placed more deliberately
    'anchoring-bias',          // Initial organization structure persists
    'status-quo-bias',         // Existing organization maintained
  ],

  human_annotate: [
    'confirmation-bias',       // Annotations confirm pre-existing interpretation
    'anchoring-bias',          // First annotation anchors subsequent ones
    'attentional-bias',        // Salient features annotated first
  ],

  human_review: [
    'authority-bias',          // AI output given too much credibility
    'confirmation-bias',       // Reviews confirm what reviewer expects
    'anchoring-bias',          // AI suggestion anchors review judgment
    'halo-effect',             // One good aspect elevates overall assessment
    'satisficing',             // "Good enough" review instead of thorough
  ],

  human_validate: [
    'confirmation-bias',       // Data validated against expectations
    'anchoring-bias',          // Expected values anchor validation
    'authority-bias',          // System-generated data trusted more
  ],

  human_provide_feedback: [
    'social-desirability-bias', // Feedback skews positive for social reasons
    'recency-effect',          // Recent experience dominates feedback
    'peak-end-rule',           // Best/worst moments and ending drive feedback
    'framing-effect',          // Feedback prompt framing affects responses
  ],

  human_flag: [
    'false-consensus-effect',  // Flaggers assume others agree content is wrong
    'authority-bias',          // Flagged content from authority questioned less
    'availability-heuristic',  // Recent bad experiences increase flagging
  ],

  human_edit: [
    'endowment-effect',        // Edited content overvalued vs. original
    'anchoring-bias',          // AI draft anchors final edited version
    'ikea-effect',             // Editing increases perceived value
  ],

  human_export: [
    'endowment-effect',        // Exported content perceived as more valuable
    'loss-aversion',           // Fear of losing data drives excessive exporting
  ],

  // =========================================================================
  // SYSTEM TASKS
  // =========================================================================

  system_read_db: [
    'availability-heuristic',  // Displayed data perceived as complete picture
    'framing-effect',          // Data presentation format affects interpretation
  ],

  system_cache: [
    'mere-exposure-effect',    // Cached (repeated) results feel more correct
    'status-quo-bias',         // Stale cached results not questioned
  ],

  system_webhook: [
    'availability-heuristic',  // Triggered events feel more frequent/important
  ],

  system_timer: [
    'anchoring-bias',          // Scheduled intervals anchor time expectations
    'status-quo-bias',         // Default schedules rarely modified
  ],

  system_rules: [
    'authority-bias',          // System rules perceived as correct
    'status-quo-bias',         // Existing rules rarely challenged
    'framing-effect',          // Rule condition framing affects understanding
  ],

  system_format: [
    'framing-effect',          // Output format changes interpretation
    'fluency-heuristic',       // Well-formatted output trusted more
  ],

  system_api: [
    'authority-bias',          // API responses treated as authoritative
    'availability-heuristic',  // API errors inflate perception of unreliability
  ],

  system_create_db: [
    'endowment-effect',        // Created records immediately valued
    'commitment-bias',         // Record creation increases commitment
  ],

  system_update_db: [
    'status-quo-bias',         // Updates from original resist change
    'anchoring-bias',          // Original values anchor update perception
  ],

  system_delete_db: [
    'loss-aversion',           // Strong resistance to deletion
    'endowment-effect',        // Owned data overvalued before deletion
    'status-quo-bias',         // Prefer keeping data over removing
  ],

  system_notification: [
    'availability-heuristic',  // Notification content overweights importance
    'attentional-bias',        // Notifications capture attention disproportionately
    'framing-effect',          // Notification tone affects response
  ],

  system_log: [
    'availability-heuristic',  // Logged events perceived as more important
    'hindsight-bias',          // Log review creates illusion of predictability
  ],

  system_git: [
    'sunk-cost-fallacy',       // Committed code resists reversion
    'status-quo-bias',         // Existing code maintained over rewrites
  ],

  system_train: [
    'overconfidence-bias',     // Training metrics inflate confidence
    'confirmation-bias',       // Training validates chosen approach
  ],

  system_evaluate: [
    'anchoring-bias',          // Baseline metrics anchor all evaluation
    'framing-effect',          // Metric selection frames model perception
    'confirmation-bias',       // Evaluation confirms pre-existing model preference
  ],

  system_orchestrate: [
    'planning-fallacy',        // Workflow complexity underestimated
    'illusion-control',        // Orchestration UI creates control illusion
  ],

  system_analytics: [
    'availability-heuristic',  // Measured metrics perceived as only important ones
    'framing-effect',          // Dashboard layout frames data interpretation
    'anchoring-bias',          // Baseline metrics anchor ongoing analysis
    'survivorship-bias',       // Only tracked events analyzed
  ],

  system_experiment: [
    'confirmation-bias',       // Experiment results interpreted to confirm hypothesis
    'anchoring-bias',          // First variant anchors expectations
    'gamblers-fallacy',        // Small sample size trends over-interpreted
  ],

  system_monitor_model: [
    'normalcy-bias',           // Model degradation signals ignored
    'status-quo-bias',         // Resistance to model retraining
    'availability-heuristic',  // Recent model failures inflate risk perception
  ],

  system_state: [
    'status-quo-bias',         // Persisted state rarely reset
    'anchoring-bias',          // Initial state anchors all subsequent sessions
  ],

  system_reward: [
    'framing-effect',          // Reward framing influences behavior
    'loss-aversion',           // Negative rewards more impactful than positive
  ],

  system_session: [
    'primacy-effect',          // Early session interactions set tone
    'recency-effect',          // Last interaction dominates session perception
    'peak-end-rule',           // Best/worst moment and ending define session quality
  ],
};
