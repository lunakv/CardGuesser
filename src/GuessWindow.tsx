import Button from 'react-bootstrap/Button';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { FormEvent, useEffect, useState } from 'react';
import fetchRandom from './loadRandomCard';
import { CardObject, getAllNames, getArt, getFullName } from './CardObject';
import './GuessWindow.css';
import { CardInfo } from './CardInfo';
import { onGiveUp, onCorrect } from './stats';
import LoadingSpinner from './LoadingSpinner';
import FilterSelect from './FilterSelect';

function isCorrectName(a: string, b: CardObject) {
  const al = a.toLowerCase();
  return getFullName(b).toLowerCase() === al || getAllNames(b).some((n) => n.toLowerCase() === al);
}

function GuessWindow() {
  const [isLoading, setLoading] = useState(true);
  const [card, setCard] = useState<CardObject | undefined>(undefined);
  const [guess, setGuess] = useState<string>('');
  const [correct, setCorrect] = useState<number>(2);
  const [revealed, setRevealed] = useState(false);
  const [filter, setFilter] = useState('');
  const getNextCard = () =>
    fetchRandom(filter).then((c) => {
      if (!c) setLoading(false);
      setCard(c);
    });

  // fetch card on initial page load
  useEffect(() => {
    getNextCard();
  }, []);
  // focus the 'Next' button once the answer is revealed
  useEffect(() => {
    if (revealed) {
      document.getElementById('next').focus();
    }
  }, [revealed]);
  // focus the input once a card is loaded
  useEffect(() => {
    if (!isLoading) document.getElementById('guess-input').focus();
  }, [isLoading]);

  const handleNext = () => {
    setLoading(true);
    setCard(undefined);
    setRevealed(false);
    setCorrect(2);
    getNextCard();
    return false;
  };
  const handleLoaded = () => {
    setLoading(false);
  };
  const handleGiveUp = () => {
    setRevealed(true);
    setCorrect(2);
    onGiveUp();
  };
  const handleChange = (e) => {
    setGuess(e.target.value);
    setCorrect(2);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (revealed) return false;
    if (guess && card && isCorrectName(guess, card)) {
      setCorrect(0);
      setRevealed(true);
      onCorrect();
    } else {
      setCorrect(1);
    }
    setGuess('');
    return false;
  };
  return (
    <Container fluid="md">
      <Row className="justify-content-lg-center">
        <LoadingSpinner hidden={!isLoading} />
        <Col xs={12} hidden={isLoading || !!card} className="p-5">
          <p>Could not load a card. Please check your filter.</p>
        </Col>
        <Col lg="6" hidden={isLoading}>
          <Row className="justify-content-center">
            <Card id="question-image-container" className="border-0 px-0 mb-4">
              <Card.Img
                hidden={isLoading}
                id="question-image"
                className={correct === 1 ? 'wrong' : ''}
                src={card && getArt(card)}
                onLoad={handleLoaded}
              />
              <Card.ImgOverlay hidden={correct !== 0} id="question-image-overlay" />
            </Card>
          </Row>

          <Form onSubmit={handleSubmit}>
            <Row style={{ height: '3em' }} hidden={!isLoading && !card}>
              <Form.Control
                id="guess-input"
                hidden={revealed}
                type="text"
                placeholder="Enter card name"
                value={guess}
                onChange={handleChange}
              />
              <CardInfo hidden={!revealed} card={card} />
            </Row>
            <Row className="justify-content-center mt-3">
              {revealed || (!isLoading && !card) ? (
                <Col xs="auto">
                  <input
                    id="next"
                    className="game-button btn btn-success"
                    type="button"
                    onClick={handleNext}
                    value="Next"
                  />
                </Col>
              ) : (
                <>
                  <Col xs="auto">
                    <Button className="game-button" variant="primary" type="submit">
                      Guess
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button className="game-button" variant="danger" type="button" onClick={handleGiveUp}>
                      Give Up
                    </Button>
                  </Col>
                </>
              )}
              <Col xs={12}>
                <FilterSelect filter={filter} setFilter={setFilter} />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default GuessWindow;
