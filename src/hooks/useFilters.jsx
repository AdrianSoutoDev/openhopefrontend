import { format } from 'date-fns'
import { useEffect, useState } from 'react'

const useFilters = (searchParams, updateParams, updateShow) => {
  const [searchText, setSearchText] = useState(searchParams.text || '')
  const [entityType, setEntityType] = useState(searchParams.show || 'CAMPAIGN')
  const [debouncedText, setDebouncedText] = useState(searchParams.text || '')
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [startAtFrom, setStartAtFrom] = useState()
  const [startAtTo, setStartAtTo] = useState()

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
    updateShow(entityType)
    updateParams((prevParams) => ({
      ...prevParams,
      show: entityType,
    }))
  }, [entityType, updateParams, updateShow])

  useEffect(() => {
    updateParams((prevParams) => ({
      ...prevParams,
      categories: categoriesSelected,
    }))
  }, [categoriesSelected, updateParams])

  useEffect(() => {
    const dateFormated = startAtFrom
      ? format(startAtFrom, localDateFormat)
      : startAtFrom

    updateParams((prevParams) => ({
      ...prevParams,
      startDateFrom: dateFormated,
    }))
  }, [startAtFrom, updateParams])

  useEffect(() => {
    const dateFormated = startAtTo
      ? format(startAtTo, localDateFormat)
      : startAtTo

    updateParams((prevParams) => ({
      ...prevParams,
      startDateTo: dateFormated,
    }))
  }, [startAtTo, updateParams])

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
  }
}

export default useFilters
