import { Col, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import './FilterSelect.css';

function FilterSelect({ filter, setFilter }: Props) {
  const [isExpanded, setExpanded] = useState(false);

  const handleChange = (e) => setFilter(e.target.value);
  return (
    <>
      <Col xs={12} className="mt-5 text-center">
        <button type="button" className="link-button" onClick={() => setExpanded((e) => !e)}>
          Filter Card Pool {isExpanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
        </button>
      </Col>
      <Col xs={12} className="mb-3">
        <FormControl
          type="input"
          value={filter}
          onChange={handleChange}
          isValid={false}
          hidden={!isExpanded}
          placeholder="Enter a Scryfall compatible filter"
        />
      </Col>
    </>
  );
}

interface Props {
  filter: string;
  setFilter: (string) => void;
}

export default FilterSelect;
