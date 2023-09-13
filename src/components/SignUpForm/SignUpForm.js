'use client'
import Header from '@/components/Header/Header'
import React from 'react'
import styles from './signUp.module.css'
import { Grid, TextField, Button } from '@mui/material'
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link'
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from 'next-auth/react'


function SignUpForm() {
    const { handleSubmit, control, watch, formState: { errors } } = useForm();
    const password = watch("password", "");

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                console.log('User has been created.')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className={styles.formContainer}>
                    <div className={styles.formPaper}>
                        <h1>Sign Up</h1>
                        <Grid container spacing={4}>
                            <Grid item md={6} xs={12}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className={styles.formInput}>
                                        <label htmlFor='fullName' className={styles.label}>Full Name</label>
                                        <Controller
                                            name="fullName"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: "Name is required" }}
                                            render={({ field }) =>
                                                <TextField
                                                    {...field}
                                                    size='small'
                                                    name='fullName'
                                                    error={!!errors.fullName}
                                                    helperText={errors.fullName?.message}
                                                    fullWidth
                                                    InputLabelProps={{ shrink: true }}
                                                />}
                                        />
                                    </div>
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
                                                    size='small'
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
                                                    size='small'
                                                    name='password'
                                                    type="password"
                                                    error={!!errors.password}
                                                    helperText={errors.password?.message}
                                                    fullWidth
                                                    InputLabelProps={{ shrink: true }}
                                                />}
                                        />
                                    </div>

                                    <div className={styles.formInput}>
                                        <label htmlFor='confirmPassword' className={styles.label}>Repeat Password</label>
                                        <Controller
                                            name="confirmPassword"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: "Please repeat your password",
                                                validate: value =>
                                                    value === password || "The passwords do not match"
                                            }}
                                            render={({ field }) =>
                                                <TextField
                                                    {...field}
                                                    size='small'
                                                    name='confirmPassword'
                                                    type="password"
                                                    error={!!errors.confirmPassword}
                                                    helperText={errors.repeatPassword?.message}
                                                    fullWidth
                                                    InputLabelProps={{ shrink: true }}
                                                />}
                                        />
                                    </div>

                                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
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
                                        Signup with Google
                                    </Button>
                                </div>
                                <div className={styles.formInput}>
                                    Already a member? &nbsp;
                                    <Link href="/login">Login here</Link>
                                </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                graphic area
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm