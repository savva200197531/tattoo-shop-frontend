import React, { FC, useCallback, useEffect, useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

import { Button, FormControl, FormHelperText } from '@mui/material'

import './styles.scss'
import { LocalFile } from '../../contexts/files/types'
import Spinner from '../Spinner/Spinner'
import FileInputItem from './FileInputItem'

interface IFileInputProps extends DropzoneOptions {
  label?: string
  name: string
  onDropPromise: (files: File[]) => Promise<any>
}

const FileInput: FC<IFileInputProps> = (props) => {
  const { name, label = 'Прикрепить файл', multiple = false, onDropPromise } = props

  const [loading, setLoading] = useState(false)

  const {
    register,
    unregister,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext()

  const fileIds: number[] = watch(name)

  const onDrop = useCallback(
    (files: File[]) => {
      setLoading(true)
      onDropPromise(files)
        .then(({ data }) => {
          if (multiple) {
            setValue(name, [...fileIds, ...data.map((item: LocalFile) => item.id)], { shouldValidate: true })
          } else {
            setValue(name, [data.id], { shouldValidate: true })
          }
        })
        .finally(() => {
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    },
    [setValue, name, fileIds],
  )

  const onDelete = useCallback(
    (id: number) => {
      const filteredIds = fileIds.filter((item) => item !== id)

      if (!filteredIds.length) {
        setValue(name, [], { shouldValidate: true })
      } else {
        setValue(name, filteredIds, { shouldValidate: true })
      }
    },
    [setValue, name, fileIds],
  )


  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    multiple,
    accept: props.accept,
  })

  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    <FormControl className="file-input">
      <div>
        <input id={name} {...getInputProps()} />
        <Button {...getRootProps()} onClick={open} variant="outlined">{label}</Button>
        {!!fileIds?.length && (
          loading ? <Spinner/> : (
            <div className="file-input__list">
              {fileIds.map((id) => (
                <FileInputItem key={id} id={id} onDelete={onDelete} />
              ))}
            </div>
          )
        )}
      </div>

      <FormHelperText id={name} error>
        <>{errors[name] ? errors[name]?.message : ''}</>
      </FormHelperText>
    </FormControl>
  )
}

export default FileInput
