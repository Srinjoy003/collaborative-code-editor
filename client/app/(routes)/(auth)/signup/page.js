'use client'

import React, { useState } from 'react';
import './signup.css';
import firebase from '@/app/lib/auth/firebaseConfig';
import { validatePassword } from '@/app/lib/auth/passwordValidator';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        if (!validatePassword(pass)) {
            setError('Password must be at least 8 characters long and include at least one lower case letter, one upper case letter, one number, and one special character.');
            return;
        }
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, pass);
            if (user) {
                alert("Signup successfully");
                router.push('/login');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='main_container_signup'>
            <div className='header'>
                <h2>Signup</h2>
            </div>
            {error && <div className="error">{error}</div>}
            <div className='box'>
                <input
                    type='email'
                    value={email}
                    placeholder='E-mail'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='box'>
                <input
                    type='password'
                    value={pass}
                    placeholder='Password'
                    onChange={(e) => setPass(e.target.value)}
                />
            </div>
            <button onClick={submit}>Signup</button>
        </div>
    );
}

export default Signup;
