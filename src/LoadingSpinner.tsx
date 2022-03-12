import { Spinner } from 'react-bootstrap';

function LoadingSpinner({ hidden }: Props) {
  return (
    <div className={`justify-content-center align-items-center mt-2 ${hidden ? 'd-none' : 'd-flex'}`}>
      <Spinner animation="border" />
    </div>
  );
}

interface Props {
  hidden: boolean;
}

export default LoadingSpinner;
