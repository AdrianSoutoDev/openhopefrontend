import { FormattedMessage } from 'react-intl'
import ResumeItem from './ResumeItem'
import { Link, useNavigate } from 'react-router-dom'

function ResumeCampaigns({ className, data, title, resumeType, searchParams }) {
  const navigate = useNavigate()

  const onClickShowMore = (e) => {
    e.preventDefault()
    navigate('/searcher', {
      state: {
        searchParams: searchParams,
      },
    })
  }

  return (
    <>
      <div className={`my-5 ${className}`}>
        <h2 className="mb-2 text-2xl text-info font-semibold">{title}</h2>
        <div className="w-full text-info rounded-lg shadow-sm border flex flex-col justify-around md:flex-row p-2">
          {data?.map((item, index) => (
            <div key={index} className="flex flex-1">
              <ResumeItem item={item} resumeType={resumeType} />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Link
            to="/"
            onClick={onClickShowMore}
            className="px-4 py-2 text-emerald-500 hover:underline"
          >
            <FormattedMessage id="show_more" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default ResumeCampaigns
