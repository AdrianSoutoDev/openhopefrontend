import { useEffect, useRef, useState } from 'react'
import useFetch from './useFetch'

const useAspsps = (aspspParam) => {
  const [aspsps, setAspsps] = useState([])
  const [aspspSelected, setAspspSelected] = useState()
  const { data, loading, fetch } = useFetch()
  const hasFetched = useRef(false)

  useEffect(() => {
    if (!hasFetched.current) {
      const endpoint = '/providers/aspsp'
      const options = {
        method: 'GET',
      }
      fetch(endpoint, options)
      hasFetched.current = true
    }
  }, [fetch])

  useEffect(() => {
    if (data) {
      setAspsps(data)
    }
  }, [data])

  useEffect(() => {
    if (aspsps) {
      const aspspFinded = aspsps.find((aspsp) => aspsp.code === aspspParam)
      setAspspSelected(aspspFinded)
    }
  }, [aspspParam, aspsps])

  return { aspsps, loading, aspspSelected, setAspspSelected }
}

export default useAspsps
