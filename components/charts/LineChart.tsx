interface LineChartProps {
    data: { label: string; value: number }[]
    color?: string
    height?: number
}

export function LineChart({ data, color = '#8b5cf6', height = 200 }: LineChartProps) {
    if (data.length === 0) {
        return <div className="text-text-muted text-sm text-center py-8">No hay datos disponibles</div>
    }

    const maxValue = Math.max(...data.map(d => d.value), 1)
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1 || 1)) * 100,
        y: 100 - (d.value / maxValue) * 80 // 80% max height for padding
    }))

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    const areaD = `M 0 100 ${pathD} L 100 100 Z`

    return (
        <div className="relative" style={{ height: `${height}px` }}>
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="line-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0.05" />
                    </linearGradient>
                </defs>

                {/* Area fill */}
                <path d={areaD} fill="url(#line-gradient)" />

                {/* Line */}
                <path d={pathD} fill="none" stroke={color} strokeWidth="0.5" />

                {/* Points */}
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="1" fill={color} />
                ))}
            </svg>

            {/* Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[10px] text-text-muted">
                {data.map((d, i) => (
                    <span key={i} className={i % Math.ceil(data.length / 5) === 0 ? '' : 'invisible'}>{d.label}</span>
                ))}
            </div>
        </div>
    )
}
