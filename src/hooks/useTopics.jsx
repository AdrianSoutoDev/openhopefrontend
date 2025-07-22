import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import useFetch from './useFetch'

const useTopics = () => {
  const [topicString, setTopicString] = useState('')
  const [topics, setTopics] = useState([])
  const [topicsError, setTopicsError] = useState()

  const hasFetched = useRef(false)
  const { data, loading, fetch } = useFetch()

  const handleTopics = (e) => {
    setTopicString(e.target.value)

    if (topicsError) {
      setTopicsError(null)
    }

    const newTopics = e.target.value.trim().split(' ')

    if (newTopics.length <= 5) {
      setTopics(newTopics.filter((t) => t.length))
    } else {
      setTopicsError(<FormattedMessage id="topics_max_exceeded" />)
    }
  }

  const getOrganizationTopics = (id) => {
    if (!hasFetched.current) {
      const endpoint = `/topics?organization=${id}`
      const options = { method: 'GET' }
      fetch(endpoint, options)
      hasFetched.current = true
    }
  }

  useEffect(() => {
    if (data) {
      const topicsMaped = data.topics.map((t) => t.name)
      setTopics(topicsMaped)
      setTopicString(topicsMaped.join(' '))
    }
  }, [data, setTopicString, setTopics])

  return {
    topicString,
    handleTopics,
    topics,
    topicsError,
    getOrganizationTopics,
    loading,
  }
}

export default useTopics
