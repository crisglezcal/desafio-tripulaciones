import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "../../pages/Splash";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Search from "../../pages/Search";
import Shop from "../../pages/Shop";
import Booking from "../../pages/Booking";
import GoogleSuccess from "../../pages/GoogleSucces";
import Profile from "../../pages/Profile";
import Admin from "../../pages/Admin";
import Main from "../../layout/Main";
import BookingsPage from "../../components/BookingPage/BookingPage";
import UsersPage from "../../components/UsersPage/UsersPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login y Register fuera de Main */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/google/success" element={<GoogleSuccess />} />


        {/* Rutas dentro de Main */}
        <Route path="/home" element={ <Main><Home /></Main>}/>
        <Route path="/search" element={ <Main><Search /></Main>}/>
        <Route path="/booking/:id" element={ <Main><Booking /></Main>}/>
        <Route path="/profile" element={ <Main><Profile /></Main>}/>
        <Route path="/shop" element={ <Main><Shop /></Main>}/>

        <Route path="/admin" element={<Main><Admin /></Main>}>
        {/* /admin puro solo mensaje */}
        {/* /admin/bookings */}
        <Route path="bookings" element={<BookingsPage />} />  
        {/* /admin/users */}
        <Route path="users" element={<UsersPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
