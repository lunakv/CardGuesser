export const getArt = (card: CardObject) => card.image_uris.art_crop;
export const getName = (card: CardObject) => card.name;

export default {
  getArt,
  getName,
};

export interface CardObject {
  name: string;
  image_uris: {
    art_crop: string;
  }
}
