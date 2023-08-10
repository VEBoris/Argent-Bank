import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authFailed } from "../store";
import { useDispatch, useSelector } from "react-redux";
import LoginHeader from '../components/LoginHeader';

const loginUrl = 'http://localhost:3001/api/v1/user/login'
export const userUrl = 'http://localhost:3001/api/v1/user/profile'

function SignInPage(){
    const onNavigate = useNavigate()
    const dispatch = useDispatch()
    const login = useSelector((state) => state.login)
    const [isChecked, setChecked] = useState(localStorage.getItem('isRemember') || false);
    const [credentials, setCredentials] = useState({
    email: '',
    password: ''
    })
    const handleInput = (e) => {
        const placeholder = e.target.placeholder
        const value = e.target.value
        let name = e.target.id
        if(name === 'username'){
            name = 'email'
        }
        setCredentials({
            ...credentials,
            [name]: value
        })
        console.log(placeholder)
    }
    const UserAuth = (e) => {
        e.preventDefault()
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,     
                password: credentials.password
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('jwt', data.body.token)
            const token = localStorage.getItem('jwt')
            if(token){
                onNavigate(`/user`)
            }else{
                dispatch(authFailed()) 
            }
        })
        .catch(err => {
            console.log(err + 'identifiant incorrenct')
            if(!login.isAuth){
                document.querySelector('.error-message').innerHTML = 'identifiant incorrenct'
            }
        })
    }
    
    const onCheckboxChange = (key, value) => {
        localStorage.setItem(key, value)
        localStorage.setItem('email', credentials.email)
        localStorage.setItem('password', credentials.password)
        setChecked(value)
    };
    
    // const isRemember = localStorage.getItem('isRemember')
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')
    useEffect(() => {
        if(JSON.parse(!isChecked)){
            localStorage.removeItem('email')
            localStorage.removeItem('password')
        }
    },[credentials.email, credentials.password, isChecked])
    return(
        <div className="login">
            <LoginHeader />
            <main style={{padding:'8rem'}} className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={UserAuth}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input onChange={handleInput} placeholder={email} type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input onChange={handleInput} placeholder={password} type="current-password" id="password" />
                        </div>
                        <div className="input-remember">
                            <label htmlFor="remember-me">Remember me</label>
                            <input type="checkbox" checked={JSON.parse(isChecked)} value={isChecked} onChange={(e) => onCheckboxChange('isRemember', e.target.checked)} id="remember-me" />
                        </div>
                        <button className="sign-in-button">Sign In</button> 
                        <p className="error-message"></p>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default SignInPage