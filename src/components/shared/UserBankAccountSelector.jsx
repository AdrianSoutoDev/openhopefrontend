import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Icons from './Icons'
import { InfoMessage } from './Messages'

function UserBankAccountSelector({
  sourceItems,
  setItemSelected,
  className,
  disabled,
  defaultItem,
  emptyText,
}) {
  const { data, loading } = useFetch()
  const [items, setItems] = useState(sourceItems || [])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [itemSelection, setItemSelection] = useState(defaultItem || null)

  useEffect(() => {
    if (data) {
      setItems(data)
    }
  }, [data])

  useEffect(() => {
    if (defaultItem) {
      setItemSelection(defaultItem)
    }
  }, [defaultItem])

  useEffect(() => {
    setItems(sourceItems)
    setItemSelection(defaultItem)
  }, [defaultItem, sourceItems])

  const handleSelection = (item) => {
    setItemSelection(item)
    setItemSelected(item)
    setIsOpen(false)
  }

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        disabled={disabled}
        type="button"
        className={`${className} block w-full px-4 py-3 my-2 text-start text-sm shadow-sm rounded-lg text-info border border-gray-400 cursor-pointer focus:outline-none hover:border-emerald-400
            disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:text-gray-600 disabled:cursor-default
              disabled:hover:text-gray-600 disabled:border-gray-600`}
        onClick={toggleDropdown}
      >
        <div className="flex justify-between">
          <span className="block text-ellipsis whitespace-break-spaces">
            {itemSelection?.name || emptyText || (
              <InfoMessage id="select_an_option" />
            )}
          </span>
          <span
            className={`transform transition-transform text-end ${isOpen ? 'rotate-180' : ''}`}
          >
            <Icons.DropDown />
          </span>
        </div>
      </button>
      {isOpen && (
        <div className="w-full bg-white text-sm shadow-sm rounded-lg text-info border z-10 overflow-y-auto absolute max-h-64">
          {loading ? (
            <div className="px-4 py-2 text-sm text-info">
              <InfoMessage id="loading" />
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className={`flex items-center px-4 py-2 cursor-pointer ${
                  itemSelection === item ? 'bg-emerald-300' : ''
                }`}
                onClick={() => handleSelection(item)}
              >
                <span
                  className={`text-xl ${
                    item?.favorite ? 'text-amber-400' : 'text-gray-200'
                  }`}
                >
                  ★
                </span>
                <span className="text-info ml-2"> {item.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default UserBankAccountSelector
