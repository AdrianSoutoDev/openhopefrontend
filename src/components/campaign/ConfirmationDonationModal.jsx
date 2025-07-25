import { FormattedMessage } from 'react-intl'
import { Button } from '../shared/Buttons'
import { InfoMessage } from '../shared/Messages'
import Spinner from '../shared/Spinner'
import ConfettiExplosion from 'react-confetti-explosion'
import { useEffect, useState } from 'react'

function ConfirmationDonationModal({
  modalOpen,
  setModalOpen,
  loading,
  organization,
}) {
  const [isExploding, setIsExploding] = useState(false)

  useEffect(() => {
    if (modalOpen) setIsExploding(true)
  }, [modalOpen])

  return (
    <>
      {modalOpen &&
        (loading ? (
          <div className="h-128 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none mb-52">
              <ConfettiExplosion width={1200} />
            </div>
            <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">
                  <InfoMessage id="donation_ok" />
                </h2>
                <p className="mb-4">
                  <FormattedMessage
                    id="donation_ok_message"
                    values={{
                      organization: organization,
                    }}
                  />
                </p>
                <div className="flex">
                  <Button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className={'mr-1'}
                  >
                    <FormattedMessage id="continue" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ))}
    </>
  )
}

export default ConfirmationDonationModal
