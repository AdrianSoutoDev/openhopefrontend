import { useState } from "react";
import { Button } from "../components/shared/Buttons";
import PageTitle from "../components/shared/PageTitle";
import { InfoMessage, Message} from "../components/shared/Messages";
import useValidation from "../hooks/useValidation";
import useLogin from "../hooks/useLogin";
import { FormattedMessage } from "react-intl";
import EmailPasswordForm from "../components/shared/EmailPasswordForm";
import Spinner from "../components/shared/Spinner";
import Icons from "../components/shared/Icons";

function Register() {
  const [typeAccount, setTypeAccount] = useState('')
  const [moreInfoEnabled, setMoreInfoEnable] = useState(false)

  //TODO cambiar login por register
  const { loading } = useLogin();
  
  const emailValidation = useValidation("", {
    required: true,
    format: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    messages: {
      required: <FormattedMessage id="email_error_empty" />,
      format: <FormattedMessage id="email_error_format" />,
    },
  });

  const passwordValidation = useValidation("", {
      required: true,
      messages: {
        required: <FormattedMessage id="password_error_empty" />,
      },
  });

  const nameValidation = useValidation("", {
    required: true,
    messages: {
      required: <FormattedMessage id="name_error_empty" />,
    },
  });

  const showMoreInfo = () => {
    setMoreInfoEnable(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isEmailValid = emailValidation.validate()
    const isPasswordValid = passwordValidation.validate()

    if (isEmailValid && isPasswordValid) {
      //TODO register
    }
  };

  return (
    <> 
      <PageTitle/>
      <div className="flex flex-col justify-center items-center">
        <div className="p-4 max-w-96 md:max-w-2xl">
          { !typeAccount &&
              <div className='flex flex-col md:flex-row justify-center items-center h-96 text-center'>
                <div className='flex flex-col my-4 justify-center items-center p-2 max-w-96 md:mx-2'>
                  <InfoMessage id='info_register_user'/>

                  <Button className='w-min-28 w-64 my-4' onClick={() => setTypeAccount('user')}>
                    <Message id='create_user_account' />
                  </Button>
                </div>

                <div className='flex flex-col my-4 justify-center items-center p-2 max-w-96 md:mx-2'>
                <p><InfoMessage id='info_register_organization'/></p>

                  <Button className='w-min-28 w-64 my-4' onClick={() => setTypeAccount('organization')}>
                    <Message id='create_organization' />
                  </Button>
                </div>
              </div>  
          }

          { typeAccount && 
            <div className='flex flex-col h-96 justify-center items-center'>
              <form onSubmit={handleSubmit}>
                <EmailPasswordForm emailValidation={emailValidation} passwordValidation={passwordValidation} />

                { typeAccount === 'organization' &&
                    <>
                    <label htmlFor="name"><InfoMessage id='organization_name'/></label>
                    <input 
                      type="text" 
                      id="email" 
                      value={nameValidation.value} 
                      onChange={nameValidation.handleChange} 
                      required 
                      onInvalid={nameValidation.onInvalid}
                      className='text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2'/>
                      { nameValidation.error &&
                          <p className="text-danger mb-2">{nameValidation.error}</p>
                      }


                    { moreInfoEnabled 
                      ? <div>optional info</div>
                      : <Button type="button" onClick={showMoreInfo}>
                          <FormattedMessage id="add_more_info" /> 
                        </Button>
                    }
                    </>
                }

                <Button type="submit" disabled={loading} className="w-full my-2">
                  { loading ? <Spinner />
                            : <FormattedMessage id="signup" />
                  }
                </Button>
              </form>
            </div>
          }
        </div>
      </div>
    </>
  )
}
  
export default Register