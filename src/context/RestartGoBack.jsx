import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import GoBackContext from './GoBackContext'
import { matchPath } from 'react-router-dom'

const RestartGoBack = ({ routesAvoidToGoBack }) => {
  const location = useLocation()
  const { restart } = useContext(GoBackContext)

  useEffect(() => {
    const shouldRestart = routesAvoidToGoBack.every(
      (routePattern) => !matchPath(routePattern, location.pathname),
    )

    if (shouldRestart) {
      restart()
    }
  }, [location.pathname, restart, routesAvoidToGoBack])

  return null
}

export default RestartGoBack
