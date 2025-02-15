
import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import PrivateRoute from './Utils/PrivateRoute';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <div className="App">

      <Router>
        <AuthProvider>
            <Header/>
            <Routes>
              <Route path='/' element={<PrivateRoute><HomePage/></PrivateRoute>} exact/>
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/signup' element={<SignupPage/>} />

            </Routes>
        </AuthProvider>
      </Router>


    
    </div>
  );
}

export default App;
