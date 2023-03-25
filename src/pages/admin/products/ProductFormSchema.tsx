import React from 'react'
import FormInputText from '../../../components/FormInputs/Text/FormInputText'
import FormInputNumber from '../../../components/FormInputs/Text/FormInputNumber'
import { Category } from '../../../contexts/productsFilters/CategoriesContext/types'

type Props = {
  category: Category | undefined
}

type SchemaConfig = {
  type: 'text' | 'number'
  label: string
  name: string
  key: 'isColor' | 'isAmount' | 'isQuantity'
}

const schemaConfig: SchemaConfig[] = [
  {
    name: 'color',
    label: 'Цвет',
    type: 'text',
    key: 'isColor',
  },
  {
    name: 'amount',
    label: 'Обьем (мл)',
    type: 'number',
    key: 'isAmount',
  },
  {
    name: 'quantity',
    label: 'Количество в пачке',
    type: 'number',
    key: 'isQuantity',
  },
]

const getSchemaField = ({ name, label, type }: SchemaConfig) => {
  switch (type) {
    case 'text':
      return <FormInputText label={label} name={name}/>
    case 'number':
      return <FormInputNumber label={label} name={name}/>
  }
}

const renderSchema = (category: Category) => {
  // return schemaConfig.map(config => (
  //   category[config.key] && getSchemaField(config)
  // ))
  return null
}

const ProductFormSchema: React.FC<Props> = ({ category }) => {
  if (!category) return null

  return <>{renderSchema(category)}</>
}

export default ProductFormSchema
