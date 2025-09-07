import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import staticMovies from '../utils/staticMovies'

const WatchlistContext = createContext()

export { WatchlistContext }

export const useWatchlist = () => {
  const context = useContext(WatchlistContext)
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider')
  }
  return context
}

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchWatchlist()
    } else {
      setWatchlist([])
    }
  }, [isAuthenticated, user])

  const fetchWatchlist = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const userWatchlist = JSON.parse(localStorage.getItem(`watchlist_${user.id}`) || '[]')
      // Get full movie data for watchlist items
      const watchlistMovies = userWatchlist.map(movieId => 
        staticMovies.find(movie => movie.id === movieId)
      ).filter(Boolean)
      
      setWatchlist(watchlistMovies)
    } catch (error) {
      console.error('Error fetching watchlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToWatchlist = async (movieId) => {
    if (!user) return { success: false, error: 'Please login to add movies to watchlist' }
    
    try {
      const userWatchlist = JSON.parse(localStorage.getItem(`watchlist_${user.id}`) || '[]')
      
      if (userWatchlist.includes(movieId)) {
        return { success: false, error: 'Movie already in watchlist' }
      }
      
      const updatedWatchlist = [...userWatchlist, movieId]
      localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(updatedWatchlist))
      
      // Refresh watchlist
      await fetchWatchlist()
      return { success: true, message: 'Added to watchlist' }
    } catch (error) {
      return { success: false, error: 'Failed to add to watchlist' }
    }
  }

  const removeFromWatchlist = async (movieId) => {
    if (!user) return { success: false, error: 'Please login to manage watchlist' }
    
    try {
      const userWatchlist = JSON.parse(localStorage.getItem(`watchlist_${user.id}`) || '[]')
      const updatedWatchlist = userWatchlist.filter(id => id !== movieId)
      localStorage.setItem(`watchlist_${user.id}`, JSON.stringify(updatedWatchlist))
      
      // Refresh watchlist
      await fetchWatchlist()
      return { success: true, message: 'Removed from watchlist' }
    } catch (error) {
      return { success: false, error: 'Failed to remove from watchlist' }
    }
  }

  const isInWatchlist = (movieId) => {
    if (!user) return false
    const userWatchlist = JSON.parse(localStorage.getItem(`watchlist_${user.id}`) || '[]')
    return userWatchlist.includes(movieId)
  }

  const value = {
    watchlist,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    refreshWatchlist: fetchWatchlist
  }

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  )
}
