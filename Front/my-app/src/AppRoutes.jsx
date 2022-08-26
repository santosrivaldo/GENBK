import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom"
import LoginPage from './pages/login';
import HomePage from './pages/home';
import SigninPage from './pages/signin/signin';
import { AuthProvider, AuthContext } from "./context/auth";
import { useContext } from "react";


const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext)

        if (loading) {
            return <div className="loading">Carregando...</div>
        }

        if (!authenticated) {
            return <Navigate to="/singin" />
        }
        return children
    }
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/signin" element={<SigninPage />} />
                    <Route exact path="/" element={<Private>
                        <HomePage />
                    </Private>} />
                </Routes>
            </AuthProvider>
        </Router>

    )
}


export default AppRoutes