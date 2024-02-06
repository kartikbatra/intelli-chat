import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo3.png";
import Logo1 from "../assets/logo1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-left",
    autoClose: 10000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Both Passwords should be the same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username has to be more than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <GlobalStyle>
      <>
        <Container>
          <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="brand">
                <img src={Logo} alt="logo" height="50px" />
                <h1></h1>
              </div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
              />
              <button type="submit">Create User</button>
              <span>
                Already have an account? <Link to="/login">Login.</Link>
              </span>
            </form>
          </FormContainer>
          <div className="powered-by">
            <h5>Powered by&nbsp;</h5>
            <img src={Logo1} alt="logo" height="80px" width="60px" />
          </div>
        </Container>
        <ToastContainer />
      </>
    </GlobalStyle>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #AA336A;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 10rem;
      width: 10rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    padding: 3rem;
    background-color: #00000076;
  }

  input {
    padding: 0.75rem;
    border: 0.1rem solid #7B3F00;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #800020;
      outline: none;
    }
  }

  button {
    background-color: #CD7F32;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #CC7722;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #CD7F32;
      text-decoration: none;
      font-weight: bold;
    }
  }

  .powered-by {
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
    h5 {
      margin-right: 5px;
    }
  }
`;

const GlobalStyle = styled.div`
  html, body {
    height: 100%;
    margin: 0;
  }
`;


