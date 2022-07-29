import { Button } from '@mui/material';
import Head from 'next/head';
import React from 'react'
import styled from 'styled-components';
import { signInWithGoogle } from '../firebase';

function Login() {

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png'></Logo>
                <Button onClick={signInWithGoogle} variant='outlined' color="success">sign in with google</Button>
            </LoginContainer>
        </Container>
    )
}

const Container = styled.div`
display:grid;
place-items:center;
background-color: whitesmoke;
height:100vh;`;

const LoginContainer = styled.div`
display: flex;
padding: 100px;
align-items: center;
background-color: white;
border-radius: 5px;
flex-direction: column;
box-shadow: 0px 0px 14px -10px grey;
`;

const Logo = styled.img`
height:200px;
margin-bottom: 25px;
width:200px;`;

export default Login