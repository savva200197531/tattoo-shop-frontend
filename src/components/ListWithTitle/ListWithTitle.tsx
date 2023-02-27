import React from 'react'
import './styles.scss'
import classNames from 'classnames'

export type ListOption = {
  title: string
  text: any
}

type Props = {
  options: ListOption[]
  className?: string
  style?: React.CSSProperties
}

const ListWithTitle: React.FC<Props> = ({ options, className, style }) => {
  return (
    <div className={classNames('list-with-title', className)} style={style}>
      {options.map((option, index) => (
        <div key={index} className="list-with-title__option">
          <p className="list-with-title__option-title">{option.title}:</p>
          <p className="list-with-title__option-text">{option.text}</p>
        </div>
      ))}
    </div>
  )
}

export default ListWithTitle
