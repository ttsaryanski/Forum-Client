import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ErrorProvider } from "./contexts/ErrorContext";

import AuthGuard from "./components/guards/AuthGuard";
import GuestGuard from "./components/guards/GuestGuard";

import ErrorBoundary from "./components/boundary/ErrorBoundary";
import Header from "./components/core/header/Header";
import Home from "./components/home/Home";
import SimpleNews from "./components/aside/SimpleNews";
import Themes from "./components/themes/themes/Themes";
import ThemeDetails from "./components/themes/themeDetails/ThemeDetails";
import NewTheme from "./components/themes/newTheme/NewTheme";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Welcome from "./components/auth/welcome/Welcome";
import VerifedPage from "./components/auth/verifedPage/VerifedPage";
import Profile from "./components/auth/profile/Profile";
import Footer from "./components/core/footer/Footer";
import ErrorMsg from "./components/core/errorComponent/ErrorMsg";
import Page404 from "./components/page 404/Page404";

import "./App.css";

function App() {
    return (
        <ErrorProvider>
            <AuthProvider>
                <ErrorBoundary>
                    <Header />
                    <ErrorMsg />

                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route
                                path="/simpleNews/:newsId"
                                element={<SimpleNews />}
                            />

                            <Route path="/themes" element={<Themes />} />

                            <Route
                                path="/theme/details/:themeId"
                                element={<ThemeDetails />}
                            />

                            <Route element={<GuestGuard />}>
                                <Route path="/auth/login" element={<Login />} />

                                <Route
                                    path="/auth/register"
                                    element={<Register />}
                                />

                                <Route
                                    path="/auth/welcome"
                                    element={<Welcome />}
                                />

                                <Route
                                    path="/auth/verified"
                                    element={<VerifedPage />}
                                />
                            </Route>

                            <Route element={<AuthGuard />}>
                                <Route
                                    path="/theme/create"
                                    element={<NewTheme />}
                                />

                                <Route
                                    path="/auth/profile"
                                    element={<Profile />}
                                />
                            </Route>

                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </div>

                    <Footer />
                </ErrorBoundary>
            </AuthProvider>
        </ErrorProvider>
    );
}

export default App;
