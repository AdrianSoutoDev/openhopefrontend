import CampaignResult from './CampaignResult'
import OrganizationResult from './OrganizationResult'

function SearchResults({ items, type }) {
  return (
    <>
      <div className="w-full">
        {items?.map((item, index) => (
          <div key={index}>
            {type === 'ORGANIZATION' ? (
              <OrganizationResult item={item} />
            ) : (
              <CampaignResult item={item} />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchResults
