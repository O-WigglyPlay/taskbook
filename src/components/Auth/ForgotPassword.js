import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate import

const ForgotPasswordWithCode = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const MOCK_VERIFICATION_CODE = "123456";
  const navigate = useNavigate(); // navigate 훅 사용

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage("올바른 이메일 형식을 입력하세요.");
      return;
    }
    setErrorMessage("");
    setTimeout(() => {
      console.log("인증번호 전송 완료 (123456)");
      setStep(2);
    }, 1000);
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    if (verificationCode === MOCK_VERIFICATION_CODE) {
      setStep(3);
      setErrorMessage("");
    } else {
      setErrorMessage("인증번호가 올바르지 않습니다.");
    }
  };

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("새 비밀번호 저장:", newPassword);
    alert("비밀번호가 성공적으로 변경되었습니다!");
    navigate("/login"); // 비밀번호 변경 성공 후 로그인 페이지로 이동
  };

  return (
    <Container>
      <FormBox>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {step === 1 && (
          <Form onSubmit={handleEmailSubmit}>
            <h2>비밀번호 찾기</h2>
            <Input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SubmitButton type="submit">인증번호 요청</SubmitButton>
          </Form>
        )}
        {step === 2 && (
          <Form onSubmit={handleVerificationSubmit}>
            <h2>인증번호 입력</h2>
            <Input
              type="text"
              placeholder="인증번호 입력"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <SubmitButton type="submit">인증번호 확인</SubmitButton>
          </Form>
        )}
        {step === 3 && (
          <Form onSubmit={handlePasswordResetSubmit}>
            <h2>새 비밀번호 설정</h2>
            <Input
              type="password"
              placeholder="새 비밀번호 입력"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <SubmitButton type="submit">비밀번호 재설정</SubmitButton>
          </Form>
        )}
      </FormBox>
    </Container>
  );
};

export default ForgotPasswordWithCode;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const FormBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left; /* 텍스트 왼쪽 정렬 */
  width: 350px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
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

const ErrorMessage = styled.div`
  color: rgb(170, 0, 17);
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  padding-left: 10px;
`;