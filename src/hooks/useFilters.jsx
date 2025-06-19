import { useEffect, useState } from 'react'

const useFilters = (searchParams, updateParams, updateShow) => {
  const [searchText, setSearchText] = useState(searchParams.text || '')
  const [entityType, setEntityType] = useState(searchParams.show || 'CAMPAIGN')

  const [debouncedText, setDebouncedText] = useState(searchParams.text || '')

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

  const handleRadioEntityType = (e) => {
    setEntityType(e.target.value)
    updateShow(e.target.value)
    updateParams((prevParams) => ({
      ...prevParams,
      show: e.target.value,
    }))
  }

  return {
    entityType,
    searchText,
    setSearchText,
    handleRadioEntityType,
  }
}

export default useFilters
