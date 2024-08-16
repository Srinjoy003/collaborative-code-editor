'use client'

import React, { useState } from 'react';
import '../signup/signup.css';
import firebase from '@/app/lib/auth/firebaseConfig';
import { validatePassword } from '@/app/lib/auth/passwordValidator';
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

	const searchParams = useSearchParams();


    // const oobCode = new URLSearchParams(location.search).get('oobCode');
    const oobCode = searchParams.get("oobCode")
    

    const submit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (!validatePassword(newPassword)) {
            setError('Password must be at least 8 characters long and include at least one lower case letter, one upper case letter, one number, and one special character.');
            return;
        }
        try {
            await firebase.auth().confirmPasswordReset(oobCode, newPassword);
            alert("Password has been reset successfully.");
            router.push('/login');

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='main_container_signup'>
            <div className='header'>
                <h2>Reset Password</h2>
            </div>
            {error && <div className="error">{error}</div>}
            <div className='box'>
                <input
                    type='password'
                    value={newPassword}
                    placeholder='New Password'
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className='box'>
                <input
                    type='password'
                    value={confirmPassword}
                    placeholder='Confirm New Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button onClick={submit}>Submit</button>
        </div>
    );
}

export default ResetPassword;
