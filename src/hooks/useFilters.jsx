import { format } from 'date-fns'
import { useEffect, useState } from 'react'

const useFilters = (searchParams, updateParams, updateShow) => {
  const [searchText, setSearchText] = useState(searchParams.text || '')
  const [entityType, setEntityType] = useState(searchParams.show || 'CAMPAIGN')
  const [debouncedText, setDebouncedText] = useState(searchParams.text || '')
  const [categoriesSelected, setCategoriesSelected] = useState(
    searchParams.categories || [],
  )
  const [startAtFrom, setStartAtFrom] = useState(
    searchParams.startAtFrom || null,
  )
  const [startAtTo, setStartAtTo] = useState(searchParams.startAtTo || null)
  const [campaignState, setCampaignState] = useState(
    searchParams.campaignState || 'ALL',
  )
  const [campaignFinalizeType, setCampaignFinalizeType] = useState(
    searchParams.campaignFinalizeType || 'ALL',
  )
  const [hasMinimumDonation, setHasMinimumDonation] = useState(
    searchParams.hasMinimumDonation || false,
  )
  const [hasCampaignsOnGoing, setHasCampaignsOnGoing] = useState(
    searchParams.hasCampaignsOnGoing || false,
  )

  const localDateFormat = 'yyyy-MM-dd'

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchText)
    }, 750)

    return () => clearTimeout(handler)
  }, [searchText])

  useEffect(() => {
    updateParams((prevParams) => ({
      ...prevParams,
      text: debouncedText,
    }))
  }, [debouncedText, updateParams])

  useEffect(() => {
    const startAtFromFormated = startAtFrom
      ? format(startAtFrom, localDateFormat)
      : startAtFrom

    const startAtToFormated = startAtTo
      ? format(startAtTo, localDateFormat)
      : startAtTo

    updateShow(entityType)

    updateParams((prevParams) => ({
      ...prevParams,
      show: entityType,
      categories: categoriesSelected,
      startDateFrom: startAtFromFormated,
      startDateTo: startAtToFormated,
      campaignState: campaignState === 'ALL' ? null : campaignState,
      campaignFinalizeType:
        campaignFinalizeType === 'ALL' ? null : campaignFinalizeType,
      hasMinimumDonation: hasMinimumDonation,
      hasCampaignsOnGoing: hasCampaignsOnGoing,
    }))
  }, [
    entityType,
    categoriesSelected,
    startAtFrom,
    startAtTo,
    campaignState,
    campaignFinalizeType,
    hasMinimumDonation,
    hasCampaignsOnGoing,
    updateParams,
    updateShow,
  ])

  return {
    entityType,
    searchText,
    setSearchText,
    setEntityType,
    categoriesSelected,
    setCategoriesSelected,
    startAtFrom,
    setStartAtFrom,
    startAtTo,
    setStartAtTo,
    campaignState,
    setCampaignState,
    campaignFinalizeType,
    setCampaignFinalizeType,
    hasMinimumDonation,
    setHasMinimumDonation,
    hasCampaignsOnGoing,
    setHasCampaignsOnGoing,
  }
}

export default useFilters
