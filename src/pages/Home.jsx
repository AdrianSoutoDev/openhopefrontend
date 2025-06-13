import { FormattedMessage } from 'react-intl'
import PageTitle from '../components/shared/PageTitle'
import Searcher from '../components/home/Searcher'

function Home() {
  return (
    <>
      <div className="mt-10 p-2 flex flex-col justify-center w-full">
        <PageTitle
          title={<FormattedMessage id="welcome" />}
          className={'text-center'}
        />
        <div className="mt-10 p-2 flex justify-center w-full">
          <Searcher className={'w-full max-w-96 md:max-w-xl'} />
        </div>
      </div>
    </>
  )
}

export default Home
