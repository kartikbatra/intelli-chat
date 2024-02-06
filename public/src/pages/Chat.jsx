import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import UserDetailsModal from "../components/UserDetailsModal";

const NavBar = styled.div`
  width: 100%;
  background-color: #333;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  color: white;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #9a86f3;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #7c6ad3;
  }
`;

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          setCurrentUser(
            await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const handleLogout = () => {
    localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (socket.current) {
      socket.current.disconnect();
    }
    setContacts([]);
    setCurrentUser(undefined);
    navigate("/login");
  };

  const handleToggleUserDetailsModal = () => {
    setShowUserDetailsModal(!showUserDetailsModal);
  };

  return (
    <>
      {showUserDetailsModal && (
        <UserDetailsModal user={currentUser} onClose={handleToggleUserDetailsModal} />
      )}
      <NavBar>
        <AvatarContainer onClick={handleToggleUserDetailsModal}>
          {currentUser && (
            <>
              <Avatar src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar" />
              <span>{currentUser.username}</span>
            </>
          )}
        </AvatarContainer>
        <StyledButton onClick={handleLogout}>Logout</StyledButton>
      </NavBar>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #aa336a;
  padding-top: 2.7rem; /* Adjust padding-top to prevent overlap with the navbar */
  .container {
    height: 100%;
    width: 100%;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
