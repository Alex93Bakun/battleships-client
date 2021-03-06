import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import './App.scss';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import {auth, registration} from "../actions/user";
import MainScreen from "./mainScreen/MainScreen";

const App = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const isReg = useSelector(state => state.user.isReg);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [isReg])

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <div className="wrap">
                    {!isAuth
                        ? !isReg
                            ? <Switch>
                                <Route path="/registration" component={Registration}/>
                                <Route path="/login" component={Login}/>
                                <Redirect to="/login"/>
                            </Switch>
                            : <Switch>
                                <Route path="/login" component={Login}/>
                                <Redirect to="/login"/>
                            </Switch>
                        : <Switch>
                            <Route exact path="/" component={MainScreen}/>
                            <Redirect to="/"/>
                        </Switch>
                    }
                </div>
            </div>
        </BrowserRouter>
    )
};

export default App;
