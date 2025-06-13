const PageTitle = ({ title, className }) => {
  return (
    <>
      <div className="w-full flex justify-center mt-8">
        <h1
          className={`block font-semibold text-6xl text-gray-900 ${className}`}
        >
          {title || 'OpenHope'}
        </h1>
      </div>
    </>
  )
}

export default PageTitle
