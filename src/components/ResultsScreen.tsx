import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { track } from '../lib/analytics';
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
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';
import { TestResult, Biotype } from '../types';
import { BIOTYPES, MIXED_PROFILES } from '../data/biotypes';
import { RadarChart } from './RadarChart';
import { Logo } from './Logo';

function getDimensionLeader(
  moduleScores: Record<string, Record<Biotype, number>>,
  moduleIds: string[]
): Biotype {
  const combined: Record<Biotype, number> = { colerico: 0, flematico: 0, sanguineo: 0, melancolico: 0 };
  moduleIds.forEach(id => {
    if (moduleScores && moduleScores[id]) {
      (['colerico', 'flematico', 'sanguineo', 'melancolico'] as Biotype[]).forEach(b => {
        combined[b] += moduleScores[id][b] || 0;
      });
    }
  });
  return (['colerico', 'flematico', 'sanguineo', 'melancolico'] as Biotype[])
    .reduce((a, b) => combined[a] >= combined[b] ? a : b);
}

export function ResultsScreen({ result, onRestart }: { result: TestResult, onRestart: () => void, key?: string }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    track('results_viewed', {
      dominant: result.dominant,
      secondary: result.secondary ?? 'none',
      isMixed: result.isMixed
    });
  }, []);

  const domProfile = BIOTYPES[result.dominant];
  const secProfile = result.secondary ? BIOTYPES[result.secondary] : null;
  const physicalProfile = BIOTYPES[result.physicalBiotype];
  const behavioralProfile = BIOTYPES[result.behavioralBiotype];

  const mixedKey = result.secondary 
    ? `${result.dominant}-${result.secondary}` 
    : null;
  const mixedProfile = mixedKey && MIXED_PROFILES[mixedKey] 
    ? MIXED_PROFILES[mixedKey] 
    : (result.secondary && MIXED_PROFILES[`${result.secondary}-${result.dominant}`] 
      ? MIXED_PROFILES[`${result.secondary}-${result.dominant}`] 
      : null);

  const handlePrint = () => {
    track('result_exported', { dominant: result.dominant });
    window.print();
  };

  const shareText = `Mi Biotipo Dominante es ${domProfile.name} ${domProfile.symbol}${secProfile ? ` con mezcla de ${secProfile.name}` : ''}. Coherencia Orgánica: ${result.consistencyScore}%. ¡Descubre el tuyo aquí!`;
  const shareUrl = typeof window !== 'undefined' ? (window.location.origin + window.location.pathname) : '';

  const handleShareClick = async () => {
    track('result_shared', { dominant: result.dominant });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Auditoría de Biotipo RGP',
          text: shareText,
          url: shareUrl,
        });
        track('result_shared_native', { dominant: result.dominant });
      } catch (e) {
        setIsShareOpen(true);
      }
    } else {
      setIsShareOpen(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      track('result_link_copied', { dominant: result.dominant });
    } catch (err) {
      console.error('Failed to copy!', err);
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
          <button onClick={handleShareClick} className="px-3.5 py-1.5 border border-white/15 rounded-full text-[11px] hover:bg-white/5 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer">
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
                <div className="bg-white/5 p-3.5 rounded-xl text-left border border-white/5">
                  <span className="text-[9px] uppercase text-gray-500 block mb-1">Motor de Gasto</span>
                  <span className="text-xs font-normal block text-gray-300 leading-relaxed">{domProfile.energy}</span>
                </div>
                <div className="bg-white/5 p-3.5 rounded-xl text-left border border-white/5">
                  <span className="text-[9px] uppercase text-gray-500 block mb-1 font-display">Fuerza Interior</span>
                  <span className="text-xs font-normal block text-gray-300 leading-relaxed">{domProfile.emotional}</span>
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

          {/* MEJORA 2 - BLOQUE DE PERFIL MIXTO EN UI */}
          {result.isMixed && result.secondary && mixedProfile && (
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-amber-500/5 to-amber-600/5 border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-amber-500/5"
            >
              <div className="absolute right-4 -bottom-8 text-9xl opacity-5 pointer-events-none select-none">
                🔱
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[9px] font-extrabold tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">
                    Perfil Mixto Detectado
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase font-display">
                    {mixedProfile.title || (mixedProfile as any).name}
                  </h3>
                  <p className="text-xs text-amber-500/80 font-bold uppercase tracking-wider mt-1 flex items-center gap-2">
                    <span>{domProfile.symbol} {domProfile.id}</span>
                    <span className="text-gray-600 font-normal">+</span>
                    <span>{secProfile?.symbol} {secProfile?.id}</span>
                  </p>
                </div>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-4xl font-light">
                  {mixedProfile.text || (mixedProfile as any).description}
                </p>

                {/* Porcentajes: barra visual mostrando dominant% vs secondary% */}
                <div className="pt-2 max-w-lg space-y-2">
                  <div className="flex justify-between text-xs text-gray-400 font-mono">
                    <span className="capitalize">{domProfile.symbol} {domProfile.id}: {result.totalScores[result.dominant]}%</span>
                    <span className="capitalize">{secProfile?.symbol} {secProfile?.id}: {result.secondary ? result.totalScores[result.secondary] : 0}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 flex">
                    <div 
                      style={{ width: `${result.totalScores[result.dominant]}%` }}
                      className="h-full bg-amber-500 rounded-l-full"
                    />
                    <div 
                      style={{ width: `${result.secondary ? result.totalScores[result.secondary] : 0}%` }}
                      className="h-full bg-violet-400 rounded-r-full"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-gray-500 italic mt-1">
                  * Una diferencia de {Math.abs(result.totalScores[result.dominant] - (result.secondary ? result.totalScores[result.secondary] : 0)).toFixed(0)} puntos indica alta integración entre ambos elementos.
                </p>
              </div>
            </motion.section>
          )}

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

          {/* MEJORA 1 — SECCIÓN "POR QUÉ SALIÓ TU RESULTADO" */}
          {(() => {
            const leaderPhysical = getDimensionLeader(result.moduleScores, ['m1', 'm2']);
            const leaderEnergy = getDimensionLeader(result.moduleScores, ['m3']);
            const leaderEmotional = getDimensionLeader(result.moduleScores, ['m4']);
            const leaderRelational = getDimensionLeader(result.moduleScores, ['m5', 'm6']);

            const physicalPhrases = {
              colerico: "porque tus respuestas sobre estructura corporal, digestión reactiva y susceptibilidad térmica fueron consistentemente calientes y secas.",
              flematico: "porque tus respuestas sobre fisionomía suave, propensión a retención hídrica y susceptibilidad al frío fueron consistentemente frías y húmedas.",
              sanguineo: "porque tus respuestas sobre fisionomía muscularizada, transpiración ágil y susceptibilidad al calor húmedo fueron consistentemente el perfil de Aire.",
              melancolico: "porque tus respuestas sobre fisionomía delgada, piel seca y susceptibilidad al frío seco correspondieron consistentemente al elemento Tierra."
            };

            const energyPhrases = {
              colerico: "toma de acción rápida, orientación firme a resultados claros, dirección asertiva y liderazgo ejecutivo con alta resiliencia.",
              flematico: "acción pausada que prioriza la concordia y busca sostener el bienestar de su entorno de forma gradual y estable.",
              sanguineo: "energía dinámica y relacional de alta velocidad, activada prioritariamente bajo el estímulo de la conexión humana viva.",
              melancolico: "conducción interna racional y reservada, con ciclos alternados de intensa concentración y foco profundo solitario."
            };

            const emotionalPhrases = {
              colerico: "racionalización del dolor emocional, rechazo activo a mostrar vulnerabilidad y resolución pragmática de tensiones.",
              flematico: "profundidad emocional sutil, sensibilidad empática resguardada y una gran lealtad vinculante pero de lenta exteriorización.",
              sanguineo: "expresión emocional libre, expansiva y espontánea, caracterizada por una rápida capacidad de recuperación y ligereza.",
              melancolico: "sentir duradero, íntimo y minucioso, propenso a la introspección analítica profunda y a la sintonía afectiva refinada."
            };

            const relationalPhrases = {
              colerico: "búsqueda de respeto genuino y objetivos compartidos, con baja tolerancia a la ineficiencia o a los rodeos sentimentales.",
              flematico: "entrega afectiva leal, fomento del acuerdo conciliador y una tendencia adaptativa a absorber tensiones del entorno.",
              sanguineo: "búsqueda constante de libertad expansiva, chispas lúdicas creativas y nutrición de vínculos amplios.",
              melancolico: "vínculos muy selectivos, exigencia implícita de sintonía intelectual fina y un anhelo de comprensión exclusiva."
            };

            const getLeftBorderColor = (b: Biotype) => {
              switch (b) {
                case 'colerico': return 'border-l-orange-500';
                case 'flematico': return 'border-l-violet-400';
                case 'sanguineo': return 'border-l-red-500';
                case 'melancolico': return 'border-l-emerald-400';
              }
            };

            const diffScore = result.secondary ? Math.abs(result.totalScores[result.dominant] - result.totalScores[result.secondary]) : 0;

            const dimensionCards = [
              {
                id: 'physical',
                title: 'Dimensión Física (Hardware)',
                icon: <Fingerprint className="w-5 h-5 text-amber-500" />,
                leader: leaderPhysical,
                profile: BIOTYPES[leaderPhysical],
                text: `Tu patrón físico apunta al biotipo ${BIOTYPES[leaderPhysical].id} ${physicalPhrases[leaderPhysical]}`
              },
              {
                id: 'energy',
                title: 'Dimensión Energética (Motor Interno)',
                icon: <Zap className="w-5 h-5 text-amber-500" />,
                leader: leaderEnergy,
                profile: BIOTYPES[leaderEnergy],
                text: `Tu motor interno y forma de actuar refleja el patrón ${BIOTYPES[leaderEnergy].id}: ${energyPhrases[leaderEnergy]}`
              },
              {
                id: 'emotional',
                title: 'Dimensión Emocional (Mundo Interior)',
                icon: <Heart className="w-5 h-5 text-amber-500" />,
                leader: leaderEmotional,
                profile: BIOTYPES[leaderEmotional],
                text: `Tu mundo emocional se alinea con ${BIOTYPES[leaderEmotional].id}: ${emotionalPhrases[leaderEmotional]}`
              },
              {
                id: 'relational',
                title: 'Dimensión Relacional y Adaptativa',
                icon: <UserCheck className="w-5 h-5 text-amber-500" />,
                leader: leaderRelational,
                profile: BIOTYPES[leaderRelational],
                text: `En vínculos y adaptación predomina ${BIOTYPES[leaderRelational].id}: ${relationalPhrases[leaderRelational]}`
              }
            ];

            if (result.isMixed && result.secondary) {
              dimensionCards.push({
                id: 'mixed_why',
                title: 'Simetría de Elementos (Perfil Mixto)',
                icon: <Layers className="w-5 h-5 text-amber-400" />,
                leader: result.secondary,
                profile: BIOTYPES[result.secondary],
                text: `Tu mezcla con ${result.secondary} aparece porque la diferencia entre ambos biotipos es de solo ${diffScore.toFixed(0)} puntos. Esto es frecuente y significa que tienes acceso natural a las fortalezas de ambos elementos.`
              });
            }

            return (
              <section className="space-y-6 pt-4 card-stagger-container">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase font-display tracking-tight text-white flex items-center gap-2">
                    <Compass className="w-6 h-6 text-amber-500" /> Por qué salió este resultado
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Basado en tus respuestas reales por dimensión
                  </p>
                </div>

                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {dimensionCards.map((card) => (
                    <motion.div
                      key={card.id}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                      }}
                      className={`bg-app-card border border-app-border border-l-4 ${getLeftBorderColor(card.leader)} rounded-2xl p-5 relative overflow-hidden shadow-md flex flex-col justify-between`}
                    >
                      <div className="absolute -right-3 -top-3 text-7xl opacity-[0.03] pointer-events-none select-none">
                        {card.profile.symbol}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <div className="flex items-center gap-2">
                            {card.icon}
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200">
                              {card.title}
                            </h4>
                          </div>
                          <span className="text-xs shrink-0 font-bold bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5 text-amber-300">
                            {card.profile.symbol} {card.leader}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed font-light">
                          {card.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            );
          })()}

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

      {/* SHARE MODAL */}
      <AnimatePresence>
        {isShareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm no-print">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setIsShareOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-md bg-[#0c0c0c] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden z-10"
            >
              {/* Background Glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <h3 className="text-base font-semibold text-white tracking-wide uppercase font-display flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-amber-500" />
                  Compartir Resultados
                </h3>
                <button 
                  onClick={() => setIsShareOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer text-lg font-light w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/5"
                >
                  &times;
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Comparte tu auditoría de biotipo RGP en tus redes sociales profesionales o copia el enlace de acceso directo.
                </p>

                {/* Preview Box */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-left space-y-1 relative">
                  <span className="text-[9px] uppercase tracking-wider text-amber-500 font-bold">Resumen del resultado</span>
                  <div className="text-sm font-semibold text-white capitalize flex items-center gap-1.5">
                    <span>{domProfile.symbol}</span>
                    <span>Biotipo Dominante: {domProfile.id}</span>
                  </div>
                  {secProfile && (
                    <div className="text-xs text-gray-400 capitalize font-medium">
                      Mezcla secundaria: {secProfile.symbol} {secProfile.id}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 font-medium">
                    Coherencia Orgánica: <strong className="text-amber-400">{result.consistencyScore}%</strong>
                  </div>
                </div>

                {/* Direct Link Copy */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">Enlace de acceso directo</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={shareUrl} 
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-amber-500/50 select-all"
                    />
                    <button 
                      onClick={copyToClipboard}
                      className="px-4 py-2 gold-gradient hover:opacity-90 text-black font-semibold text-xs rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          ¡Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Social Buttons Grid */}
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block">Compartir en Redes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* LinkedIn */}
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => track('result_shared_network', { network: 'linkedin', dominant: result.dominant })}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-[#0a66c2]/20 bg-[#0a66c2]/5 hover:bg-[#0a66c2]/10 text-white font-medium text-xs transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current text-[#0a66c2]" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>

                    {/* Twitter / X */}
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => track('result_shared_network', { network: 'twitter', dominant: result.dominant })}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium text-xs transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Twitter / X
                    </a>

                    {/* WhatsApp */}
                    <a 
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => track('result_shared_network', { network: 'whatsapp', dominant: result.dominant })}
                      className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-[#25d366]/20 bg-[#25d366]/5 hover:bg-[#25d366]/10 text-white font-medium text-xs transition-colors col-span-2"
                    >
                      <svg className="w-4 h-4 fill-current text-[#25d366]" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 1.977 14.113.953 11.5.953c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.463 3.39 1.337 4.842l-.994 3.63 3.714-.973zm12.338-7.516c-.272-.136-1.61-.795-1.86-.886-.25-.09-.432-.136-.613.136-.182.273-.705.886-.864 1.068-.159.182-.318.204-.59.068-.273-.136-1.15-.424-2.19-1.353-.809-.721-1.355-1.614-1.514-1.886-.159-.273-.017-.42.12-.556.123-.122.272-.318.409-.477.136-.159.182-.272.272-.454.09-.181.045-.34-.023-.477-.068-.136-.613-1.477-.84-2.023-.222-.534-.485-.46-.662-.46-.17-.008-.367-.01-.563-.01-.197 0-.516.074-.787.374-.27.301-1.033 1.01-1.033 2.463 0 1.453 1.056 2.859 1.203 3.057.148.198 2.08 3.175 5.038 4.453.704.304 1.254.486 1.681.622.709.226 1.354.194 1.864.118.568-.084 1.61-.659 1.834-1.295.224-.636.224-1.181.157-1.295-.067-.114-.249-.205-.521-.341z"/>
                      </svg>
                      Compartir por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
