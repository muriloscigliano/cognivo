/**
 * Cognitive Bias Library - All Phases
 *
 * This module exports all implemented cognitive biases for the design advisor system.
 * Each bias card contains comprehensive information for AI-powered design analysis.
 *
 * @module @cognivo/design-advisor/biases
 */

// === IMPORTS ===
import { acquiescenceBias } from './acquiescence-bias/index.js';
import { actionBias } from './action-bias/index.js';
import { affectHeuristic } from './affect-heuristic/index.js';
import { agentDetection } from './agent-detection/index.js';
import { ambiguityEffect } from './ambiguity-effect/index.js';
import { analysisParalysis } from './analysis-paralysis/index.js';
import { anchoringAdjustment } from './anchoring-adjustment/index.js';
import { anchoringBias } from './anchoring-bias/index.js';
import { anticipatedRegret } from './anticipated-regret/index.js';
import { apophenia } from './apophenia/index.js';
import { attentionalBias } from './attentional-bias/index.js';
import { attributeSubstitution } from './attribute-substitution/index.js';
import { authorityBias } from './authority-bias/index.js';
import { availabilityHeuristic } from './availability-heuristic/index.js';
import { bandwagonEffect } from './bandwagon-effect/index.js';
import { baseRateFallacy } from './base-rate-fallacy/index.js';
import { beliefInJustWorld } from './belief-in-just-world/index.js';
import { buyersRemorse } from './buyers-remorse/index.js';
import { bystanderEffect } from './bystander-effect/index.js';
import { cautiousShift } from './cautious-shift/index.js';
import { changingStateEffect } from './changing-state-effect/index.js';
import { cheerleaderEffect } from './cheerleader-effect/index.js';
import { choiceOverload } from './choice-overload/index.js';
import { choiceSupportiveBias } from './choice-supportive-bias/index.js';
import { clusteringIllusion } from './clustering-illusion/index.js';
import { clusteringIllusionStats } from './clustering-illusion-stats/index.js';
import { commitmentBias } from './commitment-bias/index.js';
import { confirmationBias } from './confirmation-bias/index.js';
import { conformityBias } from './conformity-bias/index.js';
import { conjunctionFallacy } from './conjunction-fallacy/index.js';
import { consistencyBias } from './consistency-bias/index.js';
import { consistencyBiasDecision } from './consistency-bias-decision/index.js';
import { contextDependentMemory } from './context-dependent-memory/index.js';
import { contrastEffect } from './contrast-effect/index.js';
import { crossRaceEffect } from './cross-race-effect/index.js';
import { cryptomnesia } from './cryptomnesia/index.js';
import { decisionFatigue } from './decision-fatigue/index.js';
import { decoyEffect } from './decoy-effect/index.js';
import { defaultBias } from './default-bias/index.js';
import { defaultEffect } from './default-effect/index.js';
import { denominationEffect } from './denomination-effect/index.js';
import { diffusionResponsibility } from './diffusion-responsibility/index.js';
import { dunningKrugerEffect } from './dunning-kruger-effect/index.js';
import { durationNeglect } from './duration-neglect/index.js';
import { durationNeglectDecision } from './duration-neglect-decision/index.js';
import { egocentricBias } from './egocentric-bias/index.js';
import { ellsbergParadox } from './ellsberg-paradox/index.js';
import { empathyGap } from './empathy-gap/index.js';
import { empathyGapSocial } from './empathy-gap-social/index.js';
import { endowmentEffect } from './endowment-effect/index.js';
import { escalationCommitment } from './escalation-commitment/index.js';
import { fadingAffectBias } from './fading-affect-bias/index.js';
import { falseConsensusEffect } from './false-consensus-effect/index.js';
import { falseMemory } from './false-memory/index.js';
import { falseUniquenessEffect } from './false-uniqueness-effect/index.js';
import { fluencyHeuristic } from './fluency-heuristic/index.js';
import { focusingIllusion } from './focusing-illusion/index.js';
import { framingBias } from './framing-bias/index.js';
import { framingEffect } from './framing-effect/index.js';
import { fundamentalAttributionError } from './fundamental-attribution-error/index.js';
import { gamblersFallacy } from './gamblers-fallacy/index.js';
import { generationEffect } from './generation-effect/index.js';
import { googleEffect } from './google-effect/index.js';
import { googleEffectDigital } from './google-effect-digital/index.js';
import { groupAttributionError } from './group-attribution-error/index.js';
import { groupthink } from './groupthink/index.js';
import { haloEffect } from './halo-effect/index.js';
import { hindsightBias } from './hindsight-bias/index.js';
import { hindsightBiasMemory } from './hindsight-bias-memory/index.js';
import { hornEffect } from './horn-effect/index.js';
import { hotColdEmpathyGap } from './hot-cold-empathy-gap/index.js';
import { hotHandFallacy } from './hot-hand-fallacy/index.js';
import { hyperbolicDiscounting } from './hyperbolic-discounting/index.js';
import { identifiableVictimEffect } from './identifiable-victim-effect/index.js';
import { ikeaEffect } from './ikea-effect/index.js';
import { illusionControl } from './illusion-control/index.js';
import { illusionTransparency } from './illusion-transparency/index.js';
import { illusoryCorrelation } from './illusory-correlation/index.js';
import { illusoryCorrelationSocial } from './illusory-correlation-social/index.js';
import { impactBias } from './impact-bias/index.js';
import { inGroupBias } from './in-group-bias/index.js';
import { inertiaBias } from './inertia-bias/index.js';
import { ingroupFavoritism } from './ingroup-favoritism/index.js';
import { intentionActionGap } from './intention-action-gap/index.js';
import { irrelevantSpeechEffect } from './irrelevant-speech-effect/index.js';
import { justWorldHypothesis } from './just-world-hypothesis/index.js';
import { lawSmallNumbers } from './law-small-numbers/index.js';
import { levelsProcessingEffect } from './levels-processing-effect/index.js';
import { licensingEffect } from './licensing-effect/index.js';
import { linguisticIntergroupBias } from './linguistic-intergroup-bias/index.js';
import { lossAversion } from './loss-aversion/index.js';
import { luckyNumberBias } from './lucky-number-bias/index.js';
import { magicalThinking } from './magical-thinking/index.js';
import { maximizing } from './maximizing/index.js';
import { mentalAccounting } from './mental-accounting/index.js';
import { mereExposureEffect } from './mere-exposure-effect/index.js';
import { minimalGroupParadigm } from './minimal-group-paradigm/index.js';
import { misattributionMemory } from './misattribution-memory/index.js';
import { misinformationEffect } from './misinformation-effect/index.js';
import { modalityEffect } from './modality-effect/index.js';
import { moneyIllusion } from './money-illusion/index.js';
import { moodCongruentMemory } from './mood-congruent-memory/index.js';
import { moralLicensing } from './moral-licensing/index.js';
import { nextInLineEffect } from './next-in-line-effect/index.js';
import { nonResponseBias } from './non-response-bias/index.js';
import { obedienceBias } from './obedience-bias/index.js';
import { omissionBias } from './omission-bias/index.js';
import { optimismBias } from './optimism-bias/index.js';
import { outGroupHomogeneity } from './out-group-homogeneity/index.js';
import { outcomeBias } from './outcome-bias/index.js';
import { outgroupHomogeneityEffect } from './outgroup-homogeneity-effect/index.js';
import { overconfidenceBias } from './overconfidence-bias/index.js';
import { ownRaceBias } from './own-race-bias/index.js';
import { pareidolia } from './pareidolia/index.js';
import { peakEndRule } from './peak-end-rule/index.js';
import { peltzmanEffect } from './peltzman-effect/index.js';
import { physicalAttractivenessStereotype } from './physical-attractiveness-stereotype/index.js';
import { planningFallacy } from './planning-fallacy/index.js';
import { pluralisticIgnorance } from './pluralistic-ignorance/index.js';
import { postPurchaseRationalization } from './post-purchase-rationalization/index.js';
import { prejudiceBias } from './prejudice-bias/index.js';
import { presentBias } from './present-bias/index.js';
import { primacyEffect } from './primacy-effect/index.js';
import { primacyRecencyEffect } from './primacy-recency-effect/index.js';
import { primingEffect } from './priming-effect/index.js';
import { procrastinationBias } from './procrastination-bias/index.js';
import { projectionBias } from './projection-bias/index.js';
import { proportionDominance } from './proportion-dominance/index.js';
import { pseudocertaintyEffect } from './pseudocertainty-effect/index.js';
import { recencyEffect } from './recency-effect/index.js';
import { recognitionHeuristic } from './recognition-heuristic/index.js';
import { regressionTowardMean } from './regression-toward-mean/index.js';
import { regretAversion } from './regret-aversion/index.js';
import { representativenessHeuristic } from './representativeness-heuristic/index.js';
import { responseBias } from './response-bias/index.js';
import { restraintBias } from './restraint-bias/index.js';
import { restraintBiasDecision } from './restraint-bias-decision/index.js';
import { riskCompensation } from './risk-compensation/index.js';
import { riskyShift } from './risky-shift/index.js';
import { rosyRetrospection } from './rosy-retrospection/index.js';
import { sampleSizeNeglect } from './sample-size-neglect/index.js';
import { samplingBias } from './sampling-bias/index.js';
import { satisficing } from './satisficing/index.js';
import { scarcityBias } from './scarcity-bias/index.js';
import { scopeInsensitivity } from './scope-insensitivity/index.js';
import { selectionBias } from './selection-bias/index.js';
import { selfReferenceEffect } from './self-reference-effect/index.js';
import { selfServingBias } from './self-serving-bias/index.js';
import { serialPositionEffect } from './serial-position-effect/index.js';
import { simulationHeuristic } from './simulation-heuristic/index.js';
import { socialComparisonBias } from './social-comparison-bias/index.js';
import { socialDesirabilityBias } from './social-desirability-bias/index.js';
import { socialProof } from './social-proof/index.js';
import { sourceConfusion } from './source-confusion/index.js';
import { spacingEffect } from './spacing-effect/index.js';
import { spotlightEffect } from './spotlight-effect/index.js';
import { stateDependentMemory } from './state-dependent-memory/index.js';
import { statusQuoBias } from './status-quo-bias/index.js';
import { stereotyping } from './stereotyping/index.js';
import { suffixEffect } from './suffix-effect/index.js';
import { suggestibility } from './suggestibility/index.js';
import { sunkCostFallacy } from './sunk-cost-fallacy/index.js';
import { superstitionBias } from './superstition-bias/index.js';
import { survivorshipBias } from './survivorship-bias/index.js';
import { telescopingEffect } from './telescoping-effect/index.js';
import { temporalDiscounting } from './temporal-discounting/index.js';
import { testingEffect } from './testing-effect/index.js';
import { timeInconsistency } from './time-inconsistency/index.js';
import { tipOfTongue } from './tip-of-tongue/index.js';
import { ultimateAttributionError } from './ultimate-attribution-error/index.js';
import { uncertaintyAvoidance } from './uncertainty-avoidance/index.js';
import { unitBias } from './unit-bias/index.js';
import { victimBlaming } from './victim-blaming/index.js';
import { volunteerBias } from './volunteer-bias/index.js';
import { vonRestorffEffect } from './von-restorff-effect/index.js';
import { vonRestorffIsolation } from './von-restorff-isolation/index.js';
import { whatTheHellEffect } from './what-the-hell-effect/index.js';
import { wordLengthEffect } from './word-length-effect/index.js';
import { zeigarnikEffect } from './zeigarnik-effect/index.js';
import { zeroRiskBias } from './zero-risk-bias/index.js';

