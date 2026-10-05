import Loginform from '../../components/loginForm/LoginForm';

const Login = ({ onLogin }) => {
  return (
    <div>
      <h1>Login</h1>
      <Loginform onLogin={onLogin} />
    </div>
  );
};

export default Login;