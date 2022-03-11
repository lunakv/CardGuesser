import Button from 'react-bootstrap/Button';
import {
  Card, Col, Container, Form, Row,
} from 'react-bootstrap';
import { FormEvent, useEffect, useState } from 'react';
import fetchRandom from './loadRandomCard';
import { CardObject, getArt, getName } from './CardObject';
import './GuessWindow.css';

function namesEqual(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

function GuessWindow() {
  const [isLoading, setLoading] = useState(true);
  const [card, setCard] = useState<CardObject | undefined>(undefined);
  const [guess, setGuess] = useState<string | undefined>(undefined);
  const [correct, setCorrect] = useState<number>(2);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isLoading) {
      fetchRandom().then(setCard);
    }
  }, [isLoading]);

  const handleClick = () => { setLoading(true); setRevealed(false); return false; };
  const handleLoaded = () => setLoading(false);
  const handleGiveUp = () => { setRevealed(true); setCorrect(2); };
  const handleChange = (e) => {
    setGuess(e.target.value);
    setCorrect(2);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (revealed) return false;
    if (guess && card && namesEqual(guess, getName(card))) {
      setCorrect(0);
      setRevealed(true);
    } else {
      setCorrect(1);
    }
    setGuess('');
    return false;
  };
  return (
    <Container fluid="md">
      <Row className="justify-content-lg-center">
        <Col lg="6">
          <Row className="justify-content-center">
            <Card id="question-image-container" className="border-0 px-0 mb-4">
              <Card.Img id="question-image" className={correct === 1 ? 'wrong' : ''} src={card && getArt(card)} onLoad={handleLoaded} />
              <Card.ImgOverlay hidden={correct !== 0} id="question-image-overlay" />
            </Card>
          </Row>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Control hidden={revealed} type="text" placeholder="Enter card name" value={guess} onChange={handleChange} />
              <Form.Control hidden={!revealed} plaintext readOnly value={card && getName(card)} />
            </Row>
            <Row className="justify-content-center mt-3">
              { revealed
                ? (
                  <Col xs="auto">
                    <Form.Control className="game-button btn-success" type="button" onClick={handleClick} value="Next" />
                  </Col>
                ) : (
                  <>
                    <Col xs="auto">
                      <Button className="game-button" variant="primary" type="submit">Guess</Button>
                    </Col>
                    <Col xs="auto">
                      <Button className="game-button" variant="danger" type="button" onClick={handleGiveUp}>Give Up</Button>
                    </Col>
                  </>
                )}

            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default GuessWindow;
