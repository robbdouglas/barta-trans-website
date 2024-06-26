import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const port = import.meta.env.VITE_REACT_APP_PORT;
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${port}/users/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      toast.success("Login successful!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { backgroundColor: "green", color: "white" },
      });
      if (response.data.token) {
        setTimeout(() => navigate("/dashboard"), 1500); // Verzögerung, um Toast anzuzeigen
      }
    } catch (err: any) {
      // Typisieren des Fehlers als 'any'
      if (err.response) {
        // Server hat mit einem Statuscode geantwortet, der außerhalb des Bereichs von 2xx liegt
        toast.error("Login failed. Please check your username and password.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { backgroundColor: "red", color: "white" },
        });
      } else if (err.request) {
        // Anfrage wurde gemacht, aber keine Antwort erhalten
        toast.error("Server is not responding. Please try again later.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { backgroundColor: "red", color: "white" },
        });
      } else {
        // Etwas ist beim Erstellen der Anfrage schief gelaufen
        toast.error("An error occurred. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { backgroundColor: "red", color: "white" },
        });
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <Container>
      <Header />
      <div className="login-container">
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <InputContainer>
            <Label>Username:</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputContainer>
          <InputContainer>
            <Label>Password:</Label>
            <PasswordWrapper>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <PasswordIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={toggleShowPassword}
              />
            </PasswordWrapper>
          </InputContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </SubmitButton>
        </Form>{" "}
      </div>
      <ToastContainer position="bottom-center" />
    </Container>
  );
};
const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  @media (max-width: 768px) {
    padding: 10px;
    max-width: 100%;
  }
`;
const Title = styled.h2`
  margin-bottom: 20px;
`;
const Form = styled.form`
  width: 100%;
`;
const InputContainer = styled.div`
  margin-bottom: 15px;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;
const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const PasswordInput = styled.input`
  width: 100%;
  padding: 8px;
  padding-right: 40px; /* Platz für das Icon */
  box-sizing: border-box;
`;
const PasswordIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 18px;
  right: 10px;
  cursor: pointer;
`;
const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 15px;
`;
const SubmitButton = styled.button`
  width: 100%;

  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #aaa;
  }
`;
export default Login;
