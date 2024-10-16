import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout());
            navigate("/login");         //navigates user to login page when they logout
        })
        .catch((error)=> {
            console.log('Error deleting session', error);
        })
    }

    return (
        <button
            className='dark:bg-gray-800 dark:text-white inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}>Logout
        </button>
    )
}

export default LogoutBtn;
