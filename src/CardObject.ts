export const getArt = (card: CardObject) => {
  if ('image_uris' in card) {
    return card.image_uris.art_crop;
  }
  if ('card_faces' in card && 'image_uris' in card.card_faces[0]) {
    return card.card_faces[0].image_uris.art_crop;
  }
  return undefined;
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

export interface SplitCardObject extends CardBase {
  card_faces: [];
  image_uris: {
    art_crop: string,
  };
  artist: string;
}

export type CardObject = SimpleCardObject | MultiFacedCardObject | SplitCardObject;
