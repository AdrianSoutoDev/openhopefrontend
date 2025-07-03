function DonationModal({ modalOpen, setModalOpen }) {
  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Título del Modal</h2>
            <p className="mb-4">Contenido del modal aquí.</p>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DonationModal
