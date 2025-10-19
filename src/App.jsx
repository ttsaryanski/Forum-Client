import { Routes, Route } from "react-router-dom";

import { ErrorProvider } from "./contexts/ErrorContext";

import ErrorBoundary from "./components/boundary/ErrorBoundary";
import Header from "./components/core/header/Header";
import Home from "./components/home/Home";
import Aside from "./components/aside/Aside";
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
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </main>

                    <aside>
                        <Aside />
                    </aside>
                </div>

                <Footer />
            </ErrorBoundary>
        </ErrorProvider>
    );
}

export default App;
