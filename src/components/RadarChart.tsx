import { useMemo } from 'react';
import { Biotype, TestResult } from '../types';
import { MODULES } from '../data/biotypes';
import { cn } from '../lib/utils';

interface RadarChartProps {
  result: TestResult;
  className?: string;
}

const BIOTYPE_COLORS: Record<Biotype, string> = {
  colerico: '#f27d26',     // orange
  flematico: '#7c4dff',    // purple
  sanguineo: '#ff5252',    // red
  melancolico: '#00e676',  // green
};

export function RadarChart({ result, className }: RadarChartProps) {
  const size = 320; // slightly larger canvas to accommodate pushed labels
  const center = size / 2;
  const maxRadius = center - 55; // Pushed back further to give 55px padding for labels
  const numAxes = 6;
  
  const labelsMap: Record<string, string> = {
    fisico: 'Cuerpo',
    energia: 'Relación',
    accion: 'Motor',
    emocion: 'Vida',
    vinculo: 'Vínculo',
    adaptacion: 'Máscara',
  };
  const axesLabels = MODULES.map(m => labelsMap[m.key] || m.name);

  // Calculate coordinates for a point on a specific axis given a value (0-100)
  const getPoint = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const axes = useMemo(() => {
    return Array.from({ length: numAxes }).map((_, i) => {
      const { x, y } = getPoint(100, i);
      return { x, y, label: axesLabels[i] };
    });
  }, [axesLabels]);

  const polygons = useMemo(() => {
    const biotypes: Biotype[] = ['colerico', 'flematico', 'sanguineo', 'melancolico'];
    return biotypes.map(b => {
      const points = MODULES.map((m, i) => {
        const val = result.moduleScores[m.id]?.[b] || 0;
        const { x, y } = getPoint(val, i);
        return `${x},${y}`;
      }).join(' ');

      return {
        biotype: b,
        points,
        color: BIOTYPE_COLORS[b]
      };
    }).sort((a, b) => {
      // Draw dominant last so it's on top
      if (a.biotype === result.dominant) return 1;
      if (b.biotype === result.dominant) return -1;
      return 0;
    });
  }, [result]);

  return (
    <div className={cn("flex flex-col items-center w-full max-w-[400px] mx-auto", className)}>
      <div className="relative w-full aspect-square">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Radar grid */}
          {[25, 50, 75, 100].map(level => {
            const points = Array.from({ length: numAxes }).map((_, i) => {
              const { x, y } = getPoint(level, i);
              return `${x},${y}`;
            }).join(' ');
            
            return (
              <polygon 
                key={level} 
                points={points} 
                className="radar-grid" 
                strokeDasharray={level === 50 ? "4 4" : "0"}
              />
            );
          })}

          {/* Scale labels (percentages on top axis) */}
          {[25, 50, 75, 100].map(level => {
            const { x, y } = getPoint(level, 0); // straight up
            return (
              <text
                key={`scale-${level}`}
                x={x + 6}
                y={y}
                className="text-[8px] font-mono font-medium fill-gray-600 no-print select-none"
                textAnchor="start"
                dominantBaseline="middle"
              >
                {level}%
              </text>
            );
          })}

          {/* Axes lines */}
          {axes.map((axis, i) => (
            <line 
              key={i} 
              x1={center} 
              y1={center} 
              x2={axis.x} 
              y2={axis.y} 
              className="radar-grid"
            />
          ))}

          {/* Polygons */}
          {polygons.map((poly) => (
            <polygon
              key={poly.biotype}
              points={poly.points}
              fill={poly.color}
              stroke={poly.color}
              strokeWidth={poly.biotype === result.dominant ? "2.5" : (poly.biotype === result.secondary ? "1.2" : "0.5")}
              fillOpacity={poly.biotype === result.dominant ? "0.35" : (poly.biotype === result.secondary ? "0.12" : "0.02")}
              className="transition-all duration-700 ease-in-out"
              {...(poly.biotype === result.dominant ? { className: "radar-value transition-all duration-700 ease-in-out" } : {})}
            />
          ))}

          {/* Labels */}
          {axes.map((axis, i) => {
            const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
            const labelR = maxRadius + 16; // Push out from grid edge
            const lx = center + labelR * Math.cos(angle);
            const ly = center + labelR * Math.sin(angle);
            
            // Dynamic textAnchor and vertical offset to completely prevent overlap
            let textAnchor = 'middle';
            let dy = '0.35em';
            
            if (Math.cos(angle) > 0.1) {
              textAnchor = 'start';
            } else if (Math.cos(angle) < -0.1) {
              textAnchor = 'end';
            }
            
            if (i === 0) {
              dy = '-0.6em'; // Move up for CUERPO
            } else if (i === 3) {
              dy = '1.2em';  // Move down for VIDA
            }
            
            return (
              <text
                key={`label-${i}`}
                x={lx}
                y={ly}
                textAnchor={textAnchor}
                dy={dy}
                className="text-[9px] font-semibold fill-gray-400 uppercase tracking-[0.15em] select-none"
              >
                {axis.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-[9px] uppercase tracking-wider font-semibold text-gray-500 no-print select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f27d26]" />
          <span>Fuego (Colérico)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7c4dff]" />
          <span>Agua (Flemático)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5252]" />
          <span>Aire (Sanguíneo)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
          <span>Tierra (Melancólico)</span>
        </div>
      </div>
    </div>
  );
}
