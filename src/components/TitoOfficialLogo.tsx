import React from 'react';

interface TitoOfficialLogoProps {
  variant?: 'emblem' | 'full' | 'horizontal' | 'badge';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const TitoOfficialLogo: React.FC<TitoOfficialLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  // Dimensions mapping
  const sizeMap = {
    xs: { h: 'h-7', iconH: 26, font: 'text-sm' },
    sm: { h: 'h-9', iconH: 34, font: 'text-base' },
    md: { h: 'h-11', iconH: 42, font: 'text-xl' },
    lg: { h: 'h-16', iconH: 64, font: 'text-3xl' },
    xl: { h: 'h-24', iconH: 96, font: 'text-5xl' },
  };

  const currentSize = sizeMap[size];

  // Pure SVG Emblem accurately matching the user uploaded logo:
  // Top horizontal bar split with white left facet + sharp red diagonal slash + 3D stem
  const Emblem = ({ height = 40 }: { height?: number }) => (
    <svg
      viewBox="0 0 160 160"
      height={height}
      width={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-[0_2px_10px_rgba(220,38,38,0.4)]"
    >
      {/* Background square container (subtle rounded black) */}
      <rect width="160" height="160" rx="16" fill="#000000" />
      
      {/* Top Left White Wing */}
      <polygon points="34,42 90,42 66,74 34,74" fill="#ffffff" />
      
      {/* Vertical 3D Stem - Front Face Pure White */}
      <polygon points="68,82 100,82 100,126 84,138 68,138" fill="#ffffff" />
      
      {/* Vertical 3D Stem - Right Facet Shading */}
      <polygon points="100,82 100,126 90,134 90,88" fill="#e4e4e7" opacity="0.35" />

      {/* Red Dynamic Slash / Upper Arm & Cross Cutting Through (Matches exact logo) */}
      <polygon points="26,24 136,24 116,52 94,52" fill="#dc2626" />
      <polygon points="136,24 116,52 46,122 46,104 94,52" fill="#dc2626" />
      <polygon points="26,24 136,24 114,54 84,54 46,116 46,102 84,46 44,46" fill="#dc2626" />
    </svg>
  );

  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem height={currentSize.iconH} />
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 p-1.5 px-3 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl ${className}`}>
        <Emblem height={currentSize.iconH} />
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-0.5 tracking-tight font-black leading-none">
            <span className="text-red-600 font-sans">T</span>
            <span className="text-white font-sans">ITO</span>
            <span className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase mr-1 border-r border-red-600/60 pr-1">
              STORE
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[9px] text-neutral-400 font-semibold tracking-wider mt-0.5">
              POWERED BY <strong className="text-red-500 font-black">ZEUS</strong>
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3.5 ${className}`}>
        <Emblem height={currentSize.iconH} />
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1 font-black tracking-wider leading-none">
            <span className="text-red-600 font-mono text-2xl">T</span>
            <span className="text-white font-mono text-2xl">ITO</span>
            <span className="text-xs text-white font-mono tracking-widest px-2 py-0.5 bg-red-600/20 border border-red-600/40 rounded mr-2">
              STORE
            </span>
          </div>
          {showSubtitle && (
            <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-400 font-bold">
              <span>POWERED BY <span className="text-red-500 font-black">ZEUS</span></span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-300">CHEVROLET | OPEL | MG | ESPERANZA</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full Variant (Stacked as in the official logo image)
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative p-2 rounded-2xl bg-black border border-neutral-800 shadow-2xl">
        <Emblem height={currentSize.iconH * 1.5} />
      </div>
      <div className="mt-2 flex items-center justify-center font-black tracking-wider leading-none">
        <span className="text-red-600 font-sans text-2xl sm:text-3xl">T</span>
        <span className="text-white font-sans text-2xl sm:text-3xl">ITO</span>
      </div>
      {showSubtitle && (
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-0.5 bg-red-600 rounded" />
          <span className="text-[11px] font-black tracking-widest text-white uppercase">STORE</span>
          <div className="w-5 h-0.5 bg-red-600 rounded" />
        </div>
      )}
    </div>
  );
};
