import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Button, ButtonDanger } from '../shared/Buttons'
import { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import BankAccountPill from '../shared/BankAccountPill'
import { InfoMessage } from '../shared/Messages'
import UserBankAccountSelector from '../shared/UserBankAccountSelector'
import { Link } from 'react-router-dom'

function DonationModal({ modalOpen, setModalOpen, amount }) {
  const { data, loading, fetch } = useFetch()
  const hasFetched = useRef(false)
  const [bankAccounts, setBankAccounts] = useState()
  const [AccountOnPill, setAccountOnPill] = useState()
  const [bankAccountSelected, setBankAccountSelected] = useState()

  useEffect(() => {
    if (!hasFetched.current && modalOpen) {
      const source = {
        endpoint: `/bank-accounts/all`,
        options: { method: 'GET' },
      }
      fetch(source.endpoint, source.options)
      hasFetched.current = true
    }
  }, [fetch, modalOpen])

  useEffect(() => {
    if (!modalOpen && data) {
      const favorite = data.find((account) => account.favorite)
      setAccountOnPill(favorite)
      setBankAccounts(data)
    }
  }, [data, modalOpen])

  useEffect(() => {
    if (data) {
      const favorite = bankAccountSelected
        ? bankAccountSelected
        : data.find((account) => account.favorite)
      setAccountOnPill(favorite)
      setBankAccounts(data)
    }
  }, [data, setBankAccounts, bankAccountSelected])

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">
              <InfoMessage id="select_bank_account_donation" />
            </h2>
            <p className="mb-2 text-info">
              <FormattedMessage
                id="you_gonna_donate"
                values={{
                  amount: (
                    <span className="font-bold">
                      <FormattedNumber
                        value={amount}
                        style="currency"
                        currency="EUR"
                      />
                    </span>
                  ),
                }}
              />
            </p>

            <BankAccountPill bankAccount={AccountOnPill} />

            {bankAccounts?.length > 1 && (
              <div className="pt-5">
                <label className="text-info">
                  <FormattedMessage id="select_another_account" />
                </label>

                <UserBankAccountSelector
                  emptyText={<FormattedMessage id="selection_bank_entity" />}
                  sourceItems={bankAccounts}
                  setItemSelected={setBankAccountSelected}
                  disabled={loading}
                  defaultItem={AccountOnPill}
                />
              </div>
            )}

            <label className="text-info">
              <FormattedMessage
                id="you_can_add_new_account"
                values={{
                  link: (
                    <Link to={`/me`} className="underline">
                      <FormattedMessage id="your_profile" />
                    </Link>
                  ),
                }}
              />
            </label>

            <div className="flex mt-5">
              <Button
                type="button"
                onClick={() => console.log('ok')}
                className={'mr-1'}
              >
                <FormattedMessage id="accept" />
              </Button>
              <ButtonDanger
                onClick={() => setModalOpen(false)}
                className={'ml-1'}
              >
                <FormattedMessage id="cancel" />
              </ButtonDanger>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DonationModal
