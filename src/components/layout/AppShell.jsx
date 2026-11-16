import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export const AppShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
        <Sidebar/>
        <div className="min-h-screen md:pl-64">
            <Header/>
            <main className="px-6 py-6">
                {children}
            </main>
        </div>
    </div>
  )
}
