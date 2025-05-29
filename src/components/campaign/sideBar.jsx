import CampaignMoreCampaigns from './Campaigns'
import CampaignCategories from './categories'
import DoDonation from './doDonation'

function CampaignSideBar({
  className,
  doDonationData,
  minimumDonation,
  categories,
  organizationId,
  campaignId,
  hasBankAccount,
  isOwner,
  donationsDisabled,
}) {
  return (
    <>
      <div className={`md:w-4/12 ${className}`}>
        <DoDonation
          suggestions={doDonationData.suggestions}
          minimumDonation={minimumDonation}
          hasBankAccount={hasBankAccount}
          isOwner={isOwner}
          campaignId={campaignId}
          donationsDisabled={donationsDisabled}
        />
        <CampaignCategories categories={categories} />
        <CampaignMoreCampaigns
          organizationId={organizationId}
          campaignId={campaignId}
        />
      </div>
    </>
  )
}

export default CampaignSideBar
