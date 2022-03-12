import './CardInfo.css';
import { getArtist, getFullName, MultiFacedCardObject, SimpleCardObject } from './CardObject';

interface Props {
  hidden: boolean;
  card: SimpleCardObject | MultiFacedCardObject | undefined;
}

export function CardInfo({ hidden, card }: Props) {
  if (!card) return null;
  return (
    <p hidden={hidden} className="text-center mt-2">
      <a className="card-info" target="_blank" rel="noopener noreferrer" href={card.scryfall_uri}>
        {getFullName(card)}
      </a>{' '}
      (by {getArtist(card)})
    </p>
  );
}

export default CardInfo;
