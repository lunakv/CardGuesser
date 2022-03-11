import { Container, Nav, Navbar } from 'react-bootstrap';
import { MarkGithubIcon } from '@primer/octicons-react';
import GuessWindow from './GuessWindow';

const repoUrl = 'https://github.com/lunakv/CardGuesser';

function App() {
  return (
    <>
      <Container fluid>
        <Navbar expand={false}>
          <Navbar.Brand className="ms-md-5" href="#">Card Guesser</Navbar.Brand>
          <Nav className="pe-md-4"><Nav.Link href={repoUrl}><MarkGithubIcon size={22} /></Nav.Link></Nav>

        </Navbar>
      </Container>
      <GuessWindow />
    </>
  );
}

export default App;
