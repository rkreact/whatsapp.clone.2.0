import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton, Avatar, Button } from '@mui/material';
import * as EmailValidator from "email-validator";
import { collection, getFirestore, addDoc, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import ChatPage from './Chat';

function Sidebar() {
    const [user] = useAuthState(auth);

    // const userCharRef = query(collection(db, "chats"), where("users", "array-contains", "rajkanani.dignizant@gmail.com"));
    const collectionRef = collection(db, "chats");
    const userChatRef = query(
        collectionRef,
        where("users", "array-contains", user.email));


    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = async () => {
        const input = prompt('Please enter an email address for the user you wish to chat with');
        if (!input) return null;

        if (EmailValidator.validate(input) && chatAlreadyExits(input) == false && input !== user.email) {
            var date = new Date();
            var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                date.getUTCDate(), date.getUTCHours(),
                date.getUTCMinutes(), date.getUTCSeconds());

            await addDoc(collection(db, "chats"), {
                users: [user.email, input],
            });
        }

    }

    const chatAlreadyExits = (receipentEmail) => {
        const rk = !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === receipentEmail)?.length > 0
        );
        return rk;
    }
    return (
        <Container>
            <Header>
                <UserAvatar onClick={() => { auth.signOut() }} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />

                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchOutlined />
                <SearchInput placeholder='Search in chats' />
            </Search>

            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
            <p>{chatsSnapshot?.docs.map((chat, index) => {
                return <ChatPage key={chat.id} id={chat.id} users={chat.data().users} />;
            })}</p>

        </Container>
    )
}

const IconsContainer = styled.div``;

// const Chat = styled.div``;

const SidebarButton = styled(Button)`
width: 100%;
&&&{
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
}
color: black;
`;

const Container = styled.div``;

const SearchInput = styled.input`
outline-width:0; 
border:none;
flex:1;
`;

const Search = styled.div`
display:flex;
align-items:center;
padding: 20px;
border-radius: 2px;
`;

const Header = styled.div`
display:flex ;
position: sticky;
top:0;
background-color:white;
justify-content: space-between;
align-items: center;
padding: 15px;
height:80px;
border-bottom: 1px solid whitesmoke;
z-index:1;
`;

const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover {
    opacity: 0.8;
}`;
export default Sidebar;


