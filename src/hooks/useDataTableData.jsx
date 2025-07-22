import { useEffect, useState } from 'react'
import useFetch from './useFetch'

const useDataTableData = (source, mapper) => {
  const { data, loading, fetch } = useFetch()
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [pageInfo, setPageInfo] = useState({})

  const nextPage = () => {
    if (!pageInfo.last) {
      setPage(page + 1)
    }
  }

  const previousPage = () => {
    if (!pageInfo.first) {
      setPage(page - 1)
    }
  }

  useEffect(() => {
    const { endpoint, options } = source
    fetch(`${endpoint}?page=${page}`, options)
  }, [fetch, page, source])

  useEffect(() => {
    if (data) {
      const dataMapped = mapper(data.content)
      setItems(dataMapped)
      setPageInfo({
        first: data.first,
        last: data.last,
        onlyOnePage: data.totalPages === 1,
      })
    }
  }, [data, mapper])

  const refresh = () => {
    const { endpoint, options } = source
    fetch(`${endpoint}?page=${page}`, options)
  }

  return {
    data,
    loading,
    fetch,
    items,
    setItems,
    page,
    setPage,
    pageInfo,
    setPageInfo,
    nextPage,
    previousPage,
    refresh,
  }
}

export default useDataTableData
