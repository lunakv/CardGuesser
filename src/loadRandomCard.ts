const queryURI = 'https://api.scryfall.com/cards/random';

async function fetchRandom() {
  const res = await fetch(queryURI);
  return res.json();
}

export default fetchRandom;
