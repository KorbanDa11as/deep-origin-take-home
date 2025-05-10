import "./value-render.css"

const CrossIcon = () => <svg style={{ lineHeight: 1, stroke: "currentcolor", fill: "currentcolor", width: '14px', height: '14', alignSelf: 'center' }} viewBox="0 0 20 20" >
  <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
</svg>
export function ValueRender({ label, value, image, removeHandler }: { label: string, value: any, image?: any, removeHandler: (value: any) => void }) {
  return <span className="value-container" style={{ display: 'inline-flex', height: '20px' }}>
    <span className="label">
      {label}
    </span>
    <span className="remove-icon " onClick={() => removeHandler(value)} style={{ alignContent: 'flex-end' }}>
      <CrossIcon />
    </span>
  </span>

}
