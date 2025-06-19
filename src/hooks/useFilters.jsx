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
  const [finalizeDateFrom, setFinalizeDateFrom] = useState(
    searchParams.finalizeDateFrom || null,
  )
  const [finalizeDateTo, setFinalizeDateTo] = useState(
    searchParams.finalizeDateTo || null,
  )

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

  const formatDate = (date) => {
    const localDateFormat = 'yyyy-MM-dd'
    return date ? format(date, localDateFormat) : date
  }

  useEffect(() => {
    updateShow(entityType)
    updateParams((prevParams) => ({
      ...prevParams,
      show: entityType,
      categories: categoriesSelected,
      startDateFrom: formatDate(startAtFrom),
      startDateTo: formatDate(startAtTo),
      campaignState: campaignState === 'ALL' ? null : campaignState,
      campaignFinalizeType:
        campaignFinalizeType === 'ALL' ? null : campaignFinalizeType,
      hasMinimumDonation: hasMinimumDonation,
      hasCampaignsOnGoing: hasCampaignsOnGoing,
      finalizeDateFrom: formatDate(finalizeDateFrom),
      finalizeDateTo: formatDate(finalizeDateTo),
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
    finalizeDateFrom,
    finalizeDateTo,
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
    finalizeDateFrom,
    setFinalizeDateFrom,
    finalizeDateTo,
    setFinalizeDateTo,
  }
}

export default useFilters
