import CampaignCategories from './categories'
import DoDonation from './doDonation'

function CampaignSideBar({
  className,
  doDonationData,
  minimumDonation,
  categories,
}) {
  return (
    <>
      <div className={`md:w-4/12 ${className}`}>
        <DoDonation
          suggestions={doDonationData.suggestions}
          minimumDonation={minimumDonation}
        />
        <CampaignCategories categories={categories} />
      </div>
    </>
  )
}

export default CampaignSideBar
