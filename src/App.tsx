import { Container, Nav, Navbar } from 'react-bootstrap';
import GuessWindow from './GuessWindow';

function App() {
  return (
    <>
      <Container fluid>
        <Navbar expand={false}>
          <Navbar.Brand className="ms-md-5" href="#">Card Guesser</Navbar.Brand>
          <Nav className="pe-md-4"><Nav.Link href="#">Home</Nav.Link></Nav>

        </Navbar>
      </Container>
      <GuessWindow />
    </>
  );
}

export default App;
