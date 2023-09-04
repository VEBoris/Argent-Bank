import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { userUrl } from "./Sign-in"
import { authSuccessful, authFailed, editState } from "../store";
import ProfileHeader from "../components/ProfileHeader";
import EditName from "../components/EditName";

function UserPage(){
    const token = localStorage.getItem('jwt')
    const dispatch = useDispatch()
    const login = useSelector((state) => state.login)
    const editToggle = () => {
        dispatch(editState())  
    }
    useEffect(() => {
        if(token){
            fetch(userUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer' + token
                }
            })
            .then(res => res.json())
            .then(data => {
                dispatch(authSuccessful(data.body))
            })
            .catch(err => dispatch(authFailed()))
        }
    })
    if(login.isAuth){
        return(
            <div className="userpage">
                <ProfileHeader firstName={login.firstName}/>
                <main className="main bg-dark">
                    {!login.isEdit ? (<div className="header">
                        <h1>Welcome back<br />{login.firstName + ' ' + login.lastName}</h1>
                        <button onClick={editToggle} className="edit-button">Edit Name</button>
                    </div>) : (
                        <EditName />
                    )}
                    <h2 className="sr-only">Accounts</h2>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                            <p className="account-amount">$184.30</p>
                            <p className="account-amount-description">Current Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default UserPage