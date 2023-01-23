import React from 'react'
import classNames from 'classnames'
import { ListItem } from '../types/list-item'

type Props = {
  listItems: ListItem[]
  className?: string
}

const RenderList: React.FC<Props> = ({ listItems, className }) => {
  return (
    <ul className={classNames('render-list', className)}>
      {
        listItems.map(({ element, ...rest }, index) => (
          <li key={index} className="render-list__item" {...rest}>{element}</li>
        ))
      }
    </ul>
  )
}

export default RenderList
