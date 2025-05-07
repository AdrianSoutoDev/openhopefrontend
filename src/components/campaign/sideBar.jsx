import DoDonation from './doDonation'

function CampaignSideBar({ className, doDonationData, minimumDonation }) {
  return (
    <>
      <div className={`md:w-4/12 ${className}`}>
        <DoDonation
          suggestions={doDonationData.suggestions}
          minimumDonation={minimumDonation}
        />
      </div>
    </>
  )
}

export default CampaignSideBar
