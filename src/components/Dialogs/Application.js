import React from 'react'
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import withDialog from 'lib/hocs/dialog'
import { getValidationResult } from 'lib/tools'
import joi from 'joi'

function ApplicationDialog(props) {
  const { formState, formHandlers } = props
  const { fields, errors } = formState
  const { onElementChange } =  formHandlers
  return (
    <>
      <TextField
        id='pitch'
        label='Skill Heading'
        margin='normal'
        variant='outlined'
        onChange={onElementChange}
        error={!!errors.pitch}
        helperText={errors.pitch}
        value={fields.pitch}
      />
    </>
  )
}

function validator(data) {
  const schema = joi.object().keys({
    pitch: joi.string().required().error(() => 'Pitch is required'),
  })
  return getValidationResult(data, schema)
}

const Dialog = compose(
  withDialog()
)(ApplicationDialog)

Dialog.defaultProps = {
  validator
}

export default Dialog