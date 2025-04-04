import { useContext, useState } from 'react'
import Icons from "./Icons.jsx"
import { Link } from "react-router-dom"
import AuthContext from '../../context/AuthContext.jsx'
import { useNavigate } from "react-router-dom"
import { FormattedMessage } from 'react-intl'
import { Button, ButtonLink } from './Buttons'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const { isAuthenticated, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if(!isOpen) {
      setIsRegisterOpen(isOpen)
    }
  };

  const toggleMenuRegister = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  const handleLogout = () => {
    setIsOpen(false)
    logout()
    navigate("/");
  }

  return (
    <>
      {/* Mobile view*/}
      <nav className="bg-primary text-white md:hidden">
        <div className="flex justify-between items-center p-4">
          <Link to="/" onClick={() => isOpen && toggleMenu()}>
            <h1 className="text-lg font-bold">
              <FormattedMessage id='app_title' />
            </h1>
          </Link>
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
          >
            <Icons.Hamburger isOpen={isOpen}/>
          </button>
        </div>

        <div className={`${isOpen ? "block" : "hidden"}`}>
        { !isAuthenticated &&
          <>
          <button className="block px-4 py-2" onClick={toggleMenuRegister}>
            <FormattedMessage id='signup' />
          </button>

          <div className={`${isRegisterOpen ? "block pl-2" : "hidden"}`}>
            <a href="#" onClick={toggleMenu} className="block px-4 py-2">
              <FormattedMessage id='create_organization' />
            </a>
            <a href="#" onClick={toggleMenu} className="block px-4 py-2">
              <FormattedMessage id='create_user_account' />
            </a>
          </div>
        
          <Link to="/login" onClick={toggleMenu} className="block px-4 py-2">
            <FormattedMessage id='signin' />
          </Link>
          </>
        }
        { isAuthenticated &&
          <button className="block px-4 py-2" onClick={handleLogout}>
            <FormattedMessage id='signout' />
          </button>
        }
        </div>
      </nav>

      {/* Desktop view*/}
      <nav className="h-16 w-full hidden md:block">
        <div className='h-full flex justify-end items-center'>
          { !isAuthenticated &&
            <>
              <ButtonLink link="/register" className="min-w-28 px-4 py-2 mx-2">
                <FormattedMessage id='signup' />
              </ButtonLink>
              <ButtonLink link="/login" className="min-w-28 px-4 py-2 mx-2">
                <FormattedMessage id='signin' />
              </ButtonLink>
            </>
          }
          { isAuthenticated &&
            <Button className="min-w-28 px-4 py-2 mx-2" onClickAction={handleLogout}>
              <FormattedMessage id='signout' />
            </Button>
          }
          </div>
      </nav>
    </>
  )
}

export default NavBar