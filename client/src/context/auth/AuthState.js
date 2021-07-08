import React, {useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from './authReducer'
import axios from "axios";
import setAuthToken from "../../utilis/setAuthToken";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR
} from '../types'

const AuthState = (props) => {
    console.log(props)
    const initalState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null
    }

    const [state, dispatch] = useReducer(authReducer, initalState)

const loadUser = async () =>{
        setAuthToken(localStorage.token)

      try{
          const res = await axios.get('/api/auth')
          dispatch({
              type:USER_LOADED,
              payload:res.data
          })

      }  catch (err){
          dispatch({type:AUTH_ERROR})
      }
};

//register user
const register = async formData =>{
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try{
            const res = await axios.post('/api/users',formData,config)
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data //res.data זו התשובה וזה בעצם הטוקן ואותו אנחנו מעבירים בפיילואד
            })
           await loadUser();
        }
        catch (err){
            dispatch({
                type:REGISTER_FAIL,
                payload:err.response.data.msg // אם יהיה ERR נקבל כאן את ההודעת ERR שרשמנו בראוט של היוזרס
            })
        }
}
//login user
    const login = async formData =>{
        console.log(formData)
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        try{
            const res = await axios.post('/api/auth',formData,config)
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data //res.data זו התשובה וזה בעצם הטוקן ואותו אנחנו מעבירים בפיילואד
            })
           loadUser();
        }
        catch (err){
            dispatch({
                type:LOGIN_FAIL,
                payload:err.response.data.msg // אם יהיה ERR נקבל כאן את ההודעת ERR שרשמנו בראוט של היוזרס
            })
        }
    }

//logout user
const logout = () => dispatch({type:LOGOUT})

//clear errors
    const clearErrors = () => dispatch({type:CLEAR_ERROR})

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user,
                register,clearErrors,loadUser,login,logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState
