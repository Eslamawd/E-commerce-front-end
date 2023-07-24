import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NewUserForm from './NewUser'
import { useDispatch } from 'react-redux'
import { logIn } from '../../../featuers/auth/authSlice'
import { 
  useLoginMutation
} from '../../../featuers/auth/authApiSlice'


import usePersist from '../../../hooks/usePersist'


import './Auth.css'
 




const Auth = () => {


  const userRef = useRef()
  const errRef = useRef()
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()
  

  const navigate = useNavigate()
  const dispatch = useDispatch()



  const [logiin, {  isLoading, isSuccess }] = useLoginMutation()


  
  


  useEffect(() => {
    userRef.current.focus()

  }, [])
  useEffect(() => {

    setErrMsg('')

  }, [username, password])
  
  
  useEffect(() => {
    if (isSuccess) {
        setUsername('')
        setPassword('')
        
        navigate('/')
    }
}, [isSuccess, navigate])




  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onPersistChanged = (e) => setPersist(prev => !prev)


  const onSaveUserClicked = async (e) => {
     e.preventDefault()
  
     try {
        const { accessToken } = await logiin({ username, password }).unwrap()
        dispatch(logIn({ accessToken }))
        setUsername('')
        setPassword('')
        navigate('/')
      } catch (err) {
      
          if (!err.status) {
            setErrMsg('No Server Response');
          } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
          setErrMsg('Unauthorized');
           } else {
           setErrMsg(err.data?.message);
              }
            
          errRef.current.focus();
      }
   }

   







    if(isSignUp) {
     
          if (isLoading) {
            return (
              <h1>
                pleace wait.....
              </h1>
            )
          }     
      


        }


  return (
    <div className="auth">
        <div className="form">
        <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

            {isSignUp ? (
              <>
              <NewUserForm />
               </>
            ): (
            <form onSubmit={onSaveUserClicked}>
    
              <>
            <input 
            type="username"
            name='username'
            ref={userRef}
            placeholder='User Name'
            onChange={onUsernameChanged}
            value={username}
             />
             <input 
             type="password"
             name='password'
             placeholder='password'
             onChange={onPasswordChanged}
             value={password}
             />
              </>
             
            
        

                  <div>

                    <p ref={errRef} style={{
              display: errMsg? "none" : "block",
              color: "red",
              fontSize: "12px", 
              alignSelf: "flex-end",
              marginRight: "5px",
              }}> </p>
            </div>

            <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={onPersistChanged}
                            checked={persist}
                        />
                        Trust This Device
                    </label>



          
                  <button className='button' type="submit">
                  {isLoading? "Loding..." : isSignUp ? "Signup" : "Log In"}
                  </button>

            </form>
  )} 
    <div>
              <span style={{ fontSize: "12px", cursor: "pointer",}} onClick={() => { setIsSignUp((prev)=>!prev)}}>
                {isSignUp ? "Already have an account. Login" : "Don't have an account? Sign Up"}
                </span>
              </div>
        </div>
    </div>
  )
}

export default Auth