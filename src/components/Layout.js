import React from 'react'
import { NavBar } from './NavBar'

export const Layout = ({children}) => {
  return (
    <>
        <div className='container'>
            <NavBar/>
            {children}
        </div>
    </>
  )
}
