import './CardInfo.css';
import { CardObject } from './CardObject';

interface Props {
  hidden: boolean;
  card: CardObject;
}

export function CardInfo({ hidden, card }: Props) {
  if (!card) return null;
  return (
    <p hidden={hidden} className="text-center mt-2">
      <a className="card-info" target="_blank" rel="noopener noreferrer" href={card.scryfall_uri}>
        {card.name}
      </a>{' '}
      (by {card.artist})
    </p>
  );
}

export default CardInfo;
