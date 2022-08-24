import React,{useState} from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {

    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/login', state)
        .then(response => {
            if(response.status === 200){
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('user_id', response.data.result._id);
                
                navigate('/');
            }
        }).catch(() => alert("Something went wrong"));
    }


    return(
            <form autoComplete="off" className="login-form" onSubmit={handleSubmit}>
                <h1>Login Here</h1>
                <div className='form-control'>
                    <input type="email" name="email" id="email" value={state.email} onChange={(e) => setState({...state,email: e.target.value})}  placeholder="Enter your email..." required/>
                </div>

                <div className='form-control'>
                    <input type="password" name="password" id="password" value={state.password} onChange={(e) => setState({...state,password: e.target.value})} placeholder="Enter your password..." required/>
                </div>

                <div className='form-control'>
                    <button>Login</button>
                    <NavLink to='/register'>Don't have an account ?</NavLink>
                </div>

            </form>
    )
};

export default Login;