import { Button, Form, FormControl, FormGroup, FormLabel, Modal, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { fetchCubeCardIds } from './loadRandomCard';

export function ScryfallFilterModal({ show, onHide, onSubmit }: ScryfallModalProps) {
  const [filter, setFilter] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filter);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Scryfall Filter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormControl
            type="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={'e.g. "type:creature color:black"'}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export function CubeFilterModal({ show, onHide, onSubmit }: CubeModalProps) {
  const [id, setId] = useState('');
  const [isInvalid, setInvalid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setId(e.target.value);
    setInvalid(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchCubeCardIds(id).then((l) => {
      setLoading(false);
      if (l === undefined) setInvalid(true);
      else {
        onSubmit(l);
        onHide();
      }
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Use Cards From Cube</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Cube Cobra ID</FormLabel>
            <FormControl
              type="input"
              isInvalid={isInvalid}
              value={id}
              onChange={handleChange}
              placeholder={'e.g. "modovintage"'}
            />
            <FormControl.Feedback type="invalid">
              Couldn&apos;t load cube. Did you enter a valid ID?
            </FormControl.Feedback>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Apply'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

interface ScryfallModalProps extends ModalProps {
  onSubmit: (arg: string) => void;
}

interface CubeModalProps extends ModalProps {
  onSubmit: (arg: string[]) => void;
}

export default { ScryfallFilterModal, CubeFilterModal };
