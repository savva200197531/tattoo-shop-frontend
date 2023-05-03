import React, { useState } from 'react'
import { object, string, TypeOf } from 'zod'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'

import { StyledLoadingButton } from '../../components/StyledButtons'
import { validationErrors } from '../../helpers/validationErrors'
import FormInputText from '../../components/FormInputs/Text/FormInputText'
import FormInputMasked from '../../components/FormInputs/Text/FormInputMasked'
import { useFeedback } from '../../contexts/feedback/FeedbackContext'
import './styles.scss'

const feedbackSchema = object({
  name: string({ required_error: validationErrors.required('имя') })
    .nonempty(validationErrors.required('имя'))
    .min(2, validationErrors.min('имя', 2))
    .max(32, validationErrors.max('имя', 32)),
  phone: string({ required_error: validationErrors.required('телефон') })
    .regex(new RegExp('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'), 'Телефон указан неверно'),
  comment: string().max(128, validationErrors.max('комментарий', 128)).optional(),
})

type FeedbackInput = TypeOf<typeof feedbackSchema>;

const FeedbackForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { sendFeedback } = useFeedback()

  const methods = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
  })

  const { handleSubmit } = methods

  const onSubmitHandler: SubmitHandler<FeedbackInput> = (data) => {
    setLoading(true)

    sendFeedback(data)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box
      component="form"
      className="feedback-form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <FormProvider {...methods}>
        <FormInputText name="name" label="Имя"/>

        <FormInputMasked name="phone" label="Телефон" mask="+7\ (999) 999-99-99"/>

        <FormInputText
          name="comment"
          label="Комментарий"
          rows={4}
          multiline
        />
      </FormProvider>

      <StyledLoadingButton
        variant="contained"
        fullWidth
        type="submit"
        loading={loading}
      >
        Отправить
      </StyledLoadingButton>
    </Box>
  )
}

export default FeedbackForm
