import React from 'react'
import './styles.scss'
import classNames from 'classnames'

type Props = {
  isActive: boolean
}

const Hamburger: React.FC<Props> = ({ isActive }) => {
  return (
    <div className={classNames('hamburger', { 'is-active': isActive })} id="hamburger-1">
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </div>
  )
}

export default Hamburger
