import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import bcrypt from "bcryptjs";

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const PopupContainer = styled.div`
  background: ${(props) => props.theme.footerColor};
  border-radius: 13px;
  width: 280px;
  padding: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 180px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.accentColor};
  color: black;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

function Password() {
  const [isLogin, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword =
    "$2a$10$wiS5J26VwuOE0oj2rDmIxePY80Kwe0zZCI7/iKV3S60W/0IPKN8f6";

  useEffect(() => {
    const lastLoginTime = localStorage.getItem("login");
    if (lastLoginTime) {
      const currentTime = new Date().getTime();
      const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;

      if (
        currentTime - new Date(lastLoginTime).getTime() <
        twentyFourHoursInMilliseconds
      ) {
        setLogin(true);
      } else {
        // Delete PasswordClosed after 24hours
        localStorage.removeItem("login");
        setLogin(false);
      }
    }
  }, []);

  const handleLogin = async () => {
    const isMatch = await bcrypt.compare(password, correctPassword);
    if (isMatch) {
      setLogin(true);
      localStorage.setItem("login", new Date().toString());
      alert("로그인 되었습니다.");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  if (isLogin) {
    return null;
  } else {
    return (
      <PopupBackground>
        <PopupContainer>
          <Input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </PopupContainer>
      </PopupBackground>
    );
  }
}

export default Password;
