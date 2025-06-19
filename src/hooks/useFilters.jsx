import { useEffect, useState } from 'react'

const useFilters = (searchParams, updateParams, updateShow) => {
  const [searchText, setSearchText] = useState(searchParams.text || '')
  const [entityType, setEntityType] = useState(searchParams.show || 'CAMPAIGN')
  const [debouncedText, setDebouncedText] = useState(searchParams.text || '')
  const [categoriesSelected, setCategoriesSelected] = useState([])

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
    console.log(categoriesSelected)
    updateParams((prevParams) => ({
      ...prevParams,
      categories: categoriesSelected,
    }))
  }, [categoriesSelected, updateParams])

  return {
    entityType,
    searchText,
    setSearchText,
    setEntityType,
    categoriesSelected,
    setCategoriesSelected,
  }
}

export default useFilters
