import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { InfoMessage } from './Messages'

function DataTable({ source, tableHeaders, mapper, handleClickRow }) {
  const { endpoint, options } = source
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const { data, loading, fetch } = useFetch()
  const hasFetched = useRef(false)
  const [pageInfo, setPageInfo] = useState({})

  useEffect(() => {
    if (!hasFetched.current) {
      const endpointPaged = endpoint.concat(`?page=${page}`)
      fetch(endpointPaged, options)
      hasFetched.current = true
    }
  }, [fetch, page, endpoint, options])

  useEffect(() => {
    if (data) {
      const dataMapped = mapper(data.content)
      setItems(dataMapped)
      setPageInfo({
        first: data.first,
        last: data.last,
      })
    }
  }, [data, mapper])

  const nextPage = () => {
    if (!pageInfo.last) {
      hasFetched.current = false
      setPage(page + 1)
    }
  }

  const previousPage = () => {
    if (!pageInfo.first) {
      hasFetched.current = false
      setPage(page - 1)
    }
  }

  return (
    <>
      {loading && <Spinner />}

      {!loading && (
        <>
          {!items.length ? (
            <div className="mt-5">
              <InfoMessage id="no_results" />
            </div>
          ) : (
            <div className="my-5 w-screen md:w-full overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 shadow-xs">
                <thead className="text-left text-info">
                  <tr className="bg-gray-200">
                    {tableHeaders.map((header, index) => (
                      <th key={index} className="px-4 py-2 whitespace-nowrap">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleClickRow(item.id)}
                      className={`cursor-pointer hover:bg-gray-300 ${items.indexOf(item) % 2 !== 0 ? 'bg-gray-100' : 'bg-white'}`}
                    >
                      {item.values.map((value, index) => (
                        <td key={index} className="px-4 py-2 whitespace-nowrap">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className={`flex mt-4 px-2 ${pageInfo.first ? 'justify-end' : pageInfo.last ? 'justify-start' : 'justify-between'}`}
              >
                {!pageInfo.first && (
                  <Link onClick={previousPage}>
                    <InfoMessage
                      id="datatable_previous"
                      className="text-sm hover:text-emerald-400"
                    />
                  </Link>
                )}
                {!pageInfo.last && (
                  <Link onClick={nextPage}>
                    <InfoMessage
                      id="datatable_next"
                      className="text-sm hover:text-emerald-400"
                    />
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default DataTable