import type { BiasCard } from './core/types.js';
import { BiasCategory } from './core/types.js';

// === EXPORTS ===
export {
  acquiescenceBias,
  actionBias,
  affectHeuristic,
  agentDetection,
  ambiguityEffect,
  analysisParalysis,
  anchoringAdjustment,
  anchoringBias,
  anticipatedRegret,
  apophenia,
  attentionalBias,
  attributeSubstitution,
  authorityBias,
  availabilityHeuristic,
  bandwagonEffect,
  baseRateFallacy,
  beliefInJustWorld,
  buyersRemorse,
  bystanderEffect,
  cautiousShift,
  changingStateEffect,
  cheerleaderEffect,
  choiceOverload,
  choiceSupportiveBias,
  clusteringIllusion,
  clusteringIllusionStats,
  commitmentBias,
  confirmationBias,
  conformityBias,
  conjunctionFallacy,
  consistencyBias,
  consistencyBiasDecision,
  contextDependentMemory,
  contrastEffect,
  crossRaceEffect,
  cryptomnesia,
  decisionFatigue,
  decoyEffect,
  defaultBias,
  defaultEffect,
  denominationEffect,
  diffusionResponsibility,
  dunningKrugerEffect,
  durationNeglect,
  durationNeglectDecision,
  egocentricBias,
  ellsbergParadox,
  empathyGap,
  empathyGapSocial,
  endowmentEffect,
  escalationCommitment,
  fadingAffectBias,
  falseConsensusEffect,
  falseMemory,
  falseUniquenessEffect,
  fluencyHeuristic,
  focusingIllusion,
  framingBias,
  framingEffect,
  fundamentalAttributionError,
  gamblersFallacy,
  generationEffect,
  googleEffect,
  googleEffectDigital,
  groupAttributionError,
  groupthink,
  haloEffect,
  hindsightBias,
  hindsightBiasMemory,
  hornEffect,
  hotColdEmpathyGap,
  hotHandFallacy,
  hyperbolicDiscounting,
  identifiableVictimEffect,
  ikeaEffect,
  illusionControl,
  illusionTransparency,
  illusoryCorrelation,
  illusoryCorrelationSocial,
  impactBias,
  inGroupBias,
  inertiaBias,
  ingroupFavoritism,
  intentionActionGap,
  irrelevantSpeechEffect,
  justWorldHypothesis,
  lawSmallNumbers,
  levelsProcessingEffect,
  licensingEffect,
  linguisticIntergroupBias,
  lossAversion,
  luckyNumberBias,
  magicalThinking,
  maximizing,
  mentalAccounting,
  mereExposureEffect,
  minimalGroupParadigm,
  misattributionMemory,
  misinformationEffect,
  modalityEffect,
  moneyIllusion,
  moodCongruentMemory,
  moralLicensing,
  nextInLineEffect,
  nonResponseBias,
  obedienceBias,
  omissionBias,
  optimismBias,
  outGroupHomogeneity,
  outcomeBias,
  outgroupHomogeneityEffect,
  overconfidenceBias,
  ownRaceBias,
  pareidolia,
  peakEndRule,
  peltzmanEffect,
  physicalAttractivenessStereotype,
  planningFallacy,
  pluralisticIgnorance,
  postPurchaseRationalization,
  prejudiceBias,
  presentBias,
  primacyEffect,
  primacyRecencyEffect,
  primingEffect,
  procrastinationBias,
  projectionBias,
  proportionDominance,
  pseudocertaintyEffect,
  recencyEffect,
  recognitionHeuristic,
  regressionTowardMean,
  regretAversion,
  representativenessHeuristic,
  responseBias,
  restraintBias,
  restraintBiasDecision,
  riskCompensation,
  riskyShift,
  rosyRetrospection,
  sampleSizeNeglect,
  samplingBias,
  satisficing,
  scarcityBias,
  scopeInsensitivity,
  selectionBias,
  selfReferenceEffect,
  selfServingBias,
  serialPositionEffect,
  simulationHeuristic,
  socialComparisonBias,
  socialDesirabilityBias,
  socialProof,
  sourceConfusion,
  spacingEffect,
  spotlightEffect,
  stateDependentMemory,
  statusQuoBias,
  stereotyping,
  suffixEffect,
  suggestibility,
  sunkCostFallacy,
  superstitionBias,
  survivorshipBias,
  telescopingEffect,
  temporalDiscounting,
  testingEffect,
  timeInconsistency,
  tipOfTongue,
  ultimateAttributionError,
  uncertaintyAvoidance,
  unitBias,
  victimBlaming,
  volunteerBias,
  vonRestorffEffect,
  vonRestorffIsolation,
  whatTheHellEffect,
  wordLengthEffect,
  zeigarnikEffect,
  zeroRiskBias
};

