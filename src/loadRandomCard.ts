/* eslint-disable no-await-in-loop */
import { getArt } from './CardObject';

const queryURI = 'https://api.scryfall.com/cards/random';

async function fetchRandom() {
  let card;
  while (!card || !getArt(card)) {
    const res = await fetch(queryURI);
    card = await res.json();
  }
  return card;
}

export default fetchRandom;
