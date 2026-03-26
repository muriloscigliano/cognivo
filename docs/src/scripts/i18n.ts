/**
 * i18n module for the Bias Landing Experience.
 * Supports EN and PT-BR with complete coverage of all UI strings.
 */

export type Locale = 'en' | 'pt';

let currentLocale: Locale = 'en';

const listeners: Array<(locale: Locale) => void> = [];

export function getLocale(): Locale {
  return currentLocale;
}

export function setLocale(locale: Locale) {
  currentLocale = locale;
  document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  localStorage.setItem('bias-lang', locale);
  listeners.forEach(fn => fn(locale));
}

export function onLocaleChange(fn: (locale: Locale) => void) {
  listeners.push(fn);
}

export function initLocale() {
  const saved = localStorage.getItem('bias-lang') as Locale | null;
  const browser = navigator.language.startsWith('pt') ? 'pt' : 'en';
  currentLocale = saved || (browser as Locale);
  document.documentElement.lang = currentLocale === 'pt' ? 'pt-BR' : 'en';
}

export function t(key: string): string {
  const map = currentLocale === 'pt' ? PT : EN;
  return map[key] ?? EN[key] ?? key;
}

// ============================================================================
// ENGLISH STRINGS
// ============================================================================

const EN: Record<string, string> = {
  // Hero
  'hero.title': 'Cognitive Biases',
  'hero.subtitle': 'The invisible forces shaping every design decision',
  'hero.loading': 'Loading...',
  'hero.count': '{count} biases · 7 categories',

  // Filter
  'filter.all': 'All',
  'filter.showing': 'Showing {label} — {count} biases',
  'filter.showingAll': 'Showing all biases',

  // Categories
  'cat.perception': 'Perception',
  'cat.decision-making': 'Decision Making',
  'cat.memory': 'Memory',
  'cat.social': 'Social',
  'cat.attribution': 'Attribution',
  'cat.emotional': 'Emotional',
  'cat.cognitive': 'Cognitive',

  // Tabs
  'tab.overview': 'Overview',
  'tab.design': 'Design',
  'tab.mistakes': 'Mistakes',
  'tab.examples': 'Examples',
  'tab.checklist': 'Checklist',
  'tab.guidelines': 'Guidelines',
  'tab.resources': 'Resources',
  'tab.related': 'Related',

  // Section headers
  'sec.realWorldExample': 'Real-World Example',
  'sec.psychology': 'Psychology',
  'sec.impactAreas': 'Impact Areas',
  'sec.whenToUse': 'When to Use',
  'sec.whenToAvoid': 'When to Avoid',
  'sec.consequence': 'Consequence',
  'sec.instead': 'Instead',
  'sec.designImpact': 'Design Impact',
  'sec.commonMistakes': 'Common Mistakes',
  'sec.whyWrong': 'Why it\'s wrong',
  'sec.fix': 'Fix',
  'sec.realProducts': 'Real Products',
  'sec.abTests': 'A/B Tests',
  'sec.goodExamples': 'Good Examples',
  'sec.antiPatterns': 'Anti-Patterns',
  'sec.control': 'Control',
  'sec.treatment': 'Treatment',
  'sec.result': 'Result',
  'sec.implementation': 'Implementation Steps',
  'sec.do': 'Do',
  'sec.dont': "Don't",
  'sec.bestPractices': 'Best Practices',
  'sec.accessibility': 'Accessibility',
  'sec.ethics': 'Ethics',
  'sec.mitigation': 'Mitigation',
  'sec.papers': 'Papers',
  'sec.books': 'Books',
  'sec.articles': 'Articles',
  'sec.videos': 'Videos',
  'sec.demos': 'Demos',
  'sec.worksWith': 'Works well with',
  'sec.conflictsWith': 'Conflicts with',
  'sec.confusedWith': 'Often confused with',
  'sec.psychologyBasis': 'Psychology Basis',
  'sec.also': 'Also',

  // Impact levels
  'impact.critical': 'critical',
  'impact.high': 'high',
  'impact.medium': 'medium',
  'impact.low': 'low',

  // Impact area names
  'area.layout': 'Layout',
  'area.typography': 'Typography',
  'area.color': 'Color',
  'area.interaction': 'Interaction',
  'area.content': 'Content',
  'area.accessibility': 'Accessibility',

  // Misc
  'close': 'Close',
  'loading': 'Loading biases...',
  'loadFailed': 'Failed to load biases.',
  'prev': 'Previous card',
  'next': 'Next card',
  'lang': 'Language',
};