// === TYPES ===
export type {
  BiasCard,
  Intent,
  UseCase,
  AvoidCase,
  Mistake,
  ImpactAssessment,
  DesignExample,
  RealWorldExample,
  ABTestExample,
  TestMetrics,
  VisualCue,
  DetectionPattern,
  ImplementationStep,
  BestPractice,
  AccessibilityGuideline,
  EthicalConsideration,
  Resource,
  BiasAnalysisInput,
  BiasAnalysisOutput,
  BiasFind,
  Location,
  Recommendation,
} from './core/types.js';

export { BiasCategory, ImpactLevel } from './core/types.js';

// === REGISTRY ===
/**
 * All available bias cards indexed by ID
 */
export const biasRegistry = {
  'acquiescence-bias': acquiescenceBias,
  'action-bias': actionBias,
  'affect-heuristic': affectHeuristic,
  'agent-detection': agentDetection,
  'ambiguity-effect': ambiguityEffect,
  'analysis-paralysis': analysisParalysis,
  'anchoring-adjustment': anchoringAdjustment,
  'anchoring-bias': anchoringBias,
  'anticipated-regret': anticipatedRegret,
  'apophenia': apophenia,
  'attentional-bias': attentionalBias,
  'attribute-substitution': attributeSubstitution,
  'authority-bias': authorityBias,
  'availability-heuristic': availabilityHeuristic,
  'bandwagon-effect': bandwagonEffect,
  'base-rate-fallacy': baseRateFallacy,
  'belief-in-just-world': beliefInJustWorld,
  'buyers-remorse': buyersRemorse,
  'bystander-effect': bystanderEffect,
  'cautious-shift': cautiousShift,
  'changing-state-effect': changingStateEffect,
  'cheerleader-effect': cheerleaderEffect,
  'choice-overload': choiceOverload,
  'choice-supportive-bias': choiceSupportiveBias,
  'clustering-illusion': clusteringIllusion,
  'clustering-illusion-stats': clusteringIllusionStats,
  'commitment-bias': commitmentBias,
  'confirmation-bias': confirmationBias,
  'conformity-bias': conformityBias,
  'conjunction-fallacy': conjunctionFallacy,
  'consistency-bias': consistencyBias,
  'consistency-bias-decision': consistencyBiasDecision,
  'context-dependent-memory': contextDependentMemory,
  'contrast-effect': contrastEffect,
  'cross-race-effect': crossRaceEffect,
  'cryptomnesia': cryptomnesia,
  'decision-fatigue': decisionFatigue,
  'decoy-effect': decoyEffect,
  'default-bias': defaultBias,
  'default-effect': defaultEffect,
  'denomination-effect': denominationEffect,
  'diffusion-responsibility': diffusionResponsibility,
  'dunning-kruger-effect': dunningKrugerEffect,
  'duration-neglect': durationNeglect,
  'duration-neglect-decision': durationNeglectDecision,
  'egocentric-bias': egocentricBias,
  'ellsberg-paradox': ellsbergParadox,
  'empathy-gap': empathyGap,
  'empathy-gap-social': empathyGapSocial,
  'endowment-effect': endowmentEffect,
  'escalation-commitment': escalationCommitment,
  'fading-affect-bias': fadingAffectBias,
  'false-consensus-effect': falseConsensusEffect,
  'false-memory': falseMemory,
  'false-uniqueness-effect': falseUniquenessEffect,
  'fluency-heuristic': fluencyHeuristic,
  'focusing-illusion': focusingIllusion,
  'framing-bias': framingBias,
  'framing-effect': framingEffect,
  'fundamental-attribution-error': fundamentalAttributionError,
  'gamblers-fallacy': gamblersFallacy,
  'generation-effect': generationEffect,
  'google-effect': googleEffect,
  'google-effect-digital': googleEffectDigital,
  'group-attribution-error': groupAttributionError,
  'groupthink': groupthink,
  'halo-effect': haloEffect,
  'hindsight-bias': hindsightBias,
  'hindsight-bias-memory': hindsightBiasMemory,
  'horn-effect': hornEffect,
  'hot-cold-empathy-gap': hotColdEmpathyGap,
  'hot-hand-fallacy': hotHandFallacy,
  'hyperbolic-discounting': hyperbolicDiscounting,
  'identifiable-victim-effect': identifiableVictimEffect,
  'ikea-effect': ikeaEffect,
  'illusion-control': illusionControl,
  'illusion-transparency': illusionTransparency,
  'illusory-correlation': illusoryCorrelation,
  'illusory-correlation-social': illusoryCorrelationSocial,
  'impact-bias': impactBias,
  'in-group-bias': inGroupBias,
  'inertia-bias': inertiaBias,
  'ingroup-favoritism': ingroupFavoritism,
  'intention-action-gap': intentionActionGap,
  'irrelevant-speech-effect': irrelevantSpeechEffect,
  'just-world-hypothesis': justWorldHypothesis,
  'law-small-numbers': lawSmallNumbers,
  'levels-processing-effect': levelsProcessingEffect,
  'licensing-effect': licensingEffect,
  'linguistic-intergroup-bias': linguisticIntergroupBias,
  'loss-aversion': lossAversion,
  'lucky-number-bias': luckyNumberBias,
  'magical-thinking': magicalThinking,
  'maximizing': maximizing,
  'mental-accounting': mentalAccounting,
  'mere-exposure-effect': mereExposureEffect,
  'minimal-group-paradigm': minimalGroupParadigm,
  'misattribution-memory': misattributionMemory,
  'misinformation-effect': misinformationEffect,
  'modality-effect': modalityEffect,
  'money-illusion': moneyIllusion,
  'mood-congruent-memory': moodCongruentMemory,
  'moral-licensing': moralLicensing,
  'next-in-line-effect': nextInLineEffect,
  'non-response-bias': nonResponseBias,
  'obedience-bias': obedienceBias,
  'omission-bias': omissionBias,
  'optimism-bias': optimismBias,
  'out-group-homogeneity': outGroupHomogeneity,
  'outcome-bias': outcomeBias,
  'outgroup-homogeneity-effect': outgroupHomogeneityEffect,
  'overconfidence-bias': overconfidenceBias,
  'own-race-bias': ownRaceBias,
  'pareidolia': pareidolia,
  'peak-end-rule': peakEndRule,
  'peltzman-effect': peltzmanEffect,
  'physical-attractiveness-stereotype': physicalAttractivenessStereotype,
  'planning-fallacy': planningFallacy,
  'pluralistic-ignorance': pluralisticIgnorance,
  'post-purchase-rationalization': postPurchaseRationalization,
  'prejudice-bias': prejudiceBias,
  'present-bias': presentBias,
  'primacy-effect': primacyEffect,
  'primacy-recency-effect': primacyRecencyEffect,
  'priming-effect': primingEffect,
  'procrastination-bias': procrastinationBias,
  'projection-bias': projectionBias,
  'proportion-dominance': proportionDominance,
  'pseudocertainty-effect': pseudocertaintyEffect,
  'recency-effect': recencyEffect,
  'recognition-heuristic': recognitionHeuristic,
  'regression-toward-mean': regressionTowardMean,
  'regret-aversion': regretAversion,
  'representativeness-heuristic': representativenessHeuristic,
  'response-bias': responseBias,
  'restraint-bias': restraintBias,
  'restraint-bias-decision': restraintBiasDecision,
  'risk-compensation': riskCompensation,
  'risky-shift': riskyShift,
  'rosy-retrospection': rosyRetrospection,
  'sample-size-neglect': sampleSizeNeglect,
  'sampling-bias': samplingBias,
  'satisficing': satisficing,
  'scarcity-bias': scarcityBias,
  'scope-insensitivity': scopeInsensitivity,
  'selection-bias': selectionBias,
  'self-reference-effect': selfReferenceEffect,
  'self-serving-bias': selfServingBias,
  'serial-position-effect': serialPositionEffect,
  'simulation-heuristic': simulationHeuristic,
  'social-comparison-bias': socialComparisonBias,
  'social-desirability-bias': socialDesirabilityBias,
  'social-proof': socialProof,
  'source-confusion': sourceConfusion,
  'spacing-effect': spacingEffect,
  'spotlight-effect': spotlightEffect,
  'state-dependent-memory': stateDependentMemory,
  'status-quo-bias': statusQuoBias,
  'stereotyping': stereotyping,
  'suffix-effect': suffixEffect,
  'suggestibility': suggestibility,
  'sunk-cost-fallacy': sunkCostFallacy,
  'superstition-bias': superstitionBias,
  'survivorship-bias': survivorshipBias,
  'telescoping-effect': telescopingEffect,
  'temporal-discounting': temporalDiscounting,
  'testing-effect': testingEffect,
  'time-inconsistency': timeInconsistency,
  'tip-of-tongue': tipOfTongue,
  'ultimate-attribution-error': ultimateAttributionError,
  'uncertainty-avoidance': uncertaintyAvoidance,
  'unit-bias': unitBias,
  'victim-blaming': victimBlaming,
  'volunteer-bias': volunteerBias,
  'von-restorff-effect': vonRestorffEffect,
  'von-restorff-isolation': vonRestorffIsolation,
  'what-the-hell-effect': whatTheHellEffect,
  'word-length-effect': wordLengthEffect,
  'zeigarnik-effect': zeigarnikEffect,
  'zero-risk-bias': zeroRiskBias,
} as const;

