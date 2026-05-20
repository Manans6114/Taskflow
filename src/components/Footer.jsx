import '../css/Footer.css'
import { APP_NAME } from '../utils/constants'

function Footer() {
  return (
    <footer className='footer'>
      <p>
        {APP_NAME} © {new Date().getFullYear()} · Task manager workspace
      </p>
    </footer>
  )
}

export default Footer