import { Answer, Biotype, TestResult } from '../types';
import { QUESTIONS } from '../data/questions';

const ADAPTATION_MASKS: Record<Biotype, Record<Biotype, { name: string, desc: string }>> = {
  colerico: {
    colerico: {
      name: "Fuego Puro / Esencia Directa",
      desc: "Operas en plena sintonía con tu biología térmica de Fuego. Te mueves con determinación férrea, energía ejecutiva directa y asertividad sin filtros. Tu cuerpo resiste bien la alta tensión pero debes tener precaución de no avasallar o sobrecalentarte sin válvulas de regular tu ira constructiva."
    },
    flematico: {
      name: "La Máscara de la Sumisión Adaptada o el Represor de Fuerza",
      desc: "Posees una biología natural de Fuego impetuoso, pero el entorno familiar o social te enseñó tempranamente que tu enojo y tu fuerza asustaban o herían a los demás. Te adaptaste apagando tu fuego, callando tus límites y actuando dócilmente para ser aceptado. Frecuentemente somatizas con acidez, reflujo, gastritis o contracturas severas por contener el volcán interior. Recuperar tu asertividad limpia y libre de culpa es vital para tu salud."
    },
    sanguineo: {
      name: "La Máscara del Conquistador Encantador",
      desc: "Tu fuego interno se disfraza con la gesticulación rápida y la calidez del Aire. En vez de mandar de manera seca o autoritaria, diriges y ordenas a través del chiste, las relaciones públicas y la persuasión magnética. Consigues que los demás hagan lo que deseas sin que sientan la severidad de un mandato."
    },
    melancolico: {
      name: "La Máscara del Perfeccionista Controlador / El Estratega Silencioso",
      desc: "Canalizas tu impulsividad y rabia de Fuego de forma racional y fría, convirtiéndola en un estándar implacable de excelencia y orden milimétrico (Tierra). No explotas con gritos ordinarios; controlas rígidamente cada detalle de los procesos, volviéndote un diseñador obsesivo con intolerancia lógica si se altera el plan."
    }
  },
  flematico: {
    flematico: {
      name: "Agua Pura / Sostén Orgánico",
      desc: "Vives alineado a tu elemento Agua (frío y húmedo). Tu centro regulador son los vínculos tiernos, la armonía compartida y el soporte pacífico incondicional. Cuentas con gran resiliencia pasiva y capacidad empática, pero tu reto permanente es aprender a poner límites a tiempo antes de que la retención de agua o el resentimiento te hinchen físicamente."
    },
    colerico: {
      name: "La Máscara del Fuerte o el Defensor Autoconstruido",
      desc: "Tu biología de Agua es blanda, receptiva y dulce, pero creciste en un entorno hostil donde mostrar fragilidad equivalía a ser destruido o desplazado. Te construiste una coraza rígida de Fuego colérico para autoprotegerte o asumir la carga pesada del clan. Eres eficiente, mandas y pareces inquebrantable, pero tu sistema nervioso vive en un estado de alerta que te agota profundamente y te contractura de forma crónica la mandíbula y el cuello. Tu alma anhela descansar y dejarse proteger por alguien leal."
    },
    sanguineo: {
      name: "La Máscara del Complaciente Alegre",
      desc: "Tu dulzura de agua se reviste con la gesticulación hiperactiva y el chiste rápido de las relaciones sociales de Aire. Usas el humor y la risa nerviosa para complacer y desviar cualquier tensión o confrontación emocional en el ambiente. Operas con alta inestabilidad pero en el fondo solo buscas que todos estén en paz y te mimen."
    },
    melancolico: {
      name: "La Máscara del Analítico Protector",
      desc: "Proteges tu blanda biología de agua detrás de una trinchera de datos, explicaciones conceptuales y escudos de la mente. Te refugias en la teoría impecable y en el análisis reservado para que nadie pueda invadir, criticar o herir tu profunda sensibilidad emocional."
    }
  },
  sanguineo: {
    sanguineo: {
      name: "Aire Puro / Conector Luminoso",
      desc: "Operas en perfecta armonía con tu biología expansiva, húmeda y caliente de Aire. Tu motor es conectar personas, encender la risa y devorar novedades estéticas o intelectuales. Vives con el corazón en la mano, libre y espontáneo, pero tu desafío evolutivo es no huir ni fugarte de inmediato ante el aburrimiento o el dolor real."
    },
    colerico: {
      name: "La Máscara del General Carismático",
      desc: "Tu naturaleza alegre y ligera de Aire se ha estructurado con un alto compromiso ejecutivo y de control de Fuego. Lideras masas y equipos no solo por encanto, sino por una fuerte determinación táctica de logro físico rápido. Unes el carisma social con metas de hierro, lo que te vuelve arrollador."
    },
    flematico: {
      name: "La Máscara del Pacificador Cómodo",
      desc: "Tu biología expansiva de Aire se apagó por pereza o miedo a las tensiones, adoptando la pesadez del Agua Flemática. Te refugias en un nido inactivo durmiendo de más, limitando tu brillo de forma voluntaria para no molestar y postergando tus proyectos lúdicos para fundirte con el sillón, bloqueando tu capacidad creativa habitual."
    },
    melancolico: {
      name: "La Máscara del Intelectual Complejo o el Payaso Triste",
      desc: "Tu hardware es de Aire (burbujeante, gesticulador, rápido), pero te obligas mental o profesionalmente a operar bajo el rigor rígido y sombrío de la Tierra (Melancólico). Esto crea una paradoja pesada: eres el conector o alma alegre afuera, pero al volver a casa te hundes en análisis existenciales áridos, sintiéndote seco, incomprendido y con un sordo desprecio por la vulgaridad social."
    }
  },
  melancolico: {
    melancolico: {
      name: "Tierra Pura / Intelecto Profundo",
      desc: "Vives en coherencia con tu fría y seca biología de Tierra. Eres minucioso, detallista, con un apetito infinito por la verdad conceptual y la excelencia interna. Tu mente es un diamante de análisis, pero debes cuidar que tu severidad y el pavor al error no te petrifiquen en el perfeccionismo paralizante o el asilamiento trágico."
    },
    colerico: {
      name: "La Máscara del Crítico Implacable",
      desc: "Utilizas tu extrema lucidez de análisis de Tierra no solo para observar, sino como un proyectil de Fuego Colérico para dirigir, corregir la ineficiencia ajena y disparar juicios de severidad quirúrgica. Te vuelves eficiente, directo e inflexible, asustando a los que no rinden a tu alto estándar térmico."
    },
    flematico: {
      name: "La Máscara del Sostén Silencioso",
      desc: "Tu agudo intelecto y sentido crítico de Tierra se silencian bajo una máscara pacífica de Agua Flemática. Con tal de pertenecer y no provocar disputas en la familia, te guardas tus exigentes juicios y te adaptas a servir al otro con condescendencia, rumiando tu amargura existencial en estricto secreto solitario."
    },
    sanguineo: {
      name: "La Máscara del Orador o el Animador de Guardia",
      desc: "Tu biología real es de Tierra: introvertida, selectiva, profunda y reservada. Sin embargo, para complacer al entorno hiperactivo y encajar socialmente, te pones un disfraz hiper-expansivo e histriónico de Aire Sanguíneo. Gesticulas exageradamente, cuentas historias divertidas y pareces gozar la fiesta. Todos te catalogan de carismático, pero esta simulación agota salvajemente tu energía vital y riñones, provocándole una fatiga física y mental severa que te obliga a aislarte por días enteros para reconstituirte."
    }
  }
};

