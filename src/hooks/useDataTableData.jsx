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
    fetch(`${source.endpoint}?page=${page}`, source.options)
  }, [fetch, page, source.endpoint, source.options])

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
  }
}

export default useDataTableData
