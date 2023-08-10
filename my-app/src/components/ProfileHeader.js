import argentBankLogo from "../img/argentBankLogo.png"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { resetState } from "../store"

function ProfileHeader(props){
    const firstName = props.firstName
    const dispatch = useDispatch()
    const logOut = () => {
        localStorage.clear()
        dispatch(resetState())
    }
    return(
        <nav className="main-nav">
            <NavLink to='/' className="main-nav-logo">
                <img
                className="main-nav-logo-image"
                src={argentBankLogo}
                alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div className='userheader'>
                <i style={{
                    'marginRight': '2rem',
                    'fontWeight': 'bold'
                    }} 
                    className="fa fa-user-circle">{firstName}
                    </i>
                <NavLink onClick={logOut} to='/' className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    log out
                </NavLink>
            </div>
        </nav>
    )
}

export default ProfileHeader