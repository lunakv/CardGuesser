import { Modal } from 'react-bootstrap';
import { currentWinStreak, allTimeWinStreak, totalCorrect, totalTries } from './stats';

const winPercentage = () => ((totalCorrect() * 100) / totalTries()).toFixed(2);

function StatsModal({ show, onHide }: Props) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Stats</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Current Streak:
          {` ${currentWinStreak()}`}
        </p>
        <p>
          Longest Streak:
          {` ${allTimeWinStreak()}`}
        </p>
        <p>
          Total Correct Guesses:
          {` ${totalCorrect()} (${winPercentage()}%)`}
        </p>
        <p>
          Total Cards Seen:
          {` ${totalTries()}`}
        </p>
      </Modal.Body>
    </Modal>
  );
}

interface Props {
  show: boolean;
  onHide: () => void;
}

export default StatsModal;
