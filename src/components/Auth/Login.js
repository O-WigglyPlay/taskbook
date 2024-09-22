import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register"); // 회원가입 페이지로 이동
  };

  return (
    <LoginContainer>
      <LoginBox>
        <h2>로그인</h2>
        <Form>
          <FormGroup>
            <Label htmlFor="email">아이디</Label>
            <Input type="email" id="email" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input type="password" id="password" required />
          </FormGroup>
          <LoginButton type="submit">로그인</LoginButton>
        </Form>
        <RegisterPrompt>
          계정이 없나요 ?{" "}
          <RegisterLink onClick={handleRegister}>회원가입</RegisterLink>
        </RegisterPrompt>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const RegisterPrompt = styled.p`
  margin-top: 20px;
  font-size: 14px;
`;

const RegisterLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
