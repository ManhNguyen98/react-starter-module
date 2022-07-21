import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Footer from 'layout/Footer'
import Header from 'layout/Header'
import PrivateRoute from 'routes/PrivateRoute'
import Home from 'modules/home/Loadable'

import './styles/styles.scss'

function App() {
  return (
    <div>
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<h1>Products</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route element={<PrivateRoute />}>
            <Route path="/personal" element={<h1>Personal</h1>} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
