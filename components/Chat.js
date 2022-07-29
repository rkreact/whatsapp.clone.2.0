import styled from 'styled-components';
import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import { IconButton, Avatar, Button } from '@mui/material';
import getRecipientEmail from '../Utils/getRecipientEmail';
import { auth, db } from "../firebase";
import { collection, getFirestore, addDoc, query, where } from "firebase/firestore";

function Chat({ id, users }) {
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(
        query(collection(db, "users"), where("email", "==", getRecipientEmail(users, user)))
    );


    const recipient = recipientSnapshot?.docs?.[0]?.data();


    const recipientEmail = getRecipientEmail(users, user);
    console.log({ recipientEmail })
    return (
        <Container>
            {recipient ? (
                // <p>{recipient.photoURL}</p>
                <UserAvatar src={recipient?.photoURL} ></UserAvatar>
            ) : <UserAvatar src={recipientEmail[0]} >{recipientEmail[0]}</UserAvatar>}
            <p> {recipientEmail}</p>
        </Container>
    )
}
const Container = styled.div`
display:flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;
:hover {
    background-color: #e9eaeb;
}
`;

const UserAvatar = styled(Avatar)`
margin:5px;
margin-right:15px;`;

export default Chat;
