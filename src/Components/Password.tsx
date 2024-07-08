import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

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
  width: 550px;
  padding: 15px;
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

const PopupContent = styled.div`
  text-align: center;
  h2 {
    padding: 10px;
    font-weight: 500;
    font-size: 17px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0 5px 0;
  button {
    color: ${(props) => props.theme.textColor};
  }
`;

function Password() {
  const [isLogin, setLogin] = useState(false);

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

  const login = () => {
    setLogin(true);
    localStorage.setItem("login", new Date().toString());
  };

  if (isLogin) {
    return null;
  } else {
    return (
      <PopupBackground>
        <PopupContainer>
          <PopupContent>
            <input></input>
            <ButtonContainer>
              <button onClick={login}>로그인</button>
            </ButtonContainer>
          </PopupContent>
        </PopupContainer>
      </PopupBackground>
    );
  }
}

export default Password;
