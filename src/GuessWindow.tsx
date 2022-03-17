import Button from 'react-bootstrap/Button';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { FormEvent, useEffect, useState } from 'react';
import { CardObject, getAllNames, getArt, getFullName } from './CardObject';
import './GuessWindow.css';
import { CardInfo } from './CardInfo';
import { onGiveUp, onCorrect } from './stats';
import LoadingSpinner from './LoadingSpinner';

function isCorrectName(a: string, b: CardObject) {
  const al = a.toLowerCase();
  return getFullName(b).toLowerCase() === al || getAllNames(b).some((n) => n.toLowerCase() === al);
}

enum Guess {
  Correct,
  Wrong,
  Unknown,
}

function GuessWindow({ card, getNextCard, isLoading, setLoading }: Props) {
  const [guess, setGuess] = useState<string>('');
  const [correct, setCorrect] = useState<Guess>(Guess.Unknown);
  const [revealed, setRevealed] = useState(false);

  // fetch card on initial page load
  useEffect(() => {
    getNextCard();
  }, []);
  // focus the 'Next' button once the answer is revealed
  useEffect(() => {
    if (revealed) document.getElementById('next').focus();
  }, [revealed]);
  // focus the input once a card is loaded
  useEffect(() => {
    if (!isLoading) document.getElementById('guess-input').focus();
  }, [isLoading]);

  const handleNext = () => {
    setLoading(true);
    setRevealed(false);
    setCorrect(Guess.Unknown);
    setGuess('');
    getNextCard();
    return false;
  };
  const handleLoaded = () => {
    setLoading(false);
  };
  const handleGiveUp = () => {
    setRevealed(true);
    setCorrect(Guess.Unknown);
    onGiveUp();
  };
  const handleChange = (e) => {
    setGuess(e.target.value);
    setCorrect(Guess.Unknown);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (revealed) return false;
    if (guess && card && isCorrectName(guess, card)) {
      setCorrect(Guess.Correct);
      setRevealed(true);
      onCorrect();
    } else {
      setCorrect(Guess.Wrong);
    }
    setGuess('');
    return false;
  };
  return (
    <>
      <Row className="justify-content-lg-center">
        <LoadingSpinner hidden={!isLoading} />
        <Col xs={12} hidden={isLoading || !!card} className="p-5">
          <p>Could not load a card. Please check your filter.</p>
        </Col>
        <Col lg="6" hidden={isLoading || !card}>
          <Row className="justify-content-center">
            <Card id="question-image-container" className="border-0 px-0 mb-4">
              <Card.Img
                hidden={isLoading}
                id="question-image"
                className={correct === Guess.Wrong ? 'wrong' : ''}
                src={card && getArt(card)}
                onLoad={handleLoaded}
              />
              <Card.ImgOverlay hidden={correct !== Guess.Correct} id="question-image-overlay" />
            </Card>
          </Row>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit} hidden={isLoading}>
        <Row style={{ height: '3em' }}>
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
        </Row>
      </Form>
    </>
  );
}

interface Props {
  getNextCard: () => void;
  card: CardObject;
  isLoading: boolean;
  setLoading: (arg: boolean) => void;
}
export default GuessWindow;
