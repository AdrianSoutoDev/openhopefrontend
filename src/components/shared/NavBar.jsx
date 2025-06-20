import { useContext, useState } from 'react'
import Icons from './Icons.jsx'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Button, ButtonLink } from './Buttons'
import GoBackContext from '../../context/GoBackContext.jsx'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout } = useContext(AuthContext)
  const { showGoBack, whereWeGo } = useContext(GoBackContext)

  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    setIsOpen(false)
    logout()
    navigate('/')
  }

  return (
    <>
      {/* Mobile view*/}
      <nav className="bg-primary text-white md:hidden relative z-50">
        <div className="flex justify-between items-center p-4">
          {showGoBack ? (
            <Link to={whereWeGo}>
              <Icons.BackArrow />
            </Link>
          ) : (
            <Link to="/" onClick={() => isOpen && toggleMenu()}>
              <h1 className="text-lg font-bold">
                <FormattedMessage id="app_title" />
              </h1>
            </Link>
          )}
          <button onClick={toggleMenu} className="focus:outline-none">
            <Icons.Hamburger isOpen={isOpen} />
          </button>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'}`}>
          {!isAuthenticated() && (
            <>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="block px-4 py-2"
              >
                <FormattedMessage id="signup" />
              </Link>

              <Link
                to="/login"
                onClick={toggleMenu}
                className="block px-4 py-2"
              >
                <FormattedMessage id="signin" />
              </Link>
            </>
          )}
          {isAuthenticated() && (
            <button className="block px-4 py-2" onClick={handleLogout}>
              <FormattedMessage id="signout" />
            </button>
          )}
        </div>
      </nav>

      {/* Desktop view*/}
      <nav className="h-16 w-full hidden md:block">
        <div className="h-full flex justify-between items-center">
          {showGoBack ? (
            <Link to={whereWeGo}>
              <h2 className="text-lg font-bold text-info">
                <FormattedMessage id="goBack" />
              </h2>
            </Link>
          ) : (
            <Link to="/" onClick={() => isOpen && toggleMenu()}>
              <h2 className="text-lg font-bold text-info">
                <FormattedMessage id="app_title" />
              </h2>
            </Link>
          )}

          {!isAuthenticated() && (
            <div className="flex">
              <ButtonLink
                link="/register"
                onClick={toggleMenu}
                className="min-w-28 mx-2"
              >
                <FormattedMessage id="signup" />
              </ButtonLink>
              <ButtonLink link="/login" className="min-w-28 mx-2">
                <FormattedMessage id="signin" />
              </ButtonLink>
            </div>
          )}
          {isAuthenticated() && (
            <Button className="min-w-28 mx-2" onClick={handleLogout}>
              <FormattedMessage id="signout" />
            </Button>
          )}
        </div>
      </nav>
    </>
  )
}

export default NavBar
