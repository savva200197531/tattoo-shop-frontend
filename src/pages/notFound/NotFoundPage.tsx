import React from 'react'
import { useNavigate } from 'react-router-dom'

import { StyledButton } from '../../components/StyledButtons'
import './styles.scss'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-main">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </div>

          <StyledButton fullWidth className="not-found-button" onClick={() => navigate(-1)}>вернуться на сайт</StyledButton>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
