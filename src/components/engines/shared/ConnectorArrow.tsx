import { colors } from '../../../theme/swiss'

interface ConnectorArrowProps {
  direction?: 'horizontal' | 'vertical'
  variant?: 'arrow' | 'dot' | 'dashed' | 'capsule'
  color?: string
  size?: number
}

export default function ConnectorArrow({
  direction = 'horizontal',
  variant = 'arrow',
  color = colors.accentNeutral,
  size = 32,
}: ConnectorArrowProps) {
  const isH = direction === 'horizontal'

  if (variant === 'dot') {
    return (
      <div className={`flex items-center justify-center ${isH ? '' : 'rotate-90'}`} style={{ width: isH ? size : 8, height: isH ? 8 : size }}>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      </div>
    )
  }

  if (variant === 'dashed') {
    return (
      <div className="flex items-center justify-center" style={{ width: isH ? size : 2, height: isH ? 2 : size }}>
        <div
          className="w-full h-full"
          style={{
            borderTop: isH ? `2px dashed ${color}` : 'none',
            borderLeft: !isH ? `2px dashed ${color}` : 'none',
          }}
        />
      </div>
    )
  }

  if (variant === 'capsule') {
    return (
      <div className="flex items-center justify-center" style={{ width: isH ? size : 16, height: isH ? 16 : size }}>
        <div className="rounded-full" style={{ width: isH ? size : 6, height: isH ? 6 : size, backgroundColor: color, opacity: 0.3 }} />
      </div>
    )
  }

  // arrow (default)
  return (
    <svg
      width={isH ? size : 12}
      height={isH ? 12 : size}
      viewBox={isH ? `0 0 ${size} 12` : `0 0 12 ${size}`}
      fill="none"
      className="shrink-0"
    >
      {isH ? (
        <>
          <line x1="0" y1="6" x2={size - 6} y2="6" stroke={color} strokeWidth="2" />
          <polygon points={`${size},6 ${size - 8},2 ${size - 8},10`} fill={color} />
        </>
      ) : (
        <>
          <line x1="6" y1="0" x2="6" y2={size - 6} stroke={color} strokeWidth="2" />
          <polygon points={`6,${size} 2,${size - 8} 10,${size - 8}`} fill={color} />
        </>
      )}
    </svg>
  )
}
