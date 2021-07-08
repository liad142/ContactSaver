import React,{useState,useEffect,useContext} from 'react';
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext

    const authContext = useContext(AuthContext)
    const {login,error,clearErrors,isAuthenticated} = authContext


    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/') // בודק האם היוזר כבר מחובר . אם כן שולח אותו לדף HOME
        }
        if(error ==='Invalid credentials'){
            setAlert(error,'danger')
            clearErrors()
        }
        //es-lint-disable-next-line
    },[error,isAuthenticated,props.history,clearErrors,setAlert])

    const [user,setUser] = useState({
        email:'',
        password:''
    })

    const {email,password} = user

    const onChange = (e) =>{
        // e.target.name מתייחס ומסתכל על כל הNAME בתוך הפורם
        //e.target.value הוואליו של כל NAME
        // אנחנו בעצם מוסיפים לUSER את הערכים שנוספו

        setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault();
        if(email===''||password===''){
            setAlert('please fill all fields','danger')
        } else{
            login({
                email:'',
                password:''
            })
        }
    }

    return (
        <div className={'form-container'}>
            <h1>Account Login</h1>
            <form onSubmit={onSubmit}>
                <div className={'form-group'}>
                    <label htmlFor="{'e-mail'}">E-mail</label>
                    <input type="email" name={'email'} value={email} onChange={onChange}/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor="{'password'}">Password</label>
                    <input type="password" name={'password'} value={password} onChange={onChange}/>
                </div>
                <input type="submit" value={'login'} className={'btn btn-danger btn-block'}/>
            </form>
        </div>
    );
};

export default Login;
