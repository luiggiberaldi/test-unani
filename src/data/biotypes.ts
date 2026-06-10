import { BiotypeProfile, Biotype, ModuleData } from '../types';

export const MODULES: ModuleData[] = [
  { id: 'm1', key: 'fisico', name: 'Tu cuerpo base', description: 'Estas preguntas evalúan tu biología natural, independientemente de tu peso actual o entrenamiento.', weight: 3 },
  { id: 'm2', key: 'energia', name: 'Tu relación con el entorno', description: 'Cómo reacciona tu cuerpo y energía al clima, temperatura y condiciones físicas.', weight: 2 },
  { id: 'm3', key: 'accion', name: 'Tu motor interno', description: 'Cómo actúas, decides y mueves tu energía en el mundo.', weight: 2 },
  { id: 'm4', key: 'emocion', name: 'Tu vida interior', description: 'Cómo sientes, procesas y expresas lo que te pasa dentro.', weight: 2 },
  { id: 'm5', key: 'vinculo', name: 'Cómo te vinculas', description: 'Tu forma de amar, conectar y relacionarte con los demás.', weight: 1.5 },
  { id: 'm6', key: 'adaptacion', name: 'Tú y tu máscara', description: 'Cuánto de lo que mostrás al mundo coincide con lo que sos en el fondo.', weight: 1 },
];

