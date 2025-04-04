import { useState } from "react";
import { Button } from "../components/shared/Buttons";
import { FormattedMessage } from "react-intl";

function Register() {
  const [typeAccount, setTypeAccount] = useState('')
  
  return (
    <> 
      { !typeAccount &&
          <div className='flex flex-col h-96 justify-center items-center'>
            <Button className='w-min-28 w-64 my-4' onClickAction={() => setTypeAccount('user')}>
              <FormattedMessage id='create_user_account' />
            </Button>

            <Button className='w-min-28 w-64 my-4' onClickAction={() => setTypeAccount('organization')}>
              <FormattedMessage id='create_organization' />
            </Button>
          </div>  
      }

      { typeAccount === 'user' &&
          <div className='flex flex-col h-96 justify-center items-center'>
          USR
          </div>  
      }

      { typeAccount === 'organization' &&
          <div className='flex flex-col h-96 justify-center items-center'>
            ORG
          </div>  
      }
    </>
  )
}
  
export default Register