import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Form } from 'react-bootstrap';
import { FormEvent, useEffect, useState } from 'react';
import fetchRandom from './loadRandomCard';
import { Card, getArt, getName } from './Card';
import './GuessWindow.css';

function namesEqual(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

function guessToClassName(correct: boolean | undefined) {
  if (correct === undefined) return undefined;
  return correct ? 'correct' : 'wrong';
}

function GuessWindow() {
  const [isLoading, setLoading] = useState(true);
  const [card, setCard] = useState<Card | undefined>(undefined);
  const [guess, setGuess] = useState<string | undefined>(undefined);
  const [correct, setCorrect] = useState<boolean | undefined>(undefined);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isLoading) {
      fetchRandom().then(setCard);
    }
  }, [isLoading]);

  const handleClick = () => { setLoading(true); setRevealed(false); setCorrect(undefined); };
  const handleLoaded = () => setLoading(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (guess && card && namesEqual(guess, getName(card))) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };
  return (
    <div>
      <Image src={card && getArt(card)} onLoad={handleLoaded} />
      <Button variant="primary" onClick={!isLoading ? handleClick : undefined}>{isLoading ? 'Loading...' : 'Next'}</Button>
      <Form onSubmit={handleSubmit}>
        <Form.Control className={guessToClassName(correct)} type="text" placeholder="Enter card name" value={guess} onChange={(e) => setGuess(e.target.value)} />
        <Form.Label hidden={!revealed}>{card && getName(card)}</Form.Label>
        <Button variant="primary" type="submit">Submit</Button>
        <Button variant="warning" type="button" onClick={() => setRevealed(true)}>Show</Button>
      </Form>
    </div>
  );
}

export default GuessWindow;
