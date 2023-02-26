import React from 'react'
import './styles.scss'

export type ListOption = {
  title: string
  text: string | number
}

type Props = {
  options: ListOption[]
}

const ListWithTitle: React.FC<Props> = ({ options }) => {
  return (
    <div className="list-with-title">
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
