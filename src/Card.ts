export const getArt = (card: Card) => card.image_uris.art_crop;
export const getName = (card: Card) => card.name;

export default {
  getArt,
  getName,
};

export interface Card {
  name: string;
  image_uris: {
    art_crop: string;
  }
}
