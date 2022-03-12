export const getArt = (card: CardObject) => {
  if ('card_faces' in card) {
    return card.card_faces[0].image_uris.art_crop;
  }
  return card.image_uris.art_crop;
};

export const getFullName = (card: CardObject) => card.name;

export const getAllNames = (card: CardObject) => {
  if ('card_faces' in card) return card.card_faces.map((f) => f.name);
  if (card.name.includes('//')) return card.name.split('//').map((n) => n.trim());
  return [card.name];
};

export const getArtist = (card: CardObject) => {
  if ('card_faces' in card) {
    return card.card_faces[0].artist;
  }
  return card.artist;
};

interface CardBase {
  name: string;
  scryfall_uri: string;
}
export interface SimpleCardObject extends CardBase {
  image_uris: {
    art_crop: string,
  };
  artist: string;
}
export interface MultiFacedCardObject extends CardBase {
  card_faces: [
    {
      name: string,
      artist: string,
      image_uris: {
        art_crop: string,
      },
    },
  ];
}

export type CardObject = SimpleCardObject | MultiFacedCardObject;
