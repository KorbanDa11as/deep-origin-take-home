import { MouseEventHandler, ReactElement, useMemo } from "react"
import "./value-render.css"
const colorPairs = [
  { background: '#1A1A1A', text: '#FFFFFF' },
  { background: '#F5F5F5', text: '#222222' },
  { background: '#0D47A1', text: '#FFFFFF' },
  { background: '#FFC107', text: '#000000' },
  { background: '#4CAF50', text: '#FFFFFF' },
  { background: '#9C27B0', text: '#FFFFFF' },
  { background: '#FF5722', text: '#FFFFFF' },
  { background: '#00BCD4', text: '#000000' },
  { background: '#E91E63', text: '#FFFFFF' },
  { background: '#607D8B', text: '#FFFFFF' },
];
export function DefaultAvatar(label: string) {
  const randomColorPair = useMemo(() => colorPairs[Math.floor(Math.random() * (colorPairs.length - .9))], [label])
  const abbrev = label.split(' ').map(word => word[0]).join('').toLocaleUpperCase()
  return <span className='fallback-avatar' style={{ backgroundColor: randomColorPair.background, color: randomColorPair.text }}>{abbrev}</span>
}
function CrossIcon() {
  return <svg style={{ lineHeight: 1, stroke: "currentcolor", fill: "currentcolor", width: '14px', height: '14', alignSelf: 'center' }} viewBox="0 0 20 20" >
    <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
  </svg>
}


export function ValueRender({ label, value, avatar = DefaultAvatar(label), removeHandler }: { label: string, value: any, avatar?: ReactElement, removeHandler: MouseEventHandler<HTMLDivElement> | undefined }) {
  return <span className="value-container" style={{ display: 'inline-flex', height: '20px' }}>
    {avatar}
    < span className="label" >
      {label}
    </span >
    <span className="remove-icon " onClick={() => removeHandler && removeHandler(value)} style={{ alignContent: 'flex-end' }}>
      <CrossIcon />
    </span>
  </span >

}
