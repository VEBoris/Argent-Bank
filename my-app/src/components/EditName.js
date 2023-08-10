import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { authSuccessful, editState } from "../store"
import { userUrl } from '../pages/Sign-in'

function EditName(){
    const login = useSelector((state) => state.login)
    const dispatch = useDispatch()
    const token = localStorage.getItem('jwt')
    const [newName, setNewName] = useState({
        firstName: '',
        lastName: ''
    })
    const handleInput = (e) => {
        const value = e.target.value
        let name = e.target.id
        setNewName({
            ...newName,
            [name] : value
        })
    }
    const saveName = (e) => {
        e.preventDefault()
        fetch(userUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                firstName: newName.firstName,
                lastName: newName.lastName
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.body)
            dispatch(authSuccessful(data.body))
        })
        .catch(err => console.log('Un erreur est survenu ' + err))
        dispatch(editState())
    }
    const cancel = () => {
        dispatch(editState())
    }
    return (
        <div className='header'>
            <h1>Welcome back</h1>
            <form onSubmit={saveName}>
                <label htmlFor='firstName'></label>
                <input onChange={handleInput} id="firstName" placeholder={login.firstName} type='text'></input>
                <label htmlFor='lastName'></label>
                <input onChange={handleInput} id="lastName" placeholder={login.lastName} type='text'></input>
                <div>
                    <input type='submit' className="edit-button" value='Save'/>
                    <button onClick={cancel} className="edit-button">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditName