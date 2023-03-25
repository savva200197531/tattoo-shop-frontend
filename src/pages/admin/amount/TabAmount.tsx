import React, { useEffect, useState } from 'react'

import Spinner from '../../../components/Spinner/Spinner'
import AmountItem from './AmountItem'
import StyledModal from '../../../components/StyledModal/StyledModal'
import AmountForm, { AmountInput } from './AmountForm'
import CreateButton from '../CreateButton'
import './styles.scss'
import { useAmount } from '../../../contexts/productsFilters/AmountContext/AmountContext'
import { Amount } from '../../../contexts/productsFilters/AmountContext/types'

const TabAmount: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [amounts, setAmounts] = useState<Amount[]>([])

  const { getAmounts, createAmount } = useAmount()

  const handleSubmit = (data: AmountInput) => {
    return createAmount(data)
      .then(() => loadAmounts())
      .catch(error => {
        console.log(error)
      })
  }

  const loadAmounts = () => {
    setLoading(true)

    getAmounts()
      .then(data => setAmounts(data))
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadAmounts()
  }, [])

  return (
    <>
      <StyledModal
        icon={<CreateButton />}
        title="Создать обьем"
      >
        <AmountForm onSubmit={handleSubmit} title="Создать обьем" buttonTitle="Создать"/>
      </StyledModal>

      {loading ? <Spinner/> : (
        <div className="base-admin-items">{amounts.map(amount => <AmountItem key={amount.id} amount={amount} loadAmounts={loadAmounts} />)}</div>
      )}
    </>
  )
}

export default TabAmount
