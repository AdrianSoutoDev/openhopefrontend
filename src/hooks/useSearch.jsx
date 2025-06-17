import { useCallback, useEffect, useState } from 'react'
import useFetch from './useFetch'

const useSearch = ({ pageSize, searchParams }) => {
  const [page, setPage] = useState(0)
  const [size] = useState(pageSize || 5)
  const [params, setParams] = useState(searchParams || {})
  const [results, setResults] = useState(null)
  const [isLast, setIsLast] = useState(true)

  const { data, loading, fetch } = useFetch()

  const updateParams = useCallback((newParams) => {
    setParams(newParams)
    setPage(0)
  }, [])

  const search = useCallback(() => {
    const endpoint = `/search?page=${page}&size=${size}`
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(params),
    }
    fetch(endpoint, options)
  }, [fetch, page, params, size])

  useEffect(() => {
    search()
  }, [search])

  useEffect(() => {
    setIsLast(data?.last)
    if (data && data.first) {
      setResults(data.content)
    } else if (data) {
      setResults((prevResults) => [...prevResults, ...data.content])
    }
  }, [data])

  const nextPage = () => {
    if (!data?.last) {
      setPage(page + 1)
    }
  }

  return { results, loading, search, updateParams, nextPage, isLast }
}

export default useSearch
