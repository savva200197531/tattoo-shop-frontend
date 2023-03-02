import React from 'react'
import { StyledButton } from '../../components/StyledButtons'

const CreateButton: React.FC<any> = props => {
  return <StyledButton fullWidth style={{ marginBottom: 20 }} {...props}>Создать</StyledButton>
}

export default CreateButton