export const BIOTYPES: Record<Biotype, BiotypeProfile> = {
  colerico: {
    id: 'colerico',
    name: 'El que dirige',
    color: 'amber',
    symbol: '🔥',
    element: 'Fuego',
    temperature: 'Caliente + Seco',
    description: 'El colérico es el biotipo del impulso, la dirección y la fuerza ejecutiva. Tiene una energía natural orientada a la acción, los resultados y el liderazgo. Su cuerpo tiende a ser angular, con rasgos marcados, calor interno intenso y alta capacidad para la presión. No tolera la ambigüedad y tiene dificultad con el mundo emocional de los demás cuando percibe que interfiere con el avance. Su mayor don es la capacidad de mover, liderar e impactar. Su mayor sombra es la dificultad para detenerse, sentir y conectar desde la vulnerabilidad.',
    physical: 'Proporciones desiguales, tronco corto con extremidades largas o cuerpo denso y angular. Rostro triangular o mandíbula definida. Piel seca y caliente. Vello abundante. Baja tolerancia al calor extremo.',
    energy: 'Alta energía explosiva. Decisiones rápidas. Liderazgo natural. Se activa con desafíos y metas. Necesita movimiento y propósito.',
    emotional: 'Emociones intensas pero poco expresadas. Racionaliza el dolor. Confronta más que reflexiona. Dificultad con la espera emocional.',
    relational: 'Busca admiración y respeto. Puede ser posesivo. Ama con intensidad pero con poca ternura explícita. Conflicto típico: el otro siente que no es visto o considerado.',
    gifts: 'Liderazgo, ejecución, resiliencia, claridad bajo presión, capacidad de impacto.',
    shadows: 'Impaciencia, control, dificultad emocional, tendencia al todo o nada.',
    needs: 'Ser respetado, tener propósito, sentir que avanza.',
    imbalance: 'Agotamiento por hiperactividad, conflictos por dominancia, desconexión emocional.',
    complementary: 'flematico',
  },
  flematico: {
    id: 'flematico',
    name: 'El que sostiene',
    color: 'blue',
    symbol: '💧',
    element: 'Agua',
    temperature: 'Frío + Húmedo',
    description: 'El flemático es el biotipo del amor, la contención y la profundidad emocional. Su naturaleza está orientada al vínculo, la armonía y el cuidado. Tiene una energía suave pero constante, y una capacidad enorme para sostener a los demás. Su cuerpo tiende a retener líquidos, ser redondeado o suave en sus formas. Siente el frío con más intensidad. Su mayor don es la capacidad de amar, contener y crear paz. Su mayor sombra es la dificultad para poner límites, reconocer su propio valor y actuar sin esperar validación.',
    physical: 'Cuerpo redondeado o suave. Retención de líquidos. Ojos grandes y expresivos. Piel fría y húmeda. Alta sensibilidad al frío y el aire acondicionado.',
    energy: 'Energía sostenida pero lenta para activarse. Necesita motivación afectiva. Le cuesta mucho el conflicto directo.',
    emotional: 'Alta profundidad emocional. Muy sensible al rechazo. Guarda mucho antes de explotar. Necesidad fuerte de sentirse visto y amado.',
    relational: 'Ama con lealtad y entrega total. Busca contención. Puede volverse dependiente o sobre-adaptado. Conflicto típico: no dice lo que necesita y acumula.',
    gifts: 'Empatía, lealtad, calidez, capacidad de sostén, amor profundo.',
    shadows: 'Dependencia, falta de límites, victimismo, inacción por miedo al rechazo.',
    needs: 'Ser visto, sentirse amado incondicionalmente, tener paz.',
    imbalance: 'Sobre-adaptación, resentimiento acumulado, falta de identidad propia.',
    complementary: 'colerico',
  },
  sanguineo: {
    id: 'sanguineo',
    name: 'El que conecta',
    color: 'red',
    symbol: '✨',
    element: 'Aire',
    temperature: 'Caliente + Húmedo',
    description: 'El sanguíneo es el biotipo del carisma, la conexión y la presencia social. Tiene una energía vibrante, expresiva y contagiosa. Su naturaleza está orientada a las personas, el movimiento y la experiencia. Alta densidad muscular, presencia fuerte, voz que llena el espacio. Su mayor don es su capacidad para animar, conectar y mover a los demás. Su mayor sombra es la dificultad para profundizar, sostener compromisos y tolerar la soledad o la quietud.',
    physical: 'Alta densidad muscular y presencia física. Moreno, rasgos marcados pero cálidos. Piel caliente y húmeda. Sudoración presente. Vello abundante.',
    energy: 'Energía explosiva y social. Se activa con personas. Alta tolerancia al caos. Decisiones rápidas e intuitivas.',
    emotional: 'Expresa fácil pero superficialmente. Se repone rápido emocionalmente. Le cuesta la profundidad sostenida. Puede parecer más ligero de lo que es.',
    relational: 'Ama con espontaneidad y pasión. Busca libertad y estimulación. Conflicto típico: el otro siente que no hay suficiente profundidad o compromiso.',
    gifts: 'Carisma, liderazgo social, adaptabilidad, capacidad de motivar y conectar.',
    shadows: 'Superficialidad, inconsistencia, dispersión, dificultad para profundizar.',
    needs: 'Libertad, reconocimiento, movimiento, conexión viva.',
    imbalance: 'Hiperactividad social, ansiedad cuando está solo, dificultad para introspección.',
    complementary: 'melancolico',
  },
  melancolico: {
    id: 'melancolico',
    name: 'El que profundiza',
    color: 'emerald',
    symbol: '🌍',
    element: 'Tierra',
    temperature: 'Frío + Seco',
    description: 'El melancólico es el biotipo de la profundidad, el análisis y la excelencia interna. Tiene una inteligencia introspectiva y una capacidad única para ver lo que otros no ven. Su cuerpo tiende a ser delgado, de rasgos finos, con tendencia a la tensión muscular y el frío. Su mayor don es su capacidad de pensar profundo, crear con excelencia y sentir con intensidad. Su mayor sombra es la tendencia al perfeccionismo paralizante, la autoexigencia destructiva y el aislamiento.',
    physical: 'Delgado, fino, alargado. Rasgos angulosos pero delicados. Piel fría y seca. Ojos profundos. Baja masa muscular sin esfuerzo. Alta sensibilidad al frío.',
    energy: 'Energía mental intensa pero física intermitente. Trabaja en ciclos de inspiración y agotamiento. Necesita soledad para recargar.',
    emotional: 'Siente profundo y duradero. Le cuesta mostrar lo que siente. Alta sensibilidad al rechazo pero lo guarda. Autoexigencia extrema.',
    relational: 'Ama profundo y exclusivo. Busca ser comprendido. Conflicto típico: el otro siente que es distante o que nunca es suficiente para él/ella.',
    gifts: 'Profundidad, inteligencia, creatividad, lealtad, excelencia.',
    shadows: 'Perfeccionismo, aislamiento, autoexigencia, dificultad para pedir ayuda.',
    needs: 'Ser comprendido profundamente, tener propósito con significado, soledad de calidad.',
    imbalance: 'Depresión, bloqueo creativo, hipercrítica, desconexión del cuerpo.',
    complementary: 'sanguineo',
  }
};

