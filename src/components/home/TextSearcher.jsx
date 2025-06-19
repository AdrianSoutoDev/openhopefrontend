import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from '../shared/Buttons'
import { InfoMessage } from '../shared/Messages'
import { useNavigate } from 'react-router-dom'

function TextSearcher({ className }) {
  const intl = useIntl()
  const [searchValue, setSearchValue] = useState('')
  const [entityType, setEntityType] = useState('CAMPAIGN')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/searcher', {
      state: {
        searchParams: {
          text: searchValue,
          show: entityType,
        },
      },
    })
  }

  const handleRadio = (e) => {
    setEntityType(e.target.value)
  }

  return (
    <>
      <div className={className}>
        <label htmlFor="search">
          <InfoMessage id="what_search" />
        </label>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="text-info rounded-lg shadow-sm border input-primary w-full my-2 px-4 py-2 focus:outline-none"
            placeholder={intl.formatMessage({
              id: 'write_here',
            })}
          />

          <div className="px-2 flex w-full justify-between">
            <div className="flex items-center justify-start">
              <Button type="submit" className={'px-8'}>
                <FormattedMessage id="search" />
              </Button>
            </div>
            <div className="flex flex-col text-sm *:justify-end">
              <div className="items-center">
                <input
                  type="radio"
                  name="entityTypes"
                  id="radioCampaign"
                  value="CAMPAIGN"
                  checked={entityType === 'CAMPAIGN'}
                  onChange={handleRadio}
                  className="h-4 w-4 text-emerald-500 mr-1"
                />
                <label htmlFor="radioCampaign">
                  <InfoMessage id="campaigns" />
                </label>
              </div>

              <div className="items-center">
                <input
                  type="radio"
                  name="entityTypes"
                  id="radioOrganization"
                  value="ORGANIZATION"
                  checked={entityType === 'ORGANIZATION'}
                  onChange={handleRadio}
                  className="h-4 w-4 text-emerald-500 mr-1 mt-1"
                />
                <label htmlFor="radioOrganization">
                  <InfoMessage id="organizations" />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default TextSearcher
