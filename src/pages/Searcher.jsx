import { useLocation } from 'react-router-dom'
import useSearch from '../hooks/useSearch'

function Searcher() {
  const location = useLocation()
  const searchParams = location.state?.searchParams

  const { data, loading, setParams } = useSearch({
    searchParams: searchParams,
  })

  console.log(searchParams)

  return <></>
}

export default Searcher
