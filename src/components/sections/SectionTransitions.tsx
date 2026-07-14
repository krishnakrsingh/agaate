export function WaveTransition({ topColor = "#FFFFFF", bottomColor = "#F8FAF7" }: { topColor?: string; bottomColor?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none relative z-10" style={{ backgroundColor: topColor }}>
      <svg className="relative block w-full h-12 md:h-20" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path
          d="M0 0C320 80 640 100 960 60C1200 30 1360 80 1440 100V120H0V0Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

export function ArchTransition({ topColor = "#FFFFFF", bottomColor = "#F8FAF7" }: { topColor?: string; bottomColor?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none relative z-10" style={{ backgroundColor: topColor }}>
      <svg className="relative block w-full h-12 md:h-16" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
        <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" fill={bottomColor} />
      </svg>
    </div>
  );
}
