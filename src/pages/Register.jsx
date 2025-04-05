import { useState } from "react";
import { Button } from "../components/shared/Buttons";
import PageTitle from "../components/shared/PageTitle";
import { InfoMessage, Message} from "../components/shared/Messages";

function Register() {
  const [typeAccount, setTypeAccount] = useState('')
  
  return (
    <> 
      <PageTitle/>

      { !typeAccount &&
          <div className='flex flex-col md:flex-row justify-center items-center h-96 text-center'>
            <div className='flex flex-col my-4 justify-center items-center p-2 max-w-96 md:mx-2'>
              <InfoMessage id='info_register_user'/>

              <Button className='w-min-28 w-64 my-4' onClickAction={() => setTypeAccount('user')}>
                <Message id='create_user_account' />
              </Button>
            </div>

            <div className='flex flex-col my-4 justify-center items-center p-2 max-w-96 md:mx-2'>
            <p><InfoMessage id='info_register_organization'/></p>

              <Button className='w-min-28 w-64 my-4' onClickAction={() => setTypeAccount('organization')}>
                <Message id='create_organization' />
              </Button>
            </div>
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