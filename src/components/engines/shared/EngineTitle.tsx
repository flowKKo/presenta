import { colors, motionConfig } from '../../../theme/swiss'
import EditableText from '../../editor/EditableText'

interface EngineTitleProps {
  title: string
  body?: string
  titleSize?: number
  bodySize?: number
  titleColor?: string
  textColor?: string
}

export default function EngineTitle({ title, body, titleSize, bodySize, titleColor, textColor }: EngineTitleProps) {
  return (
    <div>
      <EditableText
        value={title}
        field="title"
        as="h2"
        className="text-4xl font-bold"
        style={{ color: titleColor || colors.textPrimary, fontSize: titleSize }}
        variants={motionConfig.child}
      />
      {body && (
        <EditableText
          value={body}
          field="body"
          as="p"
          className="text-lg mt-2"
          style={{ color: textColor || colors.textSecondary, fontSize: bodySize }}
          variants={motionConfig.child}
        />
      )}
    </div>
  )
}
