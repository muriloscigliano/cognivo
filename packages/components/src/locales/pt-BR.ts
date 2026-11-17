/**
 * Brazilian Portuguese interface text for every component with built-in text
 * (cg-* and bias-*), plus pt-BR validation messages. A second built-in
 * locale next to the English defaults, and the template for writing others.
 *
 * Dates, weekdays, months and country names are not in this map: they follow
 * the nearest `lang` attribute through `Intl`, so also set `<html lang="pt-BR">`.
 *
 * @example
 * ```ts
 * import { setMessages } from '@cognivo/components/messages';
 * import { setValidationMessages } from '@cognivo/components/validation';
 * import { ptBR, ptBRValidation } from '@cognivo/components/locales/pt-BR';
 * setMessages(ptBR);
 * setValidationMessages(ptBRValidation);
 * ```
 */
import type { LocaleMessages } from '../utils/messages.js';
import type { ValidationMessages } from '../utils/validation.js';

export const ptBR: LocaleMessages = {
  'bias-anchoring': {
    label: 'Original {anchor}, agora {current}',
  },
  'bias-commitment': {
    progressLabel: 'Etapa {step} de {total}',
    progress: 'Etapa {step}/{total}',
  },
  'bias-reciprocity': {
    gift: 'Você está ganhando: {gift}',
    giftLabel: 'Você está ganhando: {gift}',
  },
  'bias-scarcity': {
    ended: 'Encerrado',
    endsIn: 'Termina em {duration}',
    stock: 'Restam apenas {n}',
    popularity: 'Visto {n} vezes hoje',
    days: '{d}d {h}h',
    hours: '{h}h {m}min',
    minutes: '{m}min',
  },
  'cg-alert-dialog': {
    confirm: 'Confirmar',
    cancel: 'Cancelar',
  },
  'cg-autocomplete': {
    label: 'Preenchimento automático',
    clear: 'Limpar',
    noResults: 'Nenhum resultado encontrado',
  },
  'cg-avatar': {
    label: 'Avatar',
  },
  'cg-avatar-group': {
    label: 'Grupo de avatares',
    more: 'Mais {n} avatares',
  },
  'cg-badge-group': {
    label: 'Grupo de selos',
    more: 'Mais {n} itens',
  },
  'cg-breadcrumbs': {
    label: 'Trilha de navegação',
    showAll: 'Mostrar todos os itens da trilha',
  },
  'cg-calendar': {
    previousMonth: 'Mês anterior',
    nextMonth: 'Próximo mês',
  },
  'cg-callout': {
    dismiss: 'Dispensar',
  },
  'cg-carousel': {
    label: 'Carrossel',
    roleDescription: 'carrossel',
    previous: 'Slide anterior',
    next: 'Próximo slide',
    indicators: 'Indicadores de slide',
    goTo: 'Ir para o slide {n}',
  },
  'cg-chart': {
    label: 'Gráfico',
    empty: 'Sem dados',
    total: 'Total',
  },
  'cg-chip': {
    remove: 'Remover {label}',
  },
  'cg-code-block': {
    copy: 'Copiar',
    copied: 'Copiado',
    copyLabel: 'Copiar código',
    copiedLabel: 'Código copiado',
    copiedStatus: 'Copiado!',
  },
  'cg-collapsible': {
    toggle: 'Mostrar ou ocultar',
  },
  'cg-color-picker': {
    label: 'Seletor de cor',
    saturation: 'Saturação e brilho',
    saturationValue: 'Saturação {s}%, brilho {v}%, {hex}',
    hue: 'Matiz',
    opacity: 'Opacidade',
    hex: 'Cor hexadecimal',
    copy: 'Copiar cor',
    presets: 'Cores predefinidas',
  },
  'cg-combobox': {
    remove: 'Remover {label}',
    clear: 'Limpar seleção',
    loading: 'Carregando…',
    noOptions: 'Nenhuma opção',
  },
  'cg-command': {
    placeholder: 'Digite um comando ou pesquise...',
    empty: 'Nenhum resultado encontrado.',
    dialog: 'Paleta de comandos',
    list: 'Comandos',
    loading: 'Carregando…',
  },
  'cg-context-menu': {
    label: 'Menu de contexto',
    empty: 'Nenhuma ação',
  },
  'cg-date-picker': {
    placeholder: 'Selecione a data',
    label: 'Seletor de data',
    calendar: 'Calendário',
  },
  'cg-date-range-picker': {
    placeholder: 'Selecione o período',
    endPlaceholder: 'Data final',
    label: 'Seletor de período',
    calendar: 'Calendário do período',
    last7: 'Últimos 7 dias',
    last30: 'Últimos 30 dias',
    last90: 'Últimos 90 dias',
    last12m: 'Últimos 12 meses',
    ytd: 'Este ano até hoje',
    presets: 'Atalhos',
  },
  'cg-date-time-picker': {
    placeholder: 'Selecione data e hora',
    label: 'Seletor de data e hora',
    dialog: 'Seleção de data e hora',
    previousMonth: 'Mês anterior',
    nextMonth: 'Próximo mês',
    time: 'Horário',
    hour: 'H',
    minute: 'Min',
    am: 'AM',
    pm: 'PM',
    hours: 'Horas',
    minutes: 'Minutos',
  },
  'cg-drawer': {
    label: 'Painel lateral',
    back: 'Voltar',
    close: 'Fechar painel',
    loading: 'Carregando…',
  },
  'cg-dropdown': {
    label: 'Menu suspenso',
    loading: 'Carregando…',
    empty: 'Nenhum item',
  },
  'cg-file-input': {
    placeholder: 'Solte os arquivos aqui ou clique para procurar',
    label: 'Envio de arquivos',
    tooLarge: 'O arquivo excede {size}',
    tooMany: 'Máximo de {max} arquivos permitidos',
    removed: '{name} removido',
    clearedOne: '{n} arquivo removido',
    clearedOther: '{n} arquivos removidos',
    pdfBadge: 'PDF',
    dropToAttach: 'Solte para anexar',
    addMore: 'Adicionar mais arquivos',
    attach: 'Anexar arquivos',
    accepted: 'Aceitos: {types}',
    maxSize: 'Tamanho máximo: {size}',
    fileCount: '{n} arquivos',
    clearAll: 'Limpar tudo',
    uploading: 'Enviando {name}',
    done: 'Concluído',
    failed: 'Falhou',
    remove: 'Remover {name}',
  },
  'cg-follow-up': {
    label: 'Sugestões',
    suggestion: 'Sugestão: {text}',
    more: '+{n} mais',
    showMore: 'Mostrar mais {n} sugestões',
  },
  'cg-form': {
    errorSummary: 'Corrija os seguintes itens:',
  },
  'cg-image': {
    unavailable: 'Imagem indisponível',
  },
  'cg-image-block': {
    view: 'Ver imagem: {alt}',
    unavailable: 'Imagem indisponível',
    retry: 'Tentar novamente',
  },
  'cg-image-gallery': {
    label: 'Galeria de imagens',
    view: 'Ver imagem {n}',
    viewWithAlt: 'Ver imagem {n}: {alt}',
  },
  'cg-input': {
    clear: 'Limpar campo',
  },
  'cg-lightbox': {
    label: 'Visualizador de imagens',
    close: 'Fechar',
    previous: 'Imagem anterior',
    next: 'Próxima imagem',
    empty: 'Nenhuma imagem',
  },
  'cg-list': {
    empty: 'Nenhum item',
  },
  'cg-listbox': {
    empty: 'Nenhuma opção',
  },
  'cg-markdown': {
    copy: 'Copiar',
    copied: 'Copiado',
    copyLabel: 'Copiar código',
    permalink: 'Link permanente para este título',
    taskDone: 'Concluído: ',
    taskTodo: 'A fazer: ',
  },
  'cg-menubar': {
    label: 'Menu do aplicativo',
  },
  'cg-meter': {
    label: 'Medidor',
  },
  'cg-metric-card': {
    loading: 'Carregando métrica',
  },
  'cg-modal': {
    label: 'Diálogo',
    close: 'Fechar diálogo',
    loading: 'Carregando…',
  },
  'cg-navbar': {
    label: 'Navegação principal',
    toggle: 'Abrir ou fechar menu',
  },
  'cg-navigation-menu': {
    label: 'Navegação principal',
  },
  'cg-number-input': {
    decrease: 'Diminuir',
    increase: 'Aumentar',
    label: 'Campo numérico',
  },
  'cg-otp-input': {
    label: 'Código de verificação',
    digit: 'Dígito {n} de {total}',
  },
  'cg-overflow-list': {
    more: 'Mais',
    item: 'Item {n}',
  },
  'cg-app-shell': {
    menu: 'Menu',
  },
  'cg-timeline': {
    moved: '{label} movido para a posição {position} de {total}',
  },
  'cg-timeline-item': {
    reorder: 'Reordenar {label}',
    instructions: 'Use as setas para cima e para baixo para mover esta etapa.',
  },
  'cg-pagination': {
    label: 'Paginação',
    previous: 'Página anterior',
    next: 'Próxima página',
    page: 'Página {page}',
    previousLabel: 'Anterior',
    nextLabel: 'Próxima',
    range: '{start}–{end} de {total}',
  },
  'cg-password-input': {
    label: 'Senha',
    show: 'Mostrar senha',
    hide: 'Ocultar senha',
    weak: 'Fraca',
    fair: 'Razoável',
    good: 'Boa',
    strong: 'Forte',
  },
  'cg-phone-input': {
    switched: 'Alterado para {country}, +{dial}',
    trigger: 'Código do país, atualmente {country}, +{dial}',
    triggerEmpty: 'Selecionar código do país',
    placeholder: 'Número de telefone',
    dialog: 'Selecionar país',
    search: 'Pesquisar países',
    searchPlaceholder: 'Pesquisar país ou +código',
    list: 'Países',
    noMatch: 'Nenhum país corresponde a "{query}"',
    suggested: 'Sugeridos',
    all: 'Todos os países',
  },
  'cg-progress-bar': {
    label: 'Progresso',
  },
  'cg-rating': {
    label: 'Avaliação',
  },
  'cg-resizable': {
    handle: 'Redimensionar painéis',
  },
  'cg-select': {
    placeholder: 'Selecione...',
    search: 'Pesquisar...',
    searchLabel: 'Pesquisar opções',
    noOptions: 'Nenhuma opção',
  },
  'cg-sheet': {
    label: 'Painel',
    resize: 'Redimensionar painel',
  },
  'cg-sidebar': {
    label: 'Navegação principal',
    expand: 'Expandir barra lateral',
    collapse: 'Recolher barra lateral',
  },
  'cg-skeleton': {
    loading: 'Carregando conteúdo',
  },
  'cg-slider': {
    label: 'Controle deslizante',
  },
  'cg-spinner': {
    label: 'Carregando',
  },
  'cg-split-button': {
    more: 'Mais ações',
  },
  'cg-steps': {
    label: 'Etapas',
    step: 'Etapa {n} de {total}: {title}',
    done: ', concluída',
    error: ', com erro',
  },
  'cg-table': {
    empty: 'Nenhum dado',
    selectAll: 'Selecionar todas as linhas',
    selectRow: 'Selecionar linha {row}',
    sortBy: 'Ordenar por',
    sortAsc: '{column}, crescente',
    sortDesc: '{column}, decrescente',
  },
  'cg-tag-input': {
    duplicate: 'A tag "{tag}" já existe',
    max: 'Limite de {max} tags atingido',
    added: 'Tag {tag} adicionada',
    removed: 'Tag {tag} removida',
    remove: 'Remover {tag}',
  },
  'cg-textarea': {
    loading: 'Carregando',
  },
  'cg-time-picker': {
    placeholder: 'Selecione o horário',
    label: 'Seletor de horário',
    dialog: 'Seleção de horário',
    hour: 'Hora',
    minute: 'Min',
    hours: '{n} horas',
    minutes: '{n} minutos',
    am: 'AM',
    pm: 'PM',
  },
  'cg-toaster': {
    label: 'Notificações',
    dismiss: 'Dispensar',
  },
  'cg-toolbar': {
    label: 'Barra de ferramentas',
  },
  'cg-tree-view': {
    empty: 'Nenhum item',
  },
};

export const ptBRValidation: ValidationMessages = {
  valueMissing: 'Preencha este campo.',
  valueMissingCheckbox: 'Marque esta caixa se quiser continuar.',
  valueMissingRadio: 'Selecione uma das opções.',
  valueMissingSelect: 'Selecione um item da lista.',
  typeMismatch: 'Digite um valor no formato esperado.',
  patternMismatch: 'Use o formato solicitado.',
  tooLong: 'O texto está longo demais.',
  tooShort: 'O texto está curto demais.',
  rangeUnderflow: 'O valor está abaixo do mínimo.',
  rangeOverflow: 'O valor está acima do máximo.',
  stepMismatch: 'Digite um valor válido.',
  badInput: 'Digite um valor válido.',
};
