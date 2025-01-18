import { useState, useContext } from 'react';
import { login, register } from '../api/authApi';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(email, password);
      localStorage.setItem('accessToken', data.accessToken.access_token);
      setUser(data.user);
      console.log(data.user,data.accessToken);
      console.log(localStorage.getItem('accessToken'))

      navigate('/logged-in'); // Redirect to the logged-in page
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <>
   
    <form onSubmit={handleSignup}>
      <h1>Signup</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Signup</button>
    </form>
  
    </>
  );
};

export default SignupPage;
