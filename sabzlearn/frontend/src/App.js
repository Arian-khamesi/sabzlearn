
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import AuthContext from './context/authContext';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfos, setUserInfos] = useState(null)


  const router = useRoutes(routes)

  const login = useCallback((token, userInfos) => {
    setToken(token)
    setUserInfos(userInfos)
    setIsLoggedIn(true)
    localStorage.setItem("user", JSON.stringify({ token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem("user")
  }, [])


  useEffect(() => {

    const localStorageData = JSON.parse(localStorage.getItem("user"))

    if (localStorageData) {
      fetch("http://localhost:5000/v1/auth/me", {
        headers: {
          "Authorization": `Bearer ${localStorageData.token}`
        }
      }).then(res => res.json())
        .then(userData => {
          setIsLoggedIn(true)
          setUserInfos(userData)
        })
    }

  }, [login])


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
