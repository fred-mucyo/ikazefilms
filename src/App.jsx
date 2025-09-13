import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { WatchlistProvider } from './context/WatchlistContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDetail from './pages/MovieDetail'
import StaticMovieDetail from './pages/StaticMovieDetail'
import StaticMovies from './pages/StaticMovies'
import Watchlist from './pages/Watchlist'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import AnalyticsTracker from './components/AnalyticsTracker'
import SeriesDetail from "./pages/SeriesDetail";


import TermsOfService from "./LegalPages/TermsOfServices";
import PrivacyPolicy from "./LegalPages/PrivacyPolicy";
import './styles/App.css'

function App() {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <Router>
           <AnalyticsTracker />
            <div className="App">
  


             <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/movie/:id" element={<MovieDetail />} />
                  <Route path="/static-movie/:id" element={<StaticMovieDetail />} />
                  <Route path="/static-movie" element={<StaticMovies />} />

                  <Route path="/series/:id" element={<SeriesDetail />} />

                  
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/change-password" element={<ChangePassword />} />



            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
      </WatchlistProvider>
    </AuthProvider>
  )
}

export default App
