import React from 'react';
import './Navbar.scss';
import logo from '../../assets/image/anchor.png';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();

    return (
        <div className={"navbar"}>
            <div className="container">
                <img src={logo} alt="" className="navbar__logo"/>
                <div className="navbar__header">Морський бій</div>
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Увійти</NavLink></div>}
                {!isAuth &&
                <div className="navbar__registration"><NavLink to="/registration">Реєстрація</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Вихід</div>}
            </div>
        </div>
    );
};

export default Navbar;
