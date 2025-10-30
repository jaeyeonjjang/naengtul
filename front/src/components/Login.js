import React, {useState} from 'react';
import { SERVER_URL } from '../constants.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Refrigerator from './Refrigerator.js';


function Login() {

    const [user, setUser] = useState({
        userName: '',
        password: ''
    });

    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const login = () => {
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            const jwtToken = res.headers.get('Authorization');
            if(jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
                alert('로그인 성공');
            } else {
                alert('로그인 실패');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
        });
    }


    if(isAuthenticated) {
        return <Refrigerator />;
    } else {
        return (
            <div>
                <Stack spacing={2} alignItems="center" mt={2}>
                    <TextField name="username" label="username" onChange = {handleChange}/>
                    <TextField name="password" label="password" type="password" onChange = {handleChange}/>
                    <Button variant="outlined" color="primary" onClick={login}>Login</Button>
                </Stack>
            </div>
        );
    }
};

export default Login;