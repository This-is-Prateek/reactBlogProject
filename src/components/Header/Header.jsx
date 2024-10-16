import React, { useState, useEffect } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [Darkmode , setDarkmode] = useState(localStorage?.getItem("theme") ? localStorage.getItem("theme") : 0);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (Darkmode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [Darkmode]);

  const toggleMode = () => {
    const newMode = !Darkmode;
    setDarkmode(newMode);
    localStorage.setItem("theme", newMode ? 'dark' : 'light');
  }

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500 dark:bg-gray-800 dark:text-white'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)} className={` inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${location.pathname === item.slug ? "text-white" : ""}`}>{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            <li>
              <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={toggleMode}>{Darkmode ? "Light" : "Dark"}</button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
