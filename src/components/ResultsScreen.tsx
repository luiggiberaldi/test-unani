import { motion } from 'motion/react';
import { 
  Download, 
  RefreshCw, 
  Share2, 
  Award, 
  AlertTriangle, 
  Fingerprint, 
  Activity, 
  Flame, 
  Zap, 
  Sparkles, 
  Heart, 
  Shield, 
  TrendingUp, 
  UserCheck,
  Compass,
  Layers,
  Thermometer,
  BrainCircuit,
  Eye,
  RotateCcw
} from 'lucide-react';
import { TestResult, Biotype } from '../types';
import { BIOTYPES, MIXED_PROFILES } from '../data/biotypes';
import { RadarChart } from './RadarChart';
import { Logo } from './Logo';

export function ResultsScreen({ result, onRestart }: { result: TestResult, onRestart: () => void, key?: string }) {
  const domProfile = BIOTYPES[result.dominant];
  const secProfile = result.secondary ? BIOTYPES[result.secondary] : null;
  const physicalProfile = BIOTYPES[result.physicalBiotype];
  const behavioralProfile = BIOTYPES[result.behavioralBiotype];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      const text = `Mi Biotipo Dominante es ${domProfile.name} ${domProfile.symbol}${secProfile ? ` con mezcla de ${secProfile.name}` : ''}. Coherencia Orgánica: ${result.consistencyScore}%. Descubre el tuyo en la Evaluación de Biotipos.`;
      await navigator.clipboard.writeText(text);
      alert('¡Resultado copiado al portapapeles!');
    } catch(e) {
      console.error(e);
    }
  };

  // Label color matching for each biotype element to keep a high-quality visual rhythm
  const getBiotypeColorClass = (b: Biotype) => {
    switch (b) {
      case 'colerico': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'flematico': return 'text-violet-400 bg-violet-400/10 border-violet-400/20';
      case 'sanguineo': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'melancolico': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    }
  };

  const getConsistencyLabel = (score: number) => {
    if (score >= 75) return { text: "Coherencia Orgánica Elevada", desc: "Gran alineación biológica. Tu software conductual está en perfecta sintonía con tu hardware biológico primario. Tienes menor fricción energética pero debes entrenar flexibilidad adaptativa para no caer en rigidez.", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    if (score >= 45) return { text: "Coherencia Adaptativa Media", desc: "Adaptación saludable. Has construido recursos sociales e intelectuales para adaptarte a las exigencias socioculturales del entorno laboral y familiar sin perder el control de tu biología base.", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
    return { text: "Tensión Biológica Sostenida (Máscara de Compensación)", desc: "Conflicto bio-energético severo. Estás forzando a tu sistema nervioso y muscular a operar de manera opuesta a tu temperatura en reposo. Esto significa que gastas una inmensa energía sorda para sostener tu personalidad, lo que genera somatizaciones físicas recurrentes.", color: "text-red-400 bg-red-500/10 border-red-500/20" };
  };

  const consistencyInfo = getConsistencyLabel(result.consistencyScore);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col w-full h-full bg-app-bg text-[#e5e7eb]"
    >
      {/* Dynamic Header */}
      <nav className="h-16 border-b border-app-border px-4 md:px-8 flex items-center justify-between bg-[#080808] no-print shrink-0 overflow-x-auto">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]" />
          <span className="text-xs font-semibold tracking-wider md:tracking-widest uppercase whitespace-nowrap font-display">
            AUDITORÍA DE BIOTIPO
          </span>
        </div>
        <div className="flex items-center gap-3 md:gap-4 ml-4">
          <button onClick={onRestart} className="px-3.5 py-1.5 border border-white/15 rounded-full text-[11px] hover:bg-white/5 transition-colors whitespace-nowrap flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nuevo Test</span>
          </button>
          <button onClick={handleShare} className="px-3.5 py-1.5 border border-white/15 rounded-full text-[11px] hover:bg-white/5 transition-colors whitespace-nowrap flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-amber-500" />
            Compartir
          </button>
          <button onClick={handlePrint} className="px-4 py-1.5 gold-gradient text-black rounded-full text-[11px] font-bold hover:opacity-95 shadow-lg shadow-amber-500/20 whitespace-nowrap flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Exportar PDF
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        <main className="max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 space-y-8">
          
          {/* HEADER HERO AREA */}
          <section className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold block mb-1">Informe Completo de Auditoría y Alineación Humana</span>
              <h1 className="text-4xl md:text-5xl font-extralight uppercase font-display leading-tight tracking-tight">
                TUS RESULTADOS <span className="gold-text font-bold">BIOTÍPICOS</span>
              </h1>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-end text-xs no-print">
              <span className="px-3 py-1.5 bg-white/5 rounded-full border border-white/5 text-gray-400">
                Fiabilidad: <strong className="text-amber-500 ml-1">{result.confidence}%</strong>
              </span>
              <span className={`px-3 py-1.5 rounded-full border ${consistencyInfo.color}`}>
                Consistencia: <strong>{result.consistencyScore}%</strong>
              </span>
            </div>
          </section>

          {/* MAIN COLUMN OVERVIEW (Dominant Profiling & Multi-dimensional Radar) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT PROFILE CARD */}
            <div className="lg:col-span-4 bg-app-card border border-app-border rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-6 -right-6 text-[140px] opacity-10 pointer-events-none filter sepia select-none">
                {domProfile.symbol}
              </div>
              
              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-extrabold font-display">Biotipo Dominante</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl">{domProfile.symbol}</span>
                    <h2 className="text-3xl font-bold uppercase tracking-tight gold-text font-display">{domProfile.id}</h2>
                  </div>
                  <h3 className="text-xs text-gray-400 italic uppercase tracking-wider mt-0.5">"{domProfile.name}"</h3>
                </div>

                <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-light">{domProfile.description}</p>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-500 mb-1">Elemento</span>
                    <span className="text-[11px] font-semibold text-amber-200 uppercase">{domProfile.element}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-500 mb-1 font-display">Temperatura</span>
                    <span className="text-[11px] font-semibold text-amber-200 uppercase">{domProfile.temperature}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 relative z-10 space-y-4">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-[#d5af37] mb-1 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Dones y Potencial de Esencia
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{domProfile.gifts}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-gray-400" /> Zonas Ciegas y Sombras
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{domProfile.shadows}</p>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl">
                  <h4 className="text-[10px] uppercase tracking-widest text-amber-500 mb-1 font-bold flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" /> Motor Oculto y Necesidad Real
                  </h4>
                  <p className="text-xs text-gray-300 italic">"{domProfile.needs}"</p>
                </div>
              </div>
            </div>

            {/* RADAR ANALYTICS CHART */}
            <div className="lg:col-span-5 bg-app-card border border-app-border rounded-2xl p-6 flex flex-col justify-between items-center relative min-h-[360px]">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1.5 font-display">
                  <Layers className="w-3.5 h-3.5 text-amber-500/80" /> Análisis de 6 Dimensiones
                </span>
                <span className="text-[9px] uppercase text-gray-500 tracking-widest">Auditoría Psico-Física</span>
              </div>
              
              <RadarChart result={result} className="w-full max-w-[270px] drop-shadow-[0_0_20px_rgba(212,175,55,0.12)] my-4" />
              
              <div className="w-full mt-2 grid grid-cols-2 gap-3 text-center no-print">
                <div className="bg-white/5 p-2 rounded-xl text-left border border-white/5">
                  <span className="text-[9px] uppercase text-gray-500 block mb-0.5">Motor de Gasto</span>
                  <span className="text-xs font-semibold block text-gray-300 truncate">{domProfile.energy.split('.')[0]}</span>
                </div>
                <div className="bg-white/5 p-2 rounded-xl text-left border border-white/5">
                  <span className="text-[9px] uppercase text-gray-500 block mb-0.5 font-display">Fuerza Interior</span>
                  <span className="text-xs font-semibold block text-gray-300 truncate">{domProfile.emotional.split('.')[0]}</span>
                </div>
              </div>
            </div>

            {/* WEIGHTED BREAKDOWN & COHERENCE GAUGE */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              
              <div className="bg-app-card border border-app-border rounded-2xl p-6 flex flex-col flex-1">
                <h3 className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 font-bold flex items-center gap-1.5 font-display">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" /> Presencia Global (%)
                </h3>
                
                <div className="space-y-4 flex-1">
                  {(Object.entries(result.totalScores) as [Biotype, number][])
                    .sort((a,b) => b[1] - a[1])
                    .map(([bio, score]) => (
                    <div key={bio} className="group">
                      <div className="flex justify-between text-xs mb-1.5 items-center">
                        <span className="text-gray-300 capitalize flex items-center gap-2 font-medium">
                          <span className="text-sm">{BIOTYPES[bio].symbol}</span> {bio}
                        </span>
                        <span className="text-white font-bold">{score}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                        <motion.div 
                          className="h-full rounded-full transition-all"
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{ 
                            background: bio === 'colerico' ? 'linear-gradient(90deg, #f27d26, #f9a825)' :
                                       bio === 'flematico' ? 'linear-gradient(90deg, #7c4dff, #b388ff)' :
                                       bio === 'sanguineo' ? 'linear-gradient(90deg, #ff5252, #ff8a80)' :
                                       'linear-gradient(90deg, #00e676, #b9f6ca)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {secProfile && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-3">
                    <span className="text-xl shrink-0 p-1 bg-white/5 border border-white/10 rounded-lg">{secProfile.symbol}</span>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase text-gray-500">Matiz Secundario</span>
                      <h4 className="text-xs font-semibold text-gray-200 truncate capitalize">{secProfile.id} ({result.totalScores[secProfile.id]}%)</h4>
                    </div>
                  </div>
                )}
              </div>

              {/* COHERENCE BOX OUT */}
              <div className="bg-app-card border border-app-border rounded-2xl p-4 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-wider text-amber-500 font-extrabold flex items-center gap-1.5 font-display">
                    <Activity className="w-3.5 h-3.5" /> Coherencia Orgánica
                  </span>
                  <span className="text-xs font-extrabold text-white gold-text">{result.consistencyScore}%</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Refleja la correspondencia entre tus rasgos estructurales físicos ({physicalProfile.symbol}) y tus expresiones relacionales, emocionales y adaptativas en la vida cotidiana ({behavioralProfile.symbol}).
                </p>
              </div>

            </div>
          </section>

          {/* ANÁLISIS DE MÁSCARA ADAPTATIVA: COSTO BIOLÓGICO Y ESTRÉS */}
          <section className="bg-app-card border border-app-border rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <BrainCircuit className="w-40 h-40" />
            </div>

            <div className="relative z-10 space-y-6">
              
              {/* SECTION HEADER */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-extrabold block mb-0.5">Módulo de Integración y Neurofisiología</span>
                  <h3 className="text-2xl font-bold uppercase font-display tracking-tight text-white flex items-center gap-2">
                    <Layers className="w-6 h-6 text-amber-500" /> Auditoría de la Máscara de Adaptación
                  </h3>
                </div>
                <div className={`px-4 py-2 border rounded-xl flex items-center gap-2 max-w-sm ${consistencyInfo.color}`}>
                  <UserCheck className="w-4 h-4 shrink-0" />
                  <div>
                    <h5 className="text-[10px] uppercase font-bold tracking-wider">{consistencyInfo.text}</h5>
                  </div>
                </div>
              </div>

              {/* COMPARATIVE GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* DUALITY COMPASS */}
                <div className="lg:col-span-4 bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div className="text-center pb-2">
                    <h4 className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-3 font-display">Dualidad Hardware (Cuerpo) vs Software (Mente)</h4>
                    
                    <div className="flex items-center justify-center gap-6 py-2">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl p-3 bg-[#0a0a0a] border border-white/10 rounded-full w-16 h-16 flex items-center justify-center relative">
                          {physicalProfile.symbol}
                        </span>
                        <span className="text-[9px] uppercase text-gray-500 mt-2 font-bold block">Biología / Base</span>
                        <span className="text-xs text-white capitalize font-medium">{physicalProfile.id}</span>
                        <span className="text-[10px] text-amber-500 italic mt-0.5">({physicalProfile.element})</span>
                      </div>

                      <div className="bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 text-amber-500 font-extrabold text-xs">
                        {result.isAligned ? "⇄" : "⚡"}
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-3xl p-3 bg-[#0a0a0a] border border-white/10 rounded-full w-16 h-16 flex items-center justify-center">
                          {behavioralProfile.symbol}
                        </span>
                        <span className="text-[9px] uppercase text-gray-500 mt-2 font-bold block">Conducta / Alerta</span>
                        <span className="text-xs text-white capitalize font-medium">{behavioralProfile.id}</span>
                        <span className="text-[10px] text-amber-500 italic mt-0.5">({behavioralProfile.element})</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#050505] p-3 rounded-lg border border-white/5">
                    <p className="text-[10.5px] text-gray-400 font-light text-center leading-relaxed">
                      {result.isAligned 
                        ? "Tu estructura corporal y tu respuesta adaptativa coinciden perfectamente. Tu sistema opera en armonía estructural basal." 
                        : "Existe una discrepancia energética. Tu cuerpo guarda una inercia térmica pero tu comportamiento se regula con otra, lo que obliga a tu cerebro a realizar un esfuerzo biológico sordo."}
                    </p>
                  </div>
                </div>

                {/* DETAILED MASK FIELD */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amber-500" />
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest font-display">Máscara Activable Detectada</span>
                    </div>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">{result.maskName}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">{result.maskDescription}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                      <span className="text-[10px] uppercase tracking-wider text-red-500 font-bold block mb-1 font-display">Costo Biológico Sometido</span>
                      <p className="text-[11px] text-gray-300 leading-relaxed italic">
                        {physicalProfile.id === 'flematico' && "Retención de líquidos sorda, pesadez en el bajo vientre, asfixia por ruidos, contracturas severas en trapecio y mandíbula."}
                        {physicalProfile.id === 'colerico' && "Gastritis reactiva, acidez, excitación del sistema cardiovascular, migrañas por rigidez capilar e insomnio activo."}
                        {physicalProfile.id === 'sanguineo' && "Ansiedad superficial constante, fatiga de caja torácica, palpitaciones y dispersión nerviosa severa tras sobrecarga."}
                        {physicalProfile.id === 'melancolico' && "Sequedad extrema en piel y articulaciones, espasmos digestivos, dolor lumbar rítmico y decaimiento del sistema inmuno-glandular."}
                      </p>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
                      <span className="text-[10px] uppercase tracking-wider text-amber-500 font-bold block mb-1 font-display">Descompensación en Estrés Sostenido</span>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        {behavioralProfile.id === 'colerico' && "Asumes que nadie hará las cosas bien. Caes en un control dictatorial obsesivo, arrollando a tu equipo para evitar hundirte."}
                        {behavioralProfile.id === 'flematico' && "Desapareces física y emocionalmente. Caes en una inercia pasiva de sillón y autodesprecio sordo comiendo sin hambre."}
                        {behavioralProfile.id === 'sanguineo' && "Te hiper-expandes con excusas teatrales, dejas todo a medias y buscas estimulación superficial y fugas de 3 segundos para eludir el vacío."}
                        {behavioralProfile.id === 'melancolico' && "Colapsas en una tristeza amarga de severidad contenida, con un sordo desprecio por el mundo exterior al ver que no alcanza tus estándares."}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
              
            </div>
          </section>

          {/* KEY DIAGNOSTIC ANSWERS EXPLAINED (The Unconscious Speaks) */}
          {result.keyResponses && result.keyResponses.length > 0 && (
            <section className="bg-app-card border border-app-border rounded-2xl p-6 relative">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white font-display">Las Revelaciones de Tu Inconsciente</h3>
                </div>
                <p className="text-xs text-gray-400 pb-2">
                  Auditoría de tus respuestas diagnósticas más representativas del Módulo de Resiliencia. Lo que contestaste revela el timonel real de tus defensas inconscientes:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.keyResponses.map((kr, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase text-amber-500 font-extrabold tracking-wider block">Diagnóstico #{idx + 1} • {kr.questionText}</span>
                        <p className="text-xs font-semibold text-gray-200 mt-1 italic">"{kr.optionSelected}"</p>
                      </div>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500">Biotipo asociado:</span>
                        <span className={`px-2.5 py-0.5 text-[9px] rounded-full border tracking-wide uppercase font-bold font-mono ${getBiotypeColorClass(kr.biotype)}`}>
                          {kr.biotype}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* PROTOCOLO INTERINTEGRADO */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center gap-2">
              <Compass className="w-6 h-6 text-amber-500" /> Protocolo de Reequilibrio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* HEATING/COOLING REGULATION (TÉRMICA) */}
              <div className="bg-app-card border border-app-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <div className="p-2 bg-amber-500/10 rounded-xl">
                    <Thermometer className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-white">1. Regulación Fisiológica y Térmica</h4>
                    <span className="text-[9px] text-gray-500 block">Equilibrio de Elementos</span>
                  </div>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-gray-300">
                  <p>
                    Para tu cuerpo físico de elemento <strong className="text-amber-200">{physicalProfile.element}</strong> (temperatura <strong className="text-amber-200">{physicalProfile.temperature}</strong>), el autocuidado biológico requiere:
                  </p>
                  <ul className="space-y-2.5 list-disc pl-4 text-[11px] text-gray-400">
                    {physicalProfile.element === 'Fuego' && (
                      <>
                        <li><strong>Alimentación Secante/Refrescante:</strong> Reduce el picante, el exceso de carnes rojas y café que sobreexcitán tu bazo e hígado. Súmale verduras crujientes, manzana verde e infusiones frías de menta u hoja de limón.</li>
                        <li><strong>Hábitos:</strong> Baños de agua fresca tras el estrés caluroso. Evita la exposición continua al sol del mediodía que eleva tu intolerancia irritable.</li>
                      </>
                    )}
                    {physicalProfile.element === 'Agua' && (
                      <>
                        <li><strong>Activación Diaria Seca:</strong> Tu cuerpo retiene agua con facilidad y se enfría rápido. Utiliza especias digestivas calientes (jengibre, canela, cardamomo, pimienta cayena) para encender tu fuego metabólico.</li>
                        <li><strong>Movimiento:</strong> Baños de vapor secos (sauna) e intervalos cortos de ejercicio cardiovascular de alta sudoración para expulsar líquidos acumulados cotidianamente.</li>
                      </>
                    )}
                    {physicalProfile.element === 'Aire' && (
                      <>
                        <li><strong>Enraizamiento de Fuego/Tierra:</strong> Tu cuerpo de aire es caliente pero propenso a sudar y perder sales. Consume caldos nutritivos calientes, tubérculos y alimentos húmedos.</li>
                        <li><strong>Ambiente:</strong> Evita el aire acondicionado sostenido directo que te marchita y deshidrata, y practica yoga o masajes con aceites tibios para cuidar tus ligamentos rígidos bajo estrés.</li>
                      </>
                    )}
                    {physicalProfile.element === 'Tierra' && (
                      <>
                        <li><strong>Humectación y Calor Interno:</strong> Eres naturalmente frío y propenso a rigideces óseas. Consume alimentos cocidos, verduras al vapor y caldos untuosos.</li>
                        <li><strong>Hábitos:</strong> Bebe agua tibia de forma constante a lo largo del día. Protege tus pies y base del cráneo del frío húmedo sostenido que te drena la energía en invierno.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* REGISTER EXPANSION (COMPLEMENTARIO) */}
              <div className="bg-app-card border border-app-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <div className="p-2 bg-amber-500/10 rounded-xl">
                    <BrainCircuit className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-white">2. Integración Complementaria</h4>
                    <span className="text-[9px] text-gray-500 block">Elemento Sanador</span>
                  </div>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-gray-300">
                  <p>
                    Tu camino de integración y equilibrio biocuántico consiste en desarrollar y sintonizar la energía de tu biotipo complementario: <strong className="text-amber-200 uppercase">{physicalProfile.complementary}</strong> {BIOTYPES[physicalProfile.complementary].symbol}.
                  </p>
                  <ul className="space-y-2.5 list-disc pl-4 text-[11px] text-gray-400">
                    {physicalProfile.complementary === 'flematico' && (
                      <>
                        <li><strong>Aprende a Detenerte:</strong> Deja que las cosas marchen solas un momento. Practica el don de escuchar silenciosamente a un ser amado sin intentar resolverle el problema ni controlarlo.</li>
                        <li><strong>Suavidad:</strong> Incorpora momentos de quietud total para meditar o simplemente estar sin metas específicas a conquistar.</li>
                      </>
                    )}
                    {physicalProfile.complementary === 'colerico' && (
                      <>
                        <li><strong>Usa Tu Fuerza Rococó:</strong> Di "NO" seco ante la primera demanda que sientas abusiva. El conflicto limpio no destruye el amor; te preserva la vida y tus riñones.</li>
                        <li><strong>Movimiento Directo:</strong> Establece metas personales tangibles, independientemente de complacer o salvar afectivamente a otras personas.</li>
                      </>
                    )}
                    {physicalProfile.complementary === 'melancolico' && (
                      <>
                        <li><strong>Abraza la Soledad Profunda:</strong> Pasa 3 horas semanales a solas sin interrupciones electrónicas. Investiga, lee o escribe sobre un tema complejo que te exija foco largo.</li>
                        <li><strong>Compromiso:</strong> Sostén un proyecto específico por más de un mes aun cuando merme tu excitación carismática inicial.</li>
                      </>
                    )}
                    {physicalProfile.complementary === 'sanguineo' && (
                      <>
                        <li><strong>Suelta el Perfeccionismo:</strong> Ríete de tus propios errores públicamente. Participa de interacciones lúdicas livianas y sin propósitos intelectuales elevados.</li>
                        <li><strong>Movimiento Expansivo:</strong> Expresa lo que sientes a través del cuerpo, la gesticulación de hombros y la risa fuerte colectiva.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* DECOMPRESSION ACTIONS (SOMÁTICA) */}
              <div className="bg-app-card border border-app-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <div className="p-2 bg-amber-500/10 rounded-xl">
                    <Activity className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-white">3. Práctica de Descompresión Somática</h4>
                    <span className="text-[9px] text-gray-500 block">Liberación Física</span>
                  </div>
                </div>
                <div className="space-y-3 text-xs leading-relaxed text-gray-300">
                  <p>
                    Cuando note que su Máscara de Compensación se activa por estrés continuado, realice esta rutina neurofisiológica de desbloqueo:
                  </p>
                  <ul className="space-y-2.5 list-disc pl-4 text-[11px] text-gray-400">
                    {physicalProfile.id === 'flematico' && (
                      <>
                        <li><strong>Movimiento de Mandíbula y Cuello:</strong> Masajea fuertemente tus maseteros con nudillos tibios. Grita en tu automóvil cerrado con voz honda para soltar la ira tragada y acumulada en silencio.</li>
                        <li><strong>Ejercicios de rebote:</strong> Salta rítmicamente descalzo por 3 minutos para activar tu linfa y vaciar fluidos retenidos en articulaciones blandas.</li>
                      </>
                    )}
                    {physicalProfile.id === 'colerico' && (
                      <>
                        <li><strong>Válvula de Salida Cardiovascular:</strong> Exhala con soplidos largos y ruidosos relajando la garganta. Realiza estiramientos profundos laterales de columna para descontracturar tus cervicales rígidas de lucha.</li>
                        <li><strong>Soltar el Control:</strong> Deja tu agenda un día a la semana y camina sin rumbo, permitiendo que la casualidad guíe tu tarde.</li>
                      </>
                    )}
                    {physicalProfile.id === 'sanguineo' && (
                      <>
                        <li><strong>Respiración Abdominal Sostenida:</strong> Pon tu mano en el esternón y realiza 10 ciclos de respiración lenta de 4 tiempos reteniendo el aire, calmando el pulso acelerado.</li>
                        <li><strong>Faro Físico:</strong> Colócate peso (una almohada o saco de arena) en el bajo vientre estando recostado para bajar la excitación eléctrica superficial.</li>
                      </>
                    )}
                    {physicalProfile.id === 'melancolico' && (
                      <>
                        <li><strong>Calor en Hueso Sacro y Riñones:</strong> Aplícate compresas calientes con manzanilla o bolsas de semillas calientes en la espalda baja para aflojar la tensión fría y seca.</li>
                        <li><strong>Danza libre y desordenada:</strong> Muévete al son de música rítmica asimétrica con total desprecio por la estética perfecta, permitiendo que tus extremidades delgadas fluyan sin juicio racionalizador.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

            </div>
          </section>

        </main>
      </div>

      {/* FOOTER */}
      <footer className="py-6 px-8 flex flex-col sm:flex-row items-center justify-between bg-[#050505] border-t border-app-border gap-2 shrink-0 no-print text-[9px] uppercase tracking-[0.25em] text-gray-500 font-display">
        <span>© Auditoría de Biotipos</span>
        <span>Biocuántica e Integración Humana</span>
      </footer>
    </motion.div>
  );
}
