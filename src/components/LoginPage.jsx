import './LoginPage.css'


const LoginPage = () => {
  return (
    <div className="login-page">
      <h2>Login Page</h2>
      <div className="form-container">
        <h3>Login</h3>
        <form>
          <div className="formRow">
            <label htmlFor="username">Username </label>
            <input type="text" placeholder="Username" />
          </div>
          <div class="formRow">
            <label htmlFor="password">Password </label>
            <input type="password" placeholder="Password" />
          </div>
          
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;