export const MIXED_PROFILES: Record<string, { title: string, text: string }> = {
  'colerico-flematico': {
    title: 'El que dirige con corazón',
    text: 'Une la fuerza ejecutiva del colérico con la profundidad emocional del flemático. Puede ser un líder profundamente humano, pero vive en tensión constante entre el impulso a avanzar y la necesidad de conexión. Suele tener alta capacidad de impacto pero también alta sensibilidad oculta.'
  },
  'colerico-sanguineo': {
    title: 'El que conquista',
    text: 'Alta energía, carisma y orientación a resultados. Natural en espacios de alta presión social. Puede liderar y animar al mismo tiempo. Su sombra: dificultad para detenerse, poca introspección, tendencia a la impulsividad.'
  },
  'colerico-melancolico': {
    title: 'El que construye en soledad',
    text: 'Combina la fuerza ejecutiva con la profundidad analítica. Puede lograr cosas extraordinarias pero con un costo interno alto. Vive la tensión entre querer impactar y necesitar retiro. Altamente exigente consigo mismo.'
  },
  'flematico-colerico': {
    title: 'El que dirige con corazón',
    text: 'Une la contención del flemático con la fuerza ejecutiva del colérico, logrando resultados a la vez que cuida de su gente.'
  },
  'flematico-sanguineo': {
    title: 'El que cuida y conecta',
    text: 'Empatía profunda con alta presencia social. Cálido, magnético, conector. Puede ser muy querido por todos pero sentirse vacío por dentro. Su reto: encontrar profundidad real detrás del carisma social.'
  },
  'flematico-melancolico': {
    title: 'El que siente profundo y no lo dice',
    text: 'La combinación más interna e intensa. Alta sensibilidad emocional e intelectual. Ama profundo, piensa profundo, pero raramente lo expresa. Su reto mayor: aprender a pedir, a hablar y a confiar.'
  },
  'sanguineo-colerico': {
    title: 'El que conquista',
    text: 'Extremo carisma sumado a la determinación para conseguir resultados rápidamente.'
  },
  'sanguineo-flematico': {
    title: 'El que cuida y conecta',
    text: 'Alegría impulsiva y capacidad afectiva gigantesca, excelente para la vida en comunidad.'
  },
  'sanguineo-melancolico': {
    title: 'El alma compleja y brillante',
    text: 'La combinación más paradójica. Exterior luminoso y social con interior profundo y exigente. Puede parecer liviano pero sentir muy hondo. Su reto: integrar ambas caras sin traicionar ninguna.'
  },
  'melancolico-colerico': {
    title: 'El que construye en soledad',
    text: 'Gran capacidad de enfoque, perfección y energía concentrada para el logro a largo plazo.'
  },
  'melancolico-flematico': {
    title: 'El que siente profundo y no lo dice',
    text: 'Mundo interior abismal, altísima lealtad y observación del entorno sin perturbación exterior.'
  },
  'melancolico-sanguineo': {
    title: 'El alma compleja y brillante',
    text: 'Intelecto refinado que ocasionalmente deslumbra en espacios creativos, viviendo entre la sombra y la luz social.'
  }
};
