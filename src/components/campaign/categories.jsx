import { InfoMessage } from '../shared/Messages'

function CampaignCategories({ categories }) {
  return (
    <>
      {categories && categories.length > 0 && (
        <div className="flex flex-col m-2 p-3 border border-gray-200  rounded-sm">
          <InfoMessage
            id="label_categories"
            className="text-xl font-semibold"
          />
          <div className="flex flex-wrap justify-between mt-2">
            {categories.map((category, index) => (
              <p className="text-primary" key={index}>
                {category.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CampaignCategories
