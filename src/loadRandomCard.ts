/* eslint-disable no-await-in-loop */
import { getArt } from './CardObject';

const enc = encodeURIComponent;
const randomUri = (f) => `https://api.scryfall.com/cards/random${f && `?q=${enc(f)}`}`;
const cardIdUri = (id) => `https://api.scryfall.com/cards/${enc(id)}`;
const cubeUri = (id) => `https://cubecobra.com/cube/api/cubeJSON/${enc(id)}`;

async function fetchCard(uri: string) {
  let card;
  try {
    // repeat fetch until we get a card that has an art crop (or an error)
    while (!card || !getArt(card)) {
      const res = await fetch(uri);
      card = await res.json();
      if (card.object === 'error') return undefined;
    }
    return card;
  } catch {
    return undefined;
  }
}

const getRandom = (list: string[]) => (list.length ? list[Math.floor(Math.random() * list.length)] : undefined);

export const fetchRandom = (filter: string = '') => fetchCard(randomUri(filter));
export const fetchById = (id) => fetchCard(cardIdUri(id));
export const fetchRandomFromList = (list) => fetchCard(cardIdUri(getRandom(list)));

export async function fetchCubeCardIds(id: string) {
  try {
    const res = await fetch(cubeUri(id));
    if (!res.ok) return undefined;
    const cube = await res.json();
    return cube.cards.map((c) => c.cardID);
  } catch {
    return undefined;
  }
}

export default fetchRandom;
