import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuthStatus } from '../store/authActions'

const Protected = ({ children, authentication }) => {

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getAuthStatus()) 
    },[])

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, authentication, navigate])

    return loader ? null : (
        <>{children}</>
    )
}

export default Protected