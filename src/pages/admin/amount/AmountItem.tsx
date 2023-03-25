import React from 'react'

import IconButton from '@mui/material/IconButton'

import Svg from '../../../components/Svg/Svg'
import StyledModal from '../../../components/StyledModal/StyledModal'
import StyledDialog from '../../../components/StyledDialog/StyledDialog'
import AmountForm, { AmountInput } from './AmountForm'
import { useAmount } from '../../../contexts/productsFilters/AmountContext/AmountContext'
import { Amount } from '../../../contexts/productsFilters/AmountContext/types'

type Props = {
  amount: Amount
  loadAmounts: () => void
}

const AmountItem: React.FC<Props> = ({ amount, loadAmounts }) => {
  const { deleteAmount, editAmount } = useAmount()

  const handleSubmit = (data: AmountInput) => {
    return editAmount(amount.id, data)
      .then(() => loadAmounts())
      .catch(error => {
        console.log(error)
      })
  }

  const handleDeleteAmount = () => {
    deleteAmount(amount.id)
      .then(() => loadAmounts())
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="base-admin-item">
      {amount.name}

      <StyledModal
        icon={
          <IconButton type="button" sx={{ p: '6px' }}>
            <Svg id="pencil" width={30} height={30}/>
          </IconButton>
        }
        title="Редактировать обьем"
      >
        <AmountForm record={amount} onSubmit={handleSubmit} title="Редактировать обьем" buttonTitle="Сохранить"/>
      </StyledModal>

      <StyledDialog
        icon={
          <IconButton className="product-item__delete" type="button" sx={{ p: '6px' }}>
            <Svg id="trash" width={30} height={30}/>
          </IconButton>
        }
        title="Удалить обьем"
        text="Вы точно хотите удалить обьем?"
        handleSubmit={handleDeleteAmount}
      />
    </div>
  )
}

export default AmountItem
