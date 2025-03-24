import { useState } from 'react'
import Icons from "../icons/Icons.jsx";
import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if(!isOpen) {
      setIsRegisterOpen(isOpen)
    }
  };

  const toggleMenuRegister = () => {
    setIsRegisterOpen(!isRegisterOpen)
  }

  return (
    <>
      {/* Mobile view*/}
      <nav className="bg-primary text-white md:hidden">
        <div className="flex justify-between items-center p-4">
          <Link to="/">
            <h1 className="text-lg font-bold">OpenHope</h1>
          </Link>
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
          >
            <Icons.Hamburger isOpen={isOpen}/>
          </button>
        </div>

        <div className={`${isOpen ? "block" : "hidden"}`}>
          <button className="block px-4 py-2" onClick={toggleMenuRegister}>Registrarse</button>

          <div className={`${isRegisterOpen ? "block pl-2" : "hidden"}`}>
            <a href="#" className="block px-4 py-2">Crear organización</a>
            <a href="#" className="block px-4 py-2">Crear cuenta usuario</a>
          </div>
        
          <Link to="/login" className="block px-4 py-2">Entrar</Link>
        </div>
      </nav>

      {/* Desktop view*/}
      <nav className="h-16 w-full hidden md:block">
        <div className='h-full flex justify-end items-center'>
          <Link to="/register" className="block px-4 py-2 mx-2 text-white rounded-lg bg-primary min-w-28 text-center shadow-sm">Registrarse</Link>
          <Link to="/login" className="block px-4 py-2 mx-2 text-white rounded-lg bg-primary min-w-28 text-center shadow-sm">Entrar</Link>
        </div>
      </nav>
    </>
  )
}

export default NavBar