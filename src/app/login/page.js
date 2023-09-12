'use client'
import Header from '@/components/Header/Header'
import { Button } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import styles from './login.module.css'

function Login() {
    const session = useSession()
    console.log("session", session)
    return (
        <div>
            <Header />
            <div className="container">
                <div className={styles.formContainer}>
                    <div className={styles.formPaper}>
                        <h1>Login</h1>
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                signIn('google')
                            }}
                        >
                            {/* add a html space between icon and text */}

                            <GoogleIcon /> &nbsp;
                            Login with Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login