import { Link } from 'react-router-dom'
import Navigation from './components/Navigation'

const ErrorPage = () => {
  return (
    <div className="container">
      <Navigation />
      <h1>Oops, something went wrong</h1>
      <p> You can go back to the <Link to="/">main mage</Link></p>
    </div>
  )
}

export default ErrorPage;