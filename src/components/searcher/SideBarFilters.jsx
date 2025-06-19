import { FormattedMessage } from 'react-intl'
import Icons from '../shared/Icons'
import { Button } from '../shared/Buttons'
import { useEffect, useState } from 'react'

function SideBarFilters({ updateParams, searchParams, toggleSideBar }) {
  const [searchText, setSearchText] = useState(searchParams.text || '')
  const [debouncedText, setDebouncedText] = useState(searchParams.text || '')

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

  const updateSearchText = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col mt-15 md:mt-8 w-full">
        {/* desktop */}
        <h2 className="md:flex hidden text-2xl text-info font-semibold pt-2 mb-5">
          <FormattedMessage id="filter" />
        </h2>

        {/* mobile */}
        <h2 className="w-full flex md:hidden mt-5 mb-2 text-2xl text-info font-semibold justify-between">
          <FormattedMessage id="filter" />
          <div className="mr-2 flex items-end" onClick={() => toggleSideBar()}>
            <Icons.Filters />
          </div>
        </h2>

        {/* common */}
        <div className="mt-2 pt-1">
          <FormattedMessage id="what_search" />
          <input
            type="text"
            id="search"
            value={searchText}
            onChange={updateSearchText}
            className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none"
          />
        </div>

        <div className="mt-2 md:hidden">
          <Button type="button" onClick={() => toggleSideBar()}>
            <FormattedMessage id="search" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default SideBarFilters
