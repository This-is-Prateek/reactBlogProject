import { useEffect } from "react";
import { useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .catch(console.log('Error getting user info'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Header />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
