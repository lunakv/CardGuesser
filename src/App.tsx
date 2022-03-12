import { Container, Nav, Navbar } from 'react-bootstrap';
import { MarkGithubIcon } from '@primer/octicons-react';
import { useState } from 'react';
import GuessWindow from './GuessWindow';
import StatsModal from './StatsModal';

const repoUrl = 'https://github.com/lunakv/CardGuesser';

function App() {
  const [showStats, setShowStats] = useState(false);
  return (
    <>
      <Container fluid>
        <Navbar expand>
          <Navbar.Brand className="ms-md-5" href="#">
            Card Guesser
          </Navbar.Brand>
          <Navbar.Collapse role="navigation">
            <Nav className="pe-md-4">
              <Nav.Link onClick={() => setShowStats(true)}>Stats</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href={repoUrl}>
                <MarkGithubIcon size={22} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <GuessWindow />

      <StatsModal show={showStats} onHide={() => setShowStats(false)} />
    </>
  );
}

export default App;
