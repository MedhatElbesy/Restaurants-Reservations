import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../layouts/loader/loader';
import { loginUser } from '../../../slices/auth/loginSlice.jsx'; 


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })); 
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/');
    }
  }, [status, navigate]);

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <main className='container-fluid login'>

      <section className='row'>
      
        <form
         className='col-4 offset-3'
         onSubmit={handleLogin}>
          
          <h1 className='text-center text-light'>Login</h1>

          <div className='mb-1'>

            <label
             htmlFor='email'
             className='form-label text-light h6'>
             Email
            </label>

            <input
              type='email'
              id='email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className='mb-3'>

            <label
             htmlFor='password'
             className='form-label text-light h6'>
              Password
            </label>

            <input
              type='password'
              id='password'
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {status === 'failed' && (
            <div className='text-center text-danger'>
              <span>Invalid email or password. Please check your credentials and try again.</span>
            </div>
          )}

          <div className='text-center my-5'>

            <button
             type='submit'
             className='btn btn-primary btn-lg btn-block'
             disabled={status === 'loading'}>
              Login
            </button>

          </div>

        </form>
        
      </section>

    </main>
  );
};

export default LoginForm;
