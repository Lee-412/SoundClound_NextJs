'use client'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Divider, IconButton, InputAdornment, Tooltip, styled } from '@mui/material';
import GitHub from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { redirect, useRouter } from 'next/navigation';
export default function SingInForm() {

    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");

    const [openMessage, setOpenMessage] = useState<boolean>(false);
    const [resMessage, setResMessage] = useState<string>("");

    const router = useRouter()
    const handleSubmit = async () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setErrorUsername("");
        setErrorPassword("");
        if (!username || !password) {

            if (!username) {
                setIsErrorUsername(true);
                setErrorUsername("Username is not empty.")

            }
            if (!password) {
                setIsErrorPassword(true);
                setErrorPassword("Password is not empty.")

            }
            return;
        }
        const res = await signIn("credentials",
            {
                username: username,
                password: password,
                redirect: false
            }
        )
        if (!res?.error) {
            router.push('/')
        }
        else {
            console.log("check error", res)
            setResMessage(res.error);
            setOpenMessage(true);
        }

    }


    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        '& > :not(style) ~ :not(style)': {
            marginTop: theme.spacing(2),
        },
    }));


    return (
        <Grid sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"

        }}>
            <Grid item
                xs={12}
                sm={8}
                md={5}
                lg={4}
                sx={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    width: "30%",

                }}>
                <Container
                    component="main" maxWidth="xs"
                    sx={{
                        display: "inline-block",
                    }}
                >
                    <Link href="/" > <ArrowBackIcon
                        sx={{
                            marginTop: "20px"
                        }} /></Link>
                    <Box
                        sx={{

                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{
                            // m: 1,
                            display: "flex",
                            marginTop: "10px",
                            bgcolor: 'secondary.main',
                            justifyContent: "center"
                        }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <TextField
                            onChange={(event) => {
                                setIsErrorUsername(false);
                                setErrorUsername("")
                                setUsername(event.target.value)
                            }}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            autoFocus
                            error={isErrorUsername}
                            helperText={errorUsername}
                        />

                        <TextField
                            onChange={(event) => {
                                setIsErrorPassword(false);
                                setErrorPassword("")
                                setPassword(event.target.value)
                            }}

                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            error={isErrorPassword}
                            helperText={errorPassword}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit()
                                }
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                        <Button
                            sx={{
                                my: 1
                            }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}

                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Don't have an account?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                    <Root sx={{ m: 1 }}>
                        <Divider>Or using</Divider>
                    </Root>
                    <Box sx={{
                        padding: "15px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Tooltip title="Github" arrow onClick={() => {
                            signIn("github");
                        }}>
                            <IconButton sx={{
                                bgcolor: "orange",
                                color: "white",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "orange",
                                    color: "white",
                                    opacity: "0.7"
                                },
                                margin: "10px"

                            }}>
                                <GitHub />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Google" arrow>
                            <IconButton sx={{
                                bgcolor: "orange",
                                color: "white",
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "orange",
                                    color: "white",
                                    opacity: "0.7"
                                },
                                margin: "10px"
                            }}>
                                <GoogleIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Container>
            </Grid>

            <Snackbar
                open={openMessage}

                // onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => { setOpenMessage(false) }}
                    severity="error"
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    {resMessage}
                </Alert>
            </Snackbar>
        </Grid >

    );
}