'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import MobileMenu from './mobile-menu'

export default function Header() {

  const [top, setTop] = useState<boolean>(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }  

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className='bg-gray-901'>
      <div className="max-w-md mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-32">
          {/* Desktop navigation */}
          <nav className="leading-loose hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="bg-gray-902 grow rounded-full flex justify-center flex-wrap items-center">
              <li>
                <Link href="#0" className="font-medium text-gray-400 hover:text-gray-200 h-14 w-20 justify-center items-center flex transition duration-150 ease-in-out">support</Link>
              </li>
              <li className='w-32 text-center'><Link href="/"><span className="font-semibold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-orange-101 to-orange-100">socialntw</span></Link></li>
              <li>
                <Link href="/signin" className="font-medium text-gray-400 hover:text-gray-200 h-14 w-20 justify-center items-center flex transition duration-150 ease-in-out">login</Link>
              </li>
            </ul>

          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
