import { useState } from 'react'
import "./index.css"
import { Navbar, Welcome, Footer, Service, Transactions } from './components'

export default function App() {
  return (
    <div className='min-h-screen'>
        <div className='gradient-bg-welcome'>
            <Navbar />
            <Welcome />
        </div>
        <Service />
        <Transactions />
        <Footer />
    </div>
  )
}