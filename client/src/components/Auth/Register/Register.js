import React,{useState} from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import './register.css';

const Register = () => {

    const navigate = useNavigate();
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
            await axios.post('http://localhost:5000/registration', state)
            .then(response => {
                if(response.status === 200){
                    console.log(response.data);
                    navigate('/login');
                }
            }).catch(() => alert("Something went wrong"));
        
    }

    return(
            <form autoComplete="off" className="register-form" onSubmit={handleSubmit}>
                <h1>Register Here</h1>
                <div className='form-control'>
                    <input type="text" name="name" id="name" value={state.name} onChange={(e) => setState({...state,name: e.target.value})} placeholder="Enter your name..." required/>
                </div>
                

                <div className='form-control'>
                    <input type="email" name="email" id="email" value={state.email} onChange={(e) => setState({...state,email: e.target.value})} placeholder="Enter your email..." required/>
                </div>

                <div className='form-control'>
                    <input type="password" name="password" id="password" value={state.password} onChange={(e) => setState({...state,password: e.target.value})} placeholder="Enter your password..." required/>
                </div>

                <div className='form-control'>
                    <button>Register</button>
                    <NavLink to='/login'>Already register ?</NavLink>
                </div>
            </form>
    )
};

export default Register;