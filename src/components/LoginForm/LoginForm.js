'use client'
import { useRouter } from 'next/router'
import Header from '@/components/Header/Header'
import { Button, TextField } from '@mui/material'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import styles from './login.module.css'
import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'

function LoginForm() {
    const session = useSession()
    // const router = useRouter()
    // if (session) {
    //     router.push("/")
    // }
    const { handleSubmit, control, formState: { errors } } = useForm();
    console.log("session", session)


    const onSubmit = (data) => {
        signIn("credentials", { ...data, callbackUrl: "/" })
    }


    return (
        <div>
            <Header />
            <div className="container">
                <div className={styles.formContainer}>
                    <div className={styles.formPaper}>
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.formInput}>
                                <label htmlFor='email' className={styles.label}>Email</label>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Email is required" }}
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            name='email'
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />}
                                />
                            </div>

                            <div className={styles.formInput}>
                                <label htmlFor='password' className={styles.label}>Password</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Password is required" }}
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            name='password'
                                            type="password"
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />}
                                />
                            </div>

                            <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                        </form>
                        <div className={styles.formInput}>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                onClick={() => {
                                    signIn('google')
                                }}
                            >
                                <GoogleIcon /> &nbsp;
                                Login with Google
                            </Button>
                        </div>
                        <div className={styles.formInput}>
                            Not a member? &nbsp;
                            <Link href="/sign-up">Sign Up here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm


