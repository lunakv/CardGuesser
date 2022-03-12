import { getArt } from './CardObject';

const queryURI = 'https://api.scryfall.com/cards/random';

async function fetchRandom() {
  let card;
  while (!card || !getArt(card)) {
    // eslint-disable-next-line no-await-in-loop
    const res = await fetch(queryURI);
    card = res.json();
  }
  return card;
}

export default fetchRandom;
