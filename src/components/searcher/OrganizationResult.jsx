import { useNavigate } from 'react-router-dom'
import { getImgFromServer } from '../../utils/utils'

function OrganizationResult({ item }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/organization/${item.id}`)
  }

  return (
    <>
      <div
        className="flex flex-col md:flex-row items-center md:items-stretch mt-2 p-5 cursor-pointer border rounded-sm border-gray-200"
        onClick={handleClick}
      >
        <div className="min-w-32 max-w-68 float-left mr-2">
          <img
            src={
              item?.image
                ? getImgFromServer(item.image)
                : '/img/default-image.jpg'
            }
            className="rounded-sm"
          />
        </div>
        <div className="w-full flex flex-col items-center md:items-stretch justify-between">
          <div className="pt-2 font-semibold text-info text-2xl">
            {item.name}
          </div>
          <div className="text-info line-clamp-3">
            {item.description
              ?.replace(/<\/?[^>]+(>|$)/g, '')
              .replace(/\n/g, ' ')
              .replace(/&nbsp;/g, ' ')}
          </div>
        </div>
      </div>
    </>
  )
}

export default OrganizationResult
