import { FormattedMessage } from 'react-intl'
import { Button, ButtonDanger } from '../shared/Buttons'
import { useNavigate } from 'react-router-dom'

function LoginModal({ modalOpen, setModalOpen, campaignId }) {
  const navigate = useNavigate()

  const handleLogin = () => {
    setModalOpen(false)
    navigate(`/login`, { state: { redirecturl: `/campaign/${campaignId}` } })
  }

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              <FormattedMessage id="need_init_sesion" />
            </h2>
            <p className="mb-4">
              <FormattedMessage id="login_to_realize_donation" />
            </p>
            <div className="flex">
              <Button type="button" onClick={handleLogin} className={'mr-1'}>
                <FormattedMessage id="access" />
              </Button>
              <ButtonDanger
                onClick={() => setModalOpen(false)}
                className={'ml-1'}
              >
                <FormattedMessage id="cancel" />
              </ButtonDanger>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginModal
