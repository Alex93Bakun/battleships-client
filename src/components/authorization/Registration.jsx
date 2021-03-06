import React, {useState} from 'react';
import './Authorization.scss';
import Input from "../../utils/Input/Input";
import {registration} from "../../actions/user";
import {useDispatch} from "react-redux";
import {regUser} from "../../reducers/userReducer";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <div className="authorization">
            <div className="authorization__header">
                Реєстрація
            </div>
            <Input value={email} setValue={setEmail} type="email" placeholder="Введіть email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введіть пароль"/>
            <button className="authorization__btn" onClick={() => {
                registration(email, password);
                dispatch(regUser());
            }}>
                Зареєструватися
            </button>
        </div>
    );
};

export default Registration;
