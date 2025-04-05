import { InfoMessage } from "./Messages"

function EmailPasswordForm({emailValidation, passwordValidation}) {

    return (
        <>
            <label htmlFor="email"><InfoMessage id='email'/></label>
            <input 
               type="email" 
               id="email" 
               value={emailValidation.value} 
               onChange={emailValidation.handleChange} 
               required 
               onInvalid={emailValidation.onInvalid}
               className='text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2'/>
               { emailValidation.error &&
                   <p className="text-danger mb-2">{emailValidation.error}</p>
               }
        
            <label htmlFor="password"><InfoMessage id='password'/></label>
            <input 
               type="password" 
               id="password" 
               value={passwordValidation.value} 
               onChange={passwordValidation.handleChange} 
               required
               onInvalid={passwordValidation.onInvalid}
               className='text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2'/> 
            { passwordValidation.error &&
                <p className="text-danger mb-2">{passwordValidation.error}</p>
            }
        </>
    )
}

export default EmailPasswordForm