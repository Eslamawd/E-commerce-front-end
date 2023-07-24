import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "../../../featuers/user/userSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../../config/roles"


const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [numperphone, setNumperphone] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onLastnameChanged = e => setLastname(e.target.value)
    const onNumperphoneChanged = e => setNumperphone(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles, numperphone, firstname, lastname })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : ""
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <div className="form__action-buttons">
                     
                    </div>
                </div>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    placeholder="Username [3-20 letters]"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    placeholder="Password: [4-12 chars incl. !@#$%]"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />
                
              <input 
              type="text"
              name='firstname'
              placeholder='First Name'
              onChange={onFirstnameChanged}
              value={firstname}
               />
              <input 
              type="text"
              name='lastname'
              placeholder='Last Name'
              onChange={onLastnameChanged}
              value={lastname}
               />

              <input 
              type="number"
              name='numberphone'
              placeholder='Number phone'
              onChange={onNumperphoneChanged}
              value={numperphone}
               />

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
                <button
                            className="button"
                            title="Save"
                            disabled={!canSave}
                        >
                            Signup
                        </button>
            </form>
        </>
    )

    return content
}
export default NewUserForm