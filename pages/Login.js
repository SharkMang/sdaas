import React, { useMemo, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { isValidEmail } from '../src/utils/validation.js'

const Login = () => {

  const users = [
    {
      email:'em@gmail.com',
      password: 'pw1'
    },{
      email: 'email2@gmail.com',
      password: 'password2'
    },{
      email: 'email3@gmail.com',
      password: 'password3'
    },{
      email: 'email4@gmail.com',
      password: 'password4'
    },
  ];

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const inputEmail = useRef(null)
  
  const emailPlaceholder = useMemo(() => errors.email || 'Enter email.', [ errors.email ]);
  const passwordPlaseholder = useMemo(() => errors.password || 'Enter password.', [errors.password]);

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value)
  };

  const handleOnChangePassword = (e) => {
    setPassword(e.target.value)
  };

  const eventEnterLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    setPassword('');
    setEmail('');

    if (validateUser(user)) {
      localStorage.setItem('isAuthenticated', true);
    } else {
      localStorage.setItem('isAuthenticated', false);
      setErrors({ email:'InCorrect Email.', password: 'Incorrect Password.' })

      inputEmail.current.focus();
    }
  };

  const validateUser = ({ email, password }) => {
    if (isValidEmail(email)) {
      const user = users.find(i => i.email === email)
      return user && user.password === password
    } else {
      return false;
    }
  }
  
  return (
    localStorage.getItem('isAuthenticated') === 'true' ? (
      <Redirect to='/home'/>
    ) : (
      <div>
      <header className='header'>
        <h1 className='h1'>LogIn:</h1>
      </header>
      <form className='login-form'>
        <input 
          className='login-input' 
          type='email' 
          name='email' 
          placeholder={emailPlaceholder} 
          value={email} 
          ref={inputEmail}
          onChange={handleOnChangeEmail}/>
        <input 
          className='login-input' 
          type='password' 
          name='password' 
          placeholder={passwordPlaseholder} 
          value={password} 
          onChange={handleOnChangePassword}/>
        <input className='btn-login-logout' type='submit' name='send' value='Login' onClick={eventEnterLogin}/>
      </form>
    </div>
    )
    
  );
}

export default React.memo(Login);