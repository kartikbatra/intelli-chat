import React from "react";
import styled from "styled-components";

export default function UserDetailsModal({ user, onClose }) {
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <UserInfo>
          <AvatarContainer>
            <Avatar src={`data:image/svg+xml;base64,${user.avatarImage}`} alt="avatar" />
          </AvatarContainer>
          <div>
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
          </div>
        </UserInfo>
      </ModalContainer>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: #080420;
  color: white;
  padding: 2rem;
  border-radius: 8px;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  margin-right: 1rem;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
