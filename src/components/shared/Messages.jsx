import { FormattedMessage } from 'react-intl'

export const InfoMessage = ({ id, values, className }) => {
  return (
    <>
      <span className={`text-info ${className}`}>
        <FormattedMessage id={id} values={values} />
      </span>
    </>
  )
}

export const Message = ({ id }) => {
  return (
    <>
      <FormattedMessage id={id} />
    </>
  )
}

export const SuccessMessage = ({ id, className }) => {
  return (
    <>
      <span className={`text-primary ${className}`}>
        <FormattedMessage id={id} />
      </span>
    </>
  )
}
