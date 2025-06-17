import { useCallback, useEffect, useState } from 'react'
import useFetch from './useFetch'

const useSearch = ({ pageSize, searchParams }) => {
  const [page, setPage] = useState(0)
  const [size] = useState(pageSize || 10)
  const [params, setParams] = useState(searchParams || {})

  const { data, loading, fetch } = useFetch()

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

  return { data, loading, setParams, search, setPage }
}

export default useSearch
