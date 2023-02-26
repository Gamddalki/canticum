import styled from "styled-components";
import bg1 from "../img/1.jpg";

const Background = styled.div`
  width: 100vw;
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
      <img src={bg1} />
    </Background>
  );
}

export default Home;
