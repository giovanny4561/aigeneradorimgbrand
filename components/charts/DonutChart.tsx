interface DonutChartProps {
    data: { label: string; value: number; color: string }[]
    size?: number
}

export function DonutChart({ data, size = 180 }: DonutChartProps) {
    if (data.length === 0) {
        return <div className="text-text-muted text-sm text-center py-8">No hay datos disponibles</div>
    }

    const total = data.reduce((sum, d) => sum + d.value, 0)
    const radius = 40
    const strokeWidth = 12
    const centerX = 50
    const centerY = 50

    let currentAngle = -90 // Start from top

    const slices = data.map(item => {
        const percentage = item.value / total
        const angle = percentage * 360
        const startAngle = currentAngle
        const endAngle = currentAngle + angle

        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180

        const x1 = centerX + radius * Math.cos(startRad)
        const y1 = centerY + radius * Math.sin(startRad)
        const x2 = centerX + radius * Math.cos(endRad)
        const y2 = centerY + radius * Math.sin(endRad)

        const largeArcFlag = angle > 180 ? 1 : 0

        const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

        currentAngle = endAngle

        return {
            ...item,
            pathD,
            percentage: Math.round(percentage * 100)
        }
    })

    return (
        <div className="flex flex-col items-center gap-4">
            <svg width={size} height={size} viewBox="0 0 100 100">
                {/* Donut slices */}
                {slices.map((slice, i) => (
                    <path
                        key={i}
                        d={slice.pathD}
                        fill={slice.color}
                        className="transition-all hover:opacity-80"
                    />
                ))}

                {/* White center hole */}
                <circle cx={centerX} cy={centerY} r={radius - strokeWidth} fill="white" />

                {/* Center text */}
                <text
                    x={centerX}
                    y={centerY + 2}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-text-main"
                >
                    {total}
                </text>
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 justify-center">
                {slices.map((slice, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: slice.color }} />
                        <span className="text-xs text-text-muted">
                            {slice.label}: {slice.percentage}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
