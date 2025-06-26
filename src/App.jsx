import { Fragment, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Login, Register, Details, Pricing, ProtectedRoute } from './components';
import Billing from './components/Billing/Billing';

import { 
  Home, 
  DMCA, 
  EULA, 
  Support, 
  Terms, 
  Privacy, 
  Changelog, 
  Users, 
  Index, 
  Success, 
  Cancel 
} from './UI';

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useSelector((state) => state.user.currentUser?.token)

  // Effect to handle redirects for authenticated users
  useEffect(() => {
    if (currentUser && location.pathname === "/") {
      navigate("/home", { replace: true })
    }
  }, [currentUser, location.pathname, navigate])

  return (
    <Fragment>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={currentUser ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/register" element={currentUser ? <Navigate to="/home" replace /> : <Register />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/details" element={<Details />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/users" element={<Users />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/dmca" element={<DMCA />} />
          <Route path="/eula" element={<EULA />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/changelog" element={<Changelog />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Fragment>
  )
}

export default App
