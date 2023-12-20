import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import App from '../App';
import { useSelector } from 'react-redux';

export default function PrivateOutlet () {
    const auth = useSelector(state => state.reducer.auth.status);
  return (
    auth ? <App></App> : <Navigate to={'/'}/>
  )
}