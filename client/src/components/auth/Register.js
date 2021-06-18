import React, {useContext, useState,useEffect} from 'react';
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext

    const authContext = useContext(AuthContext)
    const {register,error,clearErrors,isAuthenticated} = authContext

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/') // בודק האם היוזר כבר מחובר . אם כן שולח אותו לדף HOME
        }
        if(error==='user already exists'){
            setAlert(error,'danger')
            clearErrors()
        }
        //es-lint-disable-next-line
    },[error,isAuthenticated,props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = user

    const onChange = (e) => {
        // e.target.name מתייחס ומסתכל על כל הNAME בתוך הפורם
        //e.target.value הוואליו של כל NAME
        // אנחנו בעצם מוסיפים לUSER את הערכים שנוספו
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('please enter all fields', 'danger')
        } else if (password !== password2) {
            setAlert('password do not match', 'danger')
        } else {
            register({
                name,email,password
            })
        }
    }

    return (
        <div className={'form-container'}>
            <h1>Account Register</h1>
            <form onSubmit={onSubmit}>
                <div className={'form-group'}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name={'name'} value={name} onChange={onChange} required/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor="{'e-mail'}">E-mail</label>
                    <input type="email" name={'email'} value={email} onChange={onChange} required/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor="{'password'}">Password</label>
                    <input type="password" name={'password'} value={password} onChange={onChange} required minLength={6}/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor="{'password2'}">Confirm Password</label>
                    <input type="password" name={'password2'} value={password2} onChange={onChange} required/>
                </div>
                <input type="submit" value={'register'} className={'btn btn-danger btn-block'}/>
            </form>
        </div>
    );
};

export default Register;