// ============================================================================
// PORTUGUESE (PT-BR) STRINGS
// ============================================================================

const PT: Record<string, string> = {
  // Hero
  'hero.title': 'Vieses Cognitivos',
  'hero.subtitle': 'As forças invisíveis que moldam cada decisão de design',
  'hero.loading': 'Carregando...',
  'hero.count': '{count} vieses · 7 categorias',

  // Filter
  'filter.all': 'Todos',
  'filter.showing': 'Mostrando {label} — {count} vieses',
  'filter.showingAll': 'Mostrando todos os vieses',

  // Categories
  'cat.perception': 'Percepção',
  'cat.decision-making': 'Tomada de Decisão',
  'cat.memory': 'Memória',
  'cat.social': 'Social',
  'cat.attribution': 'Atribuição',
  'cat.emotional': 'Emocional',
  'cat.cognitive': 'Cognitivo',

  // Tabs
  'tab.overview': 'Visão Geral',
  'tab.design': 'Design',
  'tab.mistakes': 'Erros Comuns',
  'tab.examples': 'Exemplos',
  'tab.checklist': 'Checklist',
  'tab.guidelines': 'Diretrizes',
  'tab.resources': 'Recursos',
  'tab.related': 'Relacionados',

  // Section headers
  'sec.realWorldExample': 'Exemplo do Mundo Real',
  'sec.psychology': 'Psicologia',
  'sec.impactAreas': 'Áreas de Impacto',
  'sec.whenToUse': 'Quando Usar',
  'sec.whenToAvoid': 'Quando Evitar',
  'sec.consequence': 'Consequência',
  'sec.instead': 'Alternativa',
  'sec.designImpact': 'Impacto no Design',
  'sec.commonMistakes': 'Erros Comuns',
  'sec.whyWrong': 'Por que está errado',
  'sec.fix': 'Correção',
  'sec.realProducts': 'Produtos Reais',
  'sec.abTests': 'Testes A/B',
  'sec.goodExamples': 'Bons Exemplos',
  'sec.antiPatterns': 'Anti-Padrões',
  'sec.control': 'Controle',
  'sec.treatment': 'Tratamento',
  'sec.result': 'Resultado',
  'sec.implementation': 'Passos de Implementação',
  'sec.do': 'Faça',
  'sec.dont': 'Não Faça',
  'sec.bestPractices': 'Melhores Práticas',
  'sec.accessibility': 'Acessibilidade',
  'sec.ethics': 'Ética',
  'sec.mitigation': 'Mitigação',
  'sec.papers': 'Artigos Científicos',
  'sec.books': 'Livros',
  'sec.articles': 'Artigos',
  'sec.videos': 'Vídeos',
  'sec.demos': 'Demonstrações',
  'sec.worksWith': 'Funciona bem com',
  'sec.conflictsWith': 'Conflita com',
  'sec.confusedWith': 'Frequentemente confundido com',
  'sec.psychologyBasis': 'Base Psicológica',
  'sec.also': 'Também conhecido como',

  // Impact levels
  'impact.critical': 'crítico',
  'impact.high': 'alto',
  'impact.medium': 'médio',
  'impact.low': 'baixo',

  // Impact area names
  'area.layout': 'Layout',
  'area.typography': 'Tipografia',
  'area.color': 'Cor',
  'area.interaction': 'Interação',
  'area.content': 'Conteúdo',
  'area.accessibility': 'Acessibilidade',

  // Misc
  'close': 'Fechar',
  'loading': 'Carregando vieses...',
  'loadFailed': 'Falha ao carregar vieses.',
  'prev': 'Card anterior',
  'next': 'Próximo card',
  'lang': 'Idioma',
};

// ============================================================================
// BIAS CONTENT TRANSLATION — PT-BR
// Translates bias-specific content fields.
// Structure: biasId → field path → translated string
// Falls back to English (original data) if not found.
// ============================================================================

const BIAS_PT: Record<string, Record<string, string>> = {
  'anchoring-bias': {
    'name': 'Viés de Ancoragem',
    'simple': 'A primeira informação que vemos influencia fortemente todos os julgamentos seguintes.',
    'detailed': 'O viés de ancoragem é um viés cognitivo fundamental onde as pessoas dependem excessivamente da primeira informação oferecida (a "âncora") ao tomar decisões. Essa âncora inicial serve como ponto de referência, e todos os ajustes subsequentes tendem a ser insuficientes — permanecendo enviesados em direção à âncora original. Mesmo quando a âncora é claramente arbitrária ou irrelevante, ela ainda exerce influência significativa sobre julgamentos e decisões.',
  },
  'loss-aversion': {
    'name': 'Aversão à Perda',
    'simple': 'Perdas parecem maiores que ganhos equivalentes.',
    'detailed': 'A aversão à perda é o fenômeno psicológico onde a dor de perder algo é psicologicamente cerca de duas vezes mais poderosa do que o prazer de ganhar a mesma coisa. Descoberta por Amos Tversky e Daniel Kahneman, essa assimetria fundamental na tomada de decisão humana significa que as pessoas farão mais esforço para evitar perdas do que para obter ganhos equivalentes.',
  },
  'social-proof': {
    'name': 'Prova Social',
    'simple': 'Pessoas seguem as ações dos outros quando estão incertas.',
    'detailed': 'A prova social é um fenômeno psicológico e social onde as pessoas copiam as ações dos outros na tentativa de adotar o comportamento correto em uma determinada situação. Quando estamos incertos, olhamos para o que os outros estão fazendo para determinar o curso de ação apropriado. Esse princípio é amplamente utilizado em design de interfaces para construir confiança, aumentar conversões e guiar decisões do usuário.',
  },
  'von-restorff-effect': {
    'name': 'Efeito Von Restorff',
    'simple': 'Itens que se destacam são mais facilmente lembrados.',
    'detailed': 'O Efeito Von Restorff, também conhecido como efeito de isolamento, prevê que quando múltiplos estímulos semelhantes são apresentados, o estímulo que difere dos demais é mais provável de ser lembrado. Nomeado após a psiquiatra alemã Hedwig von Restorff, esse princípio é fundamental para hierarquia visual, chamadas para ação e destaque de informações importantes em interfaces.',
  },
  'framing-effect': {
    'name': 'Efeito de Enquadramento',
    'simple': 'Como a informação é apresentada afeta as decisões.',
    'detailed': 'O efeito de enquadramento é um viés cognitivo onde as pessoas decidem com base em como as opções são apresentadas, não nos fatos objetivos. A mesma informação pode levar a diferentes decisões dependendo se é enquadrada como ganho ou perda. Por exemplo, "90% de taxa de sucesso" é percebido de forma mais favorável que "10% de taxa de falha", embora sejam a mesma informação.',
  },
  'confirmation-bias': {
    'name': 'Viés de Confirmação',
    'simple': 'Tendemos a buscar informações que confirmam nossas crenças existentes.',
    'detailed': 'O viés de confirmação é a tendência de buscar, interpretar, favorecer e recordar informações de uma maneira que confirme ou fortaleça as crenças ou hipóteses pré-existentes. É um dos vieses cognitivos mais difundidos e afeta significativamente como os usuários interagem com interfaces, consomem conteúdo e tomam decisões online.',
  },
  'bandwagon-effect': {
    'name': 'Efeito Manada',
    'simple': 'A tendência de adotar comportamentos porque outros estão fazendo.',
    'detailed': 'O efeito manada, ou efeito de adesão, é um fenômeno psicológico onde as pessoas fazem algo principalmente porque outras pessoas estão fazendo, independentemente de suas próprias crenças. Em design digital, isso se manifesta em contadores de popularidade, tendências, e indicadores de "mais vendido" que influenciam decisões de compra e engajamento.',
  },
  'dunning-kruger-effect': {
    'name': 'Efeito Dunning-Kruger',
    'simple': 'Pessoas com pouco conhecimento superestimam suas habilidades.',
    'detailed': 'O efeito Dunning-Kruger é um viés cognitivo onde pessoas com conhecimento ou habilidade limitada em uma área tendem a superestimar significativamente sua competência. Por outro lado, aqueles com maior expertise tendem a subestimar suas habilidades. Em design de interfaces, isso afeta como apresentamos complexidade, tutoriais e níveis de controle ao usuário.',
  },
  'halo-effect': {
    'name': 'Efeito Halo',
    'simple': 'Uma impressão positiva em uma área influencia opiniões em outras áreas.',
    'detailed': 'O efeito halo é um viés cognitivo onde nossa impressão geral de uma pessoa, marca ou produto influencia como nos sentimos e pensamos sobre seu caráter ou propriedades específicas. Em design, um visual bonito pode fazer os usuários perceberem o produto como mais utilizável, confiável e valioso, mesmo antes de interagir com ele.',
  },
  'peak-end-rule': {
    'name': 'Regra do Pico-Fim',
    'simple': 'Pessoas julgam experiências pelo pico e pelo final, não pela média.',
    'detailed': 'A regra do pico-fim é uma heurística cognitiva onde as pessoas julgam uma experiência com base em como se sentiram no ponto mais intenso (pico) e no final, em vez da soma ou média de cada momento da experiência. Isso tem implicações profundas para design de jornadas do usuário, onboarding, checkout e qualquer fluxo com múltiplas etapas.',
  },
  'mere-exposure-effect': {
    'name': 'Efeito de Mera Exposição',
    'simple': 'Pessoas desenvolvem preferência por coisas que encontram repetidamente.',
    'detailed': 'O efeito de mera exposição é um fenômeno psicológico pelo qual as pessoas tendem a desenvolver uma preferência por coisas simplesmente porque estão familiarizadas com elas. Em design e marketing, isso explica por que consistência de marca, frequência de exibição e padrões de interface repetidos constroem conforto e confiança ao longo do tempo.',
  },
  'cognitive-load': {
    'name': 'Carga Cognitiva',
    'simple': 'A quantidade de esforço mental necessário para processar informação.',
    'detailed': 'A teoria da carga cognitiva descreve a quantidade total de esforço mental sendo usado na memória de trabalho. Em design de interfaces, gerenciar a carga cognitiva é fundamental — interfaces que exigem muito processamento mental resultam em erros, abandono e frustração. Design eficaz reduz a carga cognitiva extrínseca e otimiza a carga germânica para facilitar aprendizado e tomada de decisão.',
  },
  'choice-overload': {
    'name': 'Sobrecarga de Escolha',
    'simple': 'Muitas opções levam à paralisia e insatisfação.',
    'detailed': 'A sobrecarga de escolha, também conhecida como paradoxo da escolha, ocorre quando um excesso de opções disponíveis leva à fadiga de decisão, ansiedade e insatisfação com a escolha final. O famoso estudo da geleia de Sheena Iyengar demonstrou que mais opções podem na verdade reduzir as vendas. Em design, isso fundamenta princípios de curadoria, defaults inteligentes e divulgação progressiva.',
  },
  'primacy-effect': {
    'name': 'Efeito de Primazia',
    'simple': 'Itens apresentados primeiro são melhor lembrados.',
    'detailed': 'O efeito de primazia é a tendência de lembrar melhor dos primeiros itens de uma série do que dos itens intermediários. Em design de interfaces, isso significa que o conteúdo, as opções e as informações posicionadas primeiro têm maior impacto na percepção e na decisão do usuário.',
  },
  'recency-effect': {
    'name': 'Efeito de Recência',
    'simple': 'Itens apresentados por último são melhor lembrados.',
    'detailed': 'O efeito de recência é a tendência de lembrar melhor dos últimos itens apresentados. Junto com o efeito de primazia, forma a curva de posição serial. Em design, isso fundamenta a importância do último passo de um fluxo, da mensagem final de um onboarding e do estado final de uma interação.',
  },
  'status-quo-bias': {
    'name': 'Viés do Status Quo',
    'simple': 'Preferência por manter o estado atual das coisas.',
    'detailed': 'O viés do status quo é a tendência emocional de preferir o estado atual das coisas. Mudanças são percebidas como perdas, ativando a aversão à perda. Em design, isso explica a resistência dos usuários a redesigns, migrações de plataforma e mudanças de interface, mesmo quando objetivamente melhores.',
  },
  'sunk-cost-fallacy': {
    'name': 'Falácia do Custo Irrecuperável',
    'simple': 'Continuar algo por causa do investimento já feito, não pelo valor futuro.',
    'detailed': 'A falácia do custo irrecuperável é a tendência de continuar investindo em algo por causa dos recursos já gastos (tempo, dinheiro, esforço), em vez de avaliar o valor futuro. Em design, isso pode ser usado eticamente para manter engajamento (barras de progresso, streaks) mas também pode prender usuários em experiências ruins.',
  },
  'endowment-effect': {
    'name': 'Efeito de Dotação',
    'simple': 'Valorizamos mais as coisas que já possuímos.',
    'detailed': 'O efeito de dotação é o viés cognitivo onde as pessoas atribuem mais valor a coisas simplesmente porque são suas. Perder algo que possuímos parece mais doloroso do que nunca tê-lo tido. Em design, isso fundamenta períodos de teste gratuito, personalização e qualquer mecanismo que crie senso de propriedade antes da conversão.',
  },
  'availability-heuristic': {
    'name': 'Heurística de Disponibilidade',
    'simple': 'Julgamos a probabilidade de eventos pela facilidade com que exemplos vêm à mente.',
    'detailed': 'A heurística de disponibilidade é um atalho mental que se baseia em exemplos imediatos que vêm à mente ao avaliar um tópico, conceito, método ou decisão. Eventos mais facilmente recordáveis são julgados como mais prováveis. Em design, isso afeta como apresentamos riscos, benefícios e estatísticas para os usuários.',
  },
  'decoy-effect': {
    'name': 'Efeito Chamariz',
    'simple': 'Uma terceira opção assimétrica torna uma das opções originais mais atraente.',
    'detailed': 'O efeito chamariz ocorre quando a preferência entre duas opções muda com a introdução de uma terceira opção assimetricamente dominada. A opção chamariz é projetada para ser inferior a uma das opções originais em todos os aspectos, mas inferior à outra em apenas alguns. É amplamente utilizado em páginas de preços e planos de assinatura.',
  },
};

/**
 * Get translated bias field, falling back to original English data
 */
export function tBias(biasId: string, field: string, fallback: string): string {
  if (currentLocale === 'en') return fallback;
  return BIAS_PT[biasId]?.[field] ?? fallback;
}

/**
 * Get translated category label
 */
export function tCat(categoryId: string): string {
  return t(`cat.${categoryId}`);
}

/**
 * Format a template string with values: "{count} biases" → "180 biases"
 */
export function tFormat(key: string, values: Record<string, string | number>): string {
  let str = t(key);
  for (const [k, v] of Object.entries(values)) {
    str = str.replace(`{${k}}`, String(v));
  }
  return str;
}
