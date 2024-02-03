
import './App.css';
import { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import AuthContext from './context/authContext';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState(null)


  const router = useRoutes(routes)

  const login = (token) => {
    setToken(token)
    localStorage.setItem("user", JSON.stringify({ token }))
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem("user")
  }
  

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
      userInfos,
      login,
      logout,
    }}>
      {router}
    </AuthContext.Provider>
  );
}

export default App;
