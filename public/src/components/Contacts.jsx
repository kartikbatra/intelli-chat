import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    // Additional initialization logic...
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container>
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="contacts">
          {filteredContacts.map((contact, index) => (
            <div
              key={contact._id}
              className={`contact ${index === currentSelected ? "selected" : ""}`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 1rem;
  padding: 1rem;

  .search-bar {
    width: 100%;
    height: 2rem;
    padding: 0.5rem;
    border: none;
    background-color: #e8e8e8;
    color: #000;
    border-radius: 4px;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    outline: none;
    &:focus {
      border-color: #4f04ff;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding-right: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #D3D3D3; 
      width: 0.1rem;
      border-radius: 1rem;
    }
    .contact {
      background-color: #fff;
      min-height: 4rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.5rem;
      padding: 0.7rem;
      padding-top: 0.1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h3 {
          color: #000;
        }
      }
    }
    .selected {
      background-color: #4caf50;
      height: 3rem;
    }
  }
`;