/**
 * Array of all bias cards for iteration
 */
export const allBiases = Object.values(biasRegistry);

/**
 * Get a bias card by ID
 */
export function getBiasById(id: string) {
  return biasRegistry[id as keyof typeof biasRegistry];
}

/**
 * Get biases by category
 */
export function getBiasesByCategory(category: BiasCategory): BiasCard[] {
  return allBiases.filter(bias =>
    bias.metadata.category === category ||
    bias.metadata.relatedCategories.includes(category)
  );
}

/**
 * Get biases by tag
 */
export function getBiasesByTag(tag: string) {
  return allBiases.filter(bias =>
    bias.metadata.tags.includes(tag)
  );
}

/**
 * Search biases by name or alias
 */
export function searchBiases(query: string): BiasCard[] {
  const lowerQuery = query.toLowerCase();
  return allBiases.filter(bias =>
    bias.metadata.name.toLowerCase().includes(lowerQuery) ||
    bias.metadata.aliases.some((alias: string) => alias.toLowerCase().includes(lowerQuery))
  );
}

// === STATISTICS ===
/**
 * Get statistics about the bias library
 */
export function getBiasStatistics() {
  const total = allBiases.length;
  const byCategory: Record<string, number> = {};

  allBiases.forEach(bias => {
    const cat = bias.metadata.category;
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  });

  return {
    total,
    byCategory,
    phase1Complete: 5,
    phase2Complete: 20,
    phase3InProgress: total - 25,
    phasesComplete: 3,
    totalPlanned: 180,
    percentComplete: (total / 180 * 100).toFixed(1) + '%',
  };
}

// === UTILITIES ===
/**
 * Additional utility functions for working with biases
 */
export * from './utils.js';
