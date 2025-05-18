import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import SimpleSelector from '../../components/shared/SimpleSelector'
import { Button } from '../../components/shared/Buttons'
import { FormattedMessage } from 'react-intl'
import Spinner from '../../components/shared/Spinner'

function BankAccountSelection() {
  const [searchParams] = useSearchParams()
  const campaignId = searchParams.get('campaign')
  const aspspParam = searchParams.get('aspsp')
  const navigate = useNavigate()

  const [bankAccounts, setBankAccounts] = useState()
  const [accountSelected, setAccountSelected] = useState()

  const { data: dataAccounts, fetch: fetchAccounts } = useFetch()
  const hasFetchedAccounts = useRef(false)

  const [aspspSelected, setAspspSelected] = useState()

  const { data: authData, fetch: authfetch } = useFetch()

  const { data: dataSave, loading: loadingSave, fetch: fetchSave } = useFetch()

  const { data, loading, fetch } = useFetch()
  const hasFetched = useRef(false)

  // const [aspsps, setAspsps] = useState([])
  const [aspsps, setAspsps] = useState([
    { name: 'BANCO CETELEM, S.A.', code: 'CETELEM', provider: 'REDSSYS' },
    {
      name: 'CBNK Banco de Colectivos, S.A',
      code: 'CBNK',
      provider: 'REDSSYS',
    },
    { name: 'EVO BANCO S.A.U.', code: 'EVOBANCO', provider: 'REDSSYS' },
  ])

  // useEffect(() => {
  //   if (!hasFetched.current) {
  //     const endpoint = '/providers/aspsp'
  //     const options = {
  //       method: 'GET',
  //     }
  //     fetch(endpoint, options)
  //     hasFetched.current = true
  //   }
  // }, [fetch])

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

  useEffect(() => {
    if (dataAccounts) {
      setBankAccounts(dataAccounts)
    }
  }, [dataAccounts])

  useEffect(() => {
    if (aspspSelected && !hasFetchedAccounts.current) {
      let endpoint = `/providers/${aspspSelected.provider}/${aspspSelected.code}/accounts`
      endpoint = campaignId ? `${endpoint}?campaign=${campaignId}` : endpoint

      const options = {
        method: 'GET',
        credentials: 'include',
      }
      fetchAccounts(endpoint, options)
      hasFetchedAccounts.current = true
    }
  }, [aspspSelected, campaignId, fetchAccounts])

  useEffect(() => {
    if (authData) {
      window.location.href = authData.uri
    }
  }, [authData])

  const handleAccess = () => {
    let endpoint = `/providers/${aspspSelected.provider}/${aspspSelected.code}/oauth`
    if (campaignId) {
      endpoint = `${endpoint}?campaign=${campaignId}`
    }

    const options = {
      method: 'GET',
    }

    authfetch(endpoint, options)
  }

  const handleAspspSelectedChange = (aspsp) => {
    setAccountSelected(null)
    setBankAccounts(null)
    hasFetchedAccounts.current = false
    setAspspSelected(aspsp)
  }

  const handleSaveAccount = () => {
    if (campaignId) {
      updateCampaign()
    }
  }

  const updateCampaign = () => {
    let endpoint = `/campaigns/${campaignId}`

    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(accountSelected),
    }

    fetchSave(endpoint, options)
  }

  useEffect(() => {
    if (dataSave) {
      if (campaignId) navigate(`/campaign/${campaignId}`)
    }
  }, [campaignId, dataSave, navigate])

  const handleAcceptConsent = () => {
    if (bankAccounts.redirection)
      window.location.href = bankAccounts.redirection
  }

  return (
    <>
      {loading ? (
        <div className="h-128 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="p-4 max-w-96 md:max-w-2xl">
            <div className="flex flex-col justify-center items-center">
              <SimpleSelector
                sourceItems={aspsps}
                setItemSelected={handleAspspSelectedChange}
                defaultItem={aspspSelected}
              />
            </div>

            <Button
              type="button"
              onClick={handleAccess}
              disabled={
                !aspspSelected || (bankAccounts && !bankAccounts.notAllowed)
              }
            >
              <FormattedMessage id="access" />
            </Button>

            <div className="flex flex-col justify-center items-center">
              <SimpleSelector
                disabled={
                  !bankAccounts ||
                  (bankAccounts &&
                    (bankAccounts.notAllowed || bankAccounts.redirection))
                }
                sourceItems={bankAccounts?.accounts}
                setItemSelected={setAccountSelected}
              />
            </div>

            <Button
              type="button"
              onClick={handleSaveAccount}
              disabled={!accountSelected}
            >
              <FormattedMessage id="save" />
            </Button>

            <Button
              type="button"
              onClick={handleAcceptConsent}
              disabled={!(bankAccounts && bankAccounts.redirection)}
            >
              <FormattedMessage id="accept_consents" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default BankAccountSelection
