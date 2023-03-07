import React from 'react'
import { useNavigate } from 'react-router-dom'

import { StyledButton } from '../../components/StyledButtons'
import circleSrc from '../../assets/images/circle.png'
import './styles.scss'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-main">
            <span>4</span>
            <img className="not-found-img" src={circleSrc} alt=""/>
            <span>4</span>
          </div>

          <StyledButton fullWidth className="not-found-button" onClick={() => navigate(-1)}>вернуться на сайт</StyledButton>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
