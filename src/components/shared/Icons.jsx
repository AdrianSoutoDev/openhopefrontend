import React from 'react'

const Icons = {
  Hamburger: ({ isOpen }) => (
    <svg
      className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
      />
    </svg>
  ),

  DropDown: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  ),

  BackArrow: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 30 30" // Tamaño ampliado
      strokeWidth={3} // Grosor mantenido
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M26 15H4M14 6l-10 9 10 9" // Brazos aún más largos
      />
    </svg>
  ),

  Calendar: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
    >
      <mask id="ipSApplication0">
        <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
          <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
          <path
            fill="#fff"
            d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
          ></path>
        </g>
      </mask>
      <path
        fill="currentColor"
        d="M0 0h48v48H0z"
        mask="url(#ipSApplication0)"
      ></path>
    </svg>
  ),

  Info: ({ className }) => (
    <div className={`${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <circle cx="24" cy="14" r="2" fill="currentColor" />
        <rect x="22" y="20" width="4" height="12" fill="currentColor" />
      </svg>
    </div>
  ),
}

export default Icons