export function calculateResults(answers: Answer[]): TestResult {
  const moduleScores: Record<string, Record<Biotype, number>> = {};
  const totalScores: Record<Biotype, number> = {
    colerico: 0,
    flematico: 0,
    sanguineo: 0,
    melancolico: 0,
  };

  const biotypes: Biotype[] = ['colerico', 'flematico', 'sanguineo', 'melancolico'];

  // Keep track of physical (m1, m2) and behavioral (m3, m4, m5, m6) raw scores
  const physicalSum: Record<Biotype, number> = { colerico: 0, flematico: 0, sanguineo: 0, melancolico: 0 };
  const behavioralSum: Record<Biotype, number> = { colerico: 0, flematico: 0, sanguineo: 0, melancolico: 0 };

  // Initialize module scores
  answers.forEach(ans => {
    if (!moduleScores[ans.moduleId]) {
      moduleScores[ans.moduleId] = { colerico: 0, flematico: 0, sanguineo: 0, melancolico: 0 };
    }
  });

  // Calculate raw scores
  answers.forEach((ans) => {
    const question = QUESTIONS.find((q) => q.id === ans.questionId);
    if (!question) return;

    ans.selectedOptionIndices.forEach((optIndex) => {
      const option = question.options[optIndex];
      const score = 10 * question.weight; // Normalize base option points
      
      if (!moduleScores[ans.moduleId]) {
        moduleScores[ans.moduleId] = { colerico: 0, flematico: 0, sanguineo: 0, melancolico: 0 };
      }
      moduleScores[ans.moduleId][option.biotype] += score;
      totalScores[option.biotype] += score;

      if (ans.moduleId === 'm1' || ans.moduleId === 'm2') {
        physicalSum[option.biotype] += score;
      } else {
        behavioralSum[option.biotype] += score;
      }
    });
  });

  // Normalize Total Scores to 100%
  const totalRawSum = biotypes.reduce((acc, b) => acc + totalScores[b], 0);
  const normalizedTotal: Record<Biotype, number> = { colerico: 0, flematico: 0, sanguineo: 0, melancolico: 0 };
  
  if (totalRawSum > 0) {
    let sum = 0;
    biotypes.forEach(b => {
      normalizedTotal[b] = Math.round((totalScores[b] / totalRawSum) * 100);
      sum += normalizedTotal[b];
    });
    // Adjust rounding error so it sums up to exactly 100%
    if (sum !== 100) {
      const largest = biotypes.reduce((a, b) => totalScores[a] > totalScores[b] ? a : b);
      normalizedTotal[largest] += (100 - sum);
    }
  }

  // Normalize physical vector to percentage
  const physTotalSum = biotypes.reduce((acc, b) => acc + physicalSum[b], 0);
  const normalizedPhys: Record<Biotype, number> = { colerico: 25, flematico: 25, sanguineo: 25, melancolico: 25 };
  if (physTotalSum > 0) {
    let sum = 0;
    biotypes.forEach(b => {
      normalizedPhys[b] = Math.round((physicalSum[b] / physTotalSum) * 100);
      sum += normalizedPhys[b];
    });
    if (sum !== 100) {
      const largest = biotypes.reduce((a, b) => physicalSum[a] > physicalSum[b] ? a : b);
      normalizedPhys[largest] += (100 - sum);
    }
  }

  // Normalize behavioral vector to percentage
  const behavTotalSum = biotypes.reduce((acc, b) => acc + behavioralSum[b], 0);
  const normalizedBehav: Record<Biotype, number> = { colerico: 25, flematico: 25, sanguineo: 25, melancolico: 25 };
  if (behavTotalSum > 0) {
    let sum = 0;
    biotypes.forEach(b => {
      normalizedBehav[b] = Math.round((behavioralSum[b] / behavTotalSum) * 100);
      sum += normalizedBehav[b];
    });
    if (sum !== 100) {
      const largest = biotypes.reduce((a, b) => behavioralSum[a] > behavioralSum[b] ? a : b);
      normalizedBehav[largest] += (100 - sum);
    }
  }

  // Calculate consistency overlap percentage (0-100)
  let overlap = 0;
  biotypes.forEach(b => {
    overlap += Math.min(normalizedPhys[b], normalizedBehav[b]);
  });
  const consistencyScore = Math.max(10, Math.min(100, Math.round(overlap)));

  // Pick dominants for physical and behavioral
  const physicalBiotype = [...biotypes].sort((a,b) => (normalizedPhys[b] - normalizedPhys[a]) || (totalScores[b] - totalScores[a]))[0];
  const behavioralBiotype = [...biotypes].sort((a,b) => (normalizedBehav[b] - normalizedBehav[a]) || (totalScores[b] - totalScores[a]))[0];

  // Rank biotypes globally
  const ranked = [...biotypes].sort((a, b) => normalizedTotal[b] - normalizedTotal[a]);
  const dominant = ranked[0];
  const secondary = ranked[1];

  const maskInfo = ADAPTATION_MASKS[physicalBiotype]?.[behavioralBiotype];
  const maskName = maskInfo?.name || "Máscara de Adaptación";
  const maskDescription = maskInfo?.desc || "Muestras un proceso de adaptación complejo con múltiples influencias en tu comportamiento en comparación con tus rasgos físicos.";
  const isAligned = physicalBiotype === dominant;

  // Soft Normalization per module for the radar chart (1-100 range)
  const normalizedModuleScores: Record<string, Record<Biotype, number>> = {};
  Object.keys(moduleScores).forEach(modId => {
    const modRawSum = biotypes.reduce((acc, b) => acc + moduleScores[modId][b], 0);
    normalizedModuleScores[modId] = { colerico: 0, flematico: 0, sanguineo: 0, melancolico: 0 };
    if (modRawSum > 0) {
      let sum = 0;
      biotypes.forEach(b => {
        normalizedModuleScores[modId][b] = Math.round((moduleScores[modId][b] / modRawSum) * 100);
        sum += normalizedModuleScores[modId][b];
      });
      if (sum !== 100) {
        const largest = biotypes.reduce((a, b) => moduleScores[modId][a] > moduleScores[modId][b] ? a : b);
        normalizedModuleScores[modId][largest] += (100 - sum);
      }
    }
  });

  const diff = normalizedTotal[dominant] - normalizedTotal[secondary];
  const isMixed = diff < 15;

  // Confidence index: Base 80%, subtracts for contradictions and flat/neutral profiles
  let confidence = 80;

  // 1. Biological contradictions: Opposite elements both scoring high is confusing
  // colerico (Fuego - Fire) vs flematico (Agua - Water)
  const fireWaterOpposition = Math.min(normalizedTotal.colerico, normalizedTotal.flematico);
  // sanguineo (Aire - Air) vs melancolico (Tierra - Earth)
  const airEarthOpposition = Math.min(normalizedTotal.sanguineo, normalizedTotal.melancolico);
  confidence -= Math.round((fireWaterOpposition + airEarthOpposition) * 0.4);

  // 2. Flat profiles (neutrality or too many standard/even choices decreases confidence)
  const scoresArray = Object.values(normalizedTotal);
  const maxScore = Math.max(...scoresArray);
  const minScore = Math.min(...scoresArray);
  const range = maxScore - minScore;
  if (range < 20) {
    confidence -= 12; // High dispersion / flat (neutral response patterns)
  } else if (range > 40) {
    confidence += 10; // High polarity indicates very clear and certain profiles
  }

  // Adjust for dominant intensity
  if (normalizedTotal[dominant] > 50) confidence += 5;
  
  // Clamp boundaries safely
  confidence = Math.max(60, Math.min(98, confidence));

  // Extract the 3 most determinant responses of module 6
  const m6Answers = answers.filter(a => a.moduleId === 'm6');
  const keyResponses: { questionText: string, optionSelected: string, biotype: Biotype }[] = [];
  
  m6Answers.slice(0, 3).forEach(ans => {
    const question = QUESTIONS.find(q => q.id === ans.questionId);
    if (question && ans.selectedOptionIndices.length > 0) {
      const option = question.options[ans.selectedOptionIndices[0]];
      keyResponses.push({
        questionText: question.text,
        optionSelected: option.text,
        biotype: option.biotype
      });
    }
  });

  return {
    dominant,
    secondary: normalizedTotal[secondary] > 15 ? secondary : null,
    moduleScores: normalizedModuleScores,
    totalScores: normalizedTotal,
    confidence,
    isMixed,
    mixedIndex: isMixed ? 2 : (diff < 25 ? 1 : 0),
    
    // Extended Biotype Fields
    physicalBiotype,
    behavioralBiotype,
    consistencyScore,
    maskName,
    maskDescription,
    isAligned,
    keyResponses
  };
}
