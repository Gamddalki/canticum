import styled from "styled-components";
import bg1 from "../img/1.jpg";
import bg2 from "../img/2.jpg";
import bg3 from "../img/3.jpg";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function Home() {
  return (
    <Background>
      <img src={bg2} />
    </Background>
  );
}

export default Home;
