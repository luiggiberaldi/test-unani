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
  const size = 300;
  const center = size / 2;
  const maxRadius = center - 40; // Leave room for labels
  const numAxes = 6;
  const axesLabels = MODULES.map(m => m.name.split(' ')[1] || m.key); // Simplified names for chart

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
        // Find the module value. moduleScores is keyed by moduleId (m1, m2...)
        const val = result.moduleScores[m.id]?.[b] || 0;
        const { x, y } = getPoint(val, i);
        return `${x},${y}`;
      }).join(' ');

      // Only render polygons that have significant presence to avoid clutter,
      // but rendering all 4 with low opacity is also fine. Let's render all.
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
    <div className={cn("relative w-full aspect-square max-w-[400px] mx-auto", className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
        {/* Radar grid 
          Let's draw concentric pentagons/hexagons 
        */}
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
            strokeWidth={poly.biotype === result.dominant ? "2" : "1"}
            fillOpacity={poly.biotype === result.dominant ? "0.4" : "0.1"}
            className="transition-all duration-700 ease-in-out"
            {...(poly.biotype === result.dominant ? { className: "radar-value transition-all duration-700 ease-in-out" } : {})}
          />
        ))}

        {/* Labels */}
        {axes.map((axis, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          // Push labels out a bit
          const labelR = maxRadius + 20;
          const lx = center + labelR * Math.cos(angle);
          const ly = center + labelR * Math.sin(angle);
          
          return (
            <text
              key={`label-${i}`}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-medium fill-gray-500 uppercase tracking-[0.2em]"
            >
              {axis.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
