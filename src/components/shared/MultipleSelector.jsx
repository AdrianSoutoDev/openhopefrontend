import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Icons from './Icons'
import { InfoMessage } from './Messages'

function MultipleSelector({
  source,
  selectedItems,
  setSelectedItems,
  className,
}) {
  const { endpoint, options } = source
  const { data, loading, fetch } = useFetch()
  const [items, setItems] = useState([])
  const hasFetched = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!hasFetched.current) {
      fetch(endpoint, options)
      hasFetched.current = true
    }
  }, [fetch, endpoint, options])

  useEffect(() => {
    if (data) {
      setItems(data)
    }
  }, [data])

  const handleSelection = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter((i) => i !== itemName))
    } else if (selectedItems.length < 3) {
      setSelectedItems([...selectedItems, itemName])
    }
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
    <div className={`${className} relative`} ref={dropdownRef}>
      <button
        type="button"
        className="block w-full px-4 py-3 my-2 text-start text-sm shadow-sm rounded-lg text-info border border-gray-400 cursor-pointer focus:outline-none hover:border-emerald-400"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between">
          <span>
            <InfoMessage id="select_categories" /> ({selectedItems.length}/3)
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
            items.map((item) => (
              <div
                key={item.id}
                className={`px-4 py-2 cursor-pointer ${
                  selectedItems.includes(item.name)
                    ? 'bg-emerald-400'
                    : 'hover:bg-emerald-200'
                }`}
                onClick={() => handleSelection(item.name)}
              >
                {item.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default MultipleSelector
