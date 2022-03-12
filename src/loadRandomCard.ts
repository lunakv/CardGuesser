/* eslint-disable no-await-in-loop */
import { getArt } from './CardObject';

const queryURI = 'https://api.scryfall.com/cards/random';

async function fetchRandom(filter: string) {
  const query = filter === '' ? '' : `?q=${encodeURIComponent(filter)}`;
  let card;
  try {
    while (!card || !getArt(card)) {
      const res = await fetch(queryURI + query);
      card = await res.json();
      if (card.object === 'error') return undefined;
    }
    return card;
  } catch {
    return undefined;
  }
}

export default fetchRandom;
