import { Button } from '../shared/Buttons'
import Spinner from '../shared/Spinner'

function ConfirmationDonationModal({ modalOpen, setModalOpen, loading }) {
  return (
    <>
      {modalOpen &&
        (loading ? (
          <div className="h-128 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">
                Gracias por la donación
              </h2>
              <div className="flex">
                <Button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className={'mr-1'}
                >
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default ConfirmationDonationModal
