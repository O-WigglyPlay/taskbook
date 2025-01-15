import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendCode = () => {
    if (!validateEmail(formData.email)) {
      setEmailValid(false);
      setErrorMessage("이메일 양식이 틀렸습니다!");
      return;
    }
    setIsCodeSent(true);
    setTimer(180);
    setEmailValid(true);
    setErrorMessage("");
    console.log("이메일을 확인해주세요 :", formData.email);
  };

  const handleVerifyCode = () => {
    if (formData.verificationCode === "123456") {
      setIsVerified(true);
      setTimer(0); // 타이머 멈춤
      setErrorMessage("");
    } else {
      setErrorMessage("인증 코드가 일치하지 않아요!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isVerified) {
      setErrorMessage("이메일 인증을 먼저해주세요.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    setErrorMessage("");
    alert("회원가입이 완료되었습니다!");
    navigate("/login");
    console.log("회원가입 정보 :", formData);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <RegisterContainer>
      <RegisterBox>
        <h2>회원가입</h2>
        {errorMessage && <ErrorBanner>{errorMessage}</ErrorBanner>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">아이디</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 작성해주세요."
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isVerified}
              style={{ backgroundColor: isVerified ? "#e0e0e0" : "white" }}
            />
            {!isCodeSent && (
              <SendCodeButton type="button" onClick={handleSendCode}>
                이메일 인증
              </SendCodeButton>
            )}
            {isCodeSent && !isVerified && (
              <Timer>
                {timer > 0
                  ? `타이머: ${Math.floor(timer / 60)}:${timer % 60}`
                  : "재전송"}
              </Timer>
            )}
          </FormGroup>
          {isCodeSent && !isVerified && (
            <FormGroup>
              <Label htmlFor="verificationCode">인증 번호</Label>
              <Input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                required
              />
              <VerifyButton type="button" onClick={handleVerifyCode}>
                인증 하기
              </VerifyButton>
            </FormGroup>
          )}
          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <RegisterButton type="submit">회원가입</RegisterButton>
        </Form>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Register;

// Styled-components
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const RegisterBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
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

const SendCodeButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const VerifyButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #218838;
  }
`;

const RegisterButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
`;

const Timer = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: red;
`;

const ErrorBanner = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;
