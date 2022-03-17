import { Container, Nav, Navbar } from 'react-bootstrap';
import { MarkGithubIcon } from '@primer/octicons-react';
import { useState } from 'react';
import GuessWindow from './GuessWindow';
import StatsModal from './StatsModal';
import FilterSelect from './FilterSelect';
import { fetchRandom } from './loadRandomCard';

const repoUrl = 'https://github.com/lunakv/CardGuesser';

function App() {
  const [showStats, setShowStats] = useState(false);
  const [card, setCard] = useState(undefined);
  const [isLoading, setLoading] = useState(true);
  // actual function must be wrapped in arrow function to get around lazy assignment
  const [nextCardFn, setNextCardFn] = useState(() => fetchRandom);

  const getNextCard = () => nextCardFn().then(setCard);

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
      <Container fluid="md">
        <GuessWindow card={card} getNextCard={getNextCard} isLoading={isLoading} setLoading={setLoading} />
        {!isLoading && <FilterSelect setNextCardFn={(fn) => setNextCardFn(() => fn)} />}
      </Container>

      <StatsModal show={showStats} onHide={() => setShowStats(false)} />
    </>
  );
}

export default App;
