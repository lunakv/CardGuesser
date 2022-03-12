import { Modal } from 'react-bootstrap';
import { currentWinStreak, allTimeWinStreak, totalCorrect } from './stats';

interface Props {
  show: boolean;
  onHide: () => void;
}

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
          {` ${totalCorrect()}`}
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default StatsModal;
