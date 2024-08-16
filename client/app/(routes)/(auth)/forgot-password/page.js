'use client'

import React, { useState } from 'react';
import '../signup/signup.css';
import firebase from '@/app/lib/auth/firebaseConfig';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            alert("Password reset email sent successfully.");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className='main_container_signup'>
            <div className='header'>
                <h2>Forgot Password</h2>
            </div>
            <div className='box'>
                <input
                    type='email'
                    value={email}
                    placeholder='E-mail'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button onClick={submit}>Submit</button>
        </div>
    );
}

export default ForgotPassword;
