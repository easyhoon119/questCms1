import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signUp";
import ViewDetailPage from "../pages/viewDetail";
import ViewListPage from "../pages/viewList";

function RootRoute() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                    <Route path="/list" element={<ViewListPage />} />
                    <Route path="/list/:id" element={<ViewDetailPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default RootRoute;
