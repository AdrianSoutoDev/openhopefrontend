import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { InfoMessage } from './Messages'

function DataTable({
  items,
  tableHeaders,
  handleClickRow,
  nextPage,
  previousPage,
  pageInfo,
  className,
}) {
  return (
    <>
      {!items.length ? (
        <div className={`${className}`}>
          <InfoMessage id="no_results" />
        </div>
      ) : (
        <>
          <div
            className={`${className} w-screen md:w-full overflow-x-auto rounded-sm shadow-xs`}
          >
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
                {items.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      handleClickRow ? handleClickRow(item.id) : true
                    }
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
          </div>
          <div
            className={`flex w-full px-2 ${pageInfo.onlyOnePage ? '' : pageInfo.first ? 'justify-end' : pageInfo.last ? 'justify-start' : 'justify-between'}`}
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
        </>
      )}
    </>
  )
}

export default DataTable
