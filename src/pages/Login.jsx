import '../css/Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { validateEmail, validateName, validatePassword } from '../utils/validators'
import { APP_NAME } from '../utils/constants'

function HexagonLogo() {
  return (
    <svg
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20 2L34.64 11V29L20 38L5.36 29V11L20 2Z'
        stroke='#6f63ff'
        strokeWidth='1.5'
        fill='none'
      />
    </svg>
  )
}

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateName(formData.name)) {
      setError('Please enter your full name.')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!validatePassword(formData.password)) {
      setError(
        'Password must be 6+ chars with one uppercase letter and one number.'
      )
      return
    }

    setError('')

    login({
      name: formData.name,
      email: formData.email
    })

    navigate('/home', { replace: true })
  }

  return (
    <div className='login-page'>
      <div className='login-card glass-panel'>
        <div className='login-mark'>
          <HexagonLogo />
        </div>

        <h1>{APP_NAME}</h1>

        <p className='login-subtitle'>
          Sign in to manage your tasks
        </p>

        <form
          className='login-form'
          onSubmit={handleSubmit}
          autoComplete='off'
        >
          <label>
            <span>Full Name</span>

            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='e.g. Deepak Kumar'
              autoComplete='off'
            />
          </label>

          <label>
            <span>Email Address</span>

            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='you@example.com'
              autoComplete='off'
            />
          </label>

          <label>
            <span>Password</span>

            <div className='password-field'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Min 6 chars, 1 uppercase, 1 number'
                autoComplete='new-password'
              />

              <button
                type='button'
                className='icon-button'
                onClick={() =>
                  setShowPassword((current) => !current)
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <button type='submit' className='primary-button'>
            Sign In →
          </button>

          <div className='form-note'>
            {error ? (
              <p className='form-error'>{error}</p>
            ) : (
              <p className='form-hint'>
                Password must be 6+ characters with an uppercase
                letter and a number.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login