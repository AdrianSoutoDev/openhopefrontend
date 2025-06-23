import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ButtonLink } from '../components/shared/Buttons'

function UserProfile() {
  const { isAuthenticated, whoAmI } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated()) navigate('/')
    if (whoAmI?.type === 'ORGANIZATION') navigate(`/organization/${whoAmI?.id}`)
  }, [isAuthenticated, navigate, whoAmI])

  return (
    <>
      <div>
        <ButtonLink
          link={`/openbanking/bank-selection?user=me`}
          className="mt-2 w-full"
        >
          Add bank account
        </ButtonLink>
      </div>
    </>
  )
}

export default UserProfile
