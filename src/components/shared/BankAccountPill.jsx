import { InfoMessage } from './Messages'

function BankAccountPill({ bankAccount }) {
  return (
    <>
      <div className="flex items-center p-3 border border-gray-200 rounded-sm">
        <div>
          <span
            className={`text-3xl ${
              bankAccount?.favorite ? 'text-amber-400' : 'text-gray-200'
            }`}
          >
            ★
          </span>
        </div>
        <div className="ml-2">
          <div className="flex-row md:flex">
            <div>
              <InfoMessage id="bank_entity_label" />:
            </div>
            <div className="ml-1 font-semibold text-info">
              {bankAccount?.aspsp.name}
            </div>
          </div>
          <div className="flex-row md:flex">
            <div>
              <InfoMessage id="bank_account_label" />:
            </div>
            <div className="ml-1 font-semibold text-info">
              {bankAccount?.name}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BankAccountPill
