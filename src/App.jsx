import { Routes, Route } from "react-router-dom";

import { ErrorProvider } from "./contexts/ErrorContext";

import ErrorBoundary from "./components/boundary/ErrorBoundary";
import Header from "./components/core/header/Header";
import Home from "./components/home/Home";
import SimpleNews from "./components/home/SimpleNews";
import Footer from "./components/core/footer/Footer";
import ErrorMsg from "./components/core/errorComponent/ErrorMsg";
import Page404 from "./components/page 404/Page404";

import "./App.css";

function App() {
    return (
        <ErrorProvider>
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

                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </div>

                <Footer />
            </ErrorBoundary>
        </ErrorProvider>
    );
}

export default App;
