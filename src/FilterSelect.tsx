import { ButtonGroup, Col, ToggleButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react';
import './FilterSelect.css';
import { CardObject } from './CardObject';
import { fetchRandom, fetchRandomFromList } from './loadRandomCard';
import { CubeFilterModal, ScryfallFilterModal } from './FilterModals';

enum FilterMode {
  None,
  Scryfall,
  Cube,
}

function FilterSelect({ setNextCardFn, hidden }: Props) {
  const [isExpanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState('');
  const [mode, setMode] = useState(FilterMode.None);
  const [shownModal, setShownModal] = useState(FilterMode.None);
  const [cubeList, setCubeList] = useState([]);

  useEffect(() => {
    switch (mode) {
      case FilterMode.None:
        setNextCardFn(fetchRandom);
        break;
      case FilterMode.Scryfall:
        setNextCardFn(() => fetchRandom(filter));
        break;
      case FilterMode.Cube:
        setNextCardFn(() => fetchRandomFromList(cubeList));
        break;
      default:
        break;
    }
  }, [mode, filter, cubeList]);

  const handleScryfallFilter = (f) => {
    setMode(FilterMode.Scryfall);
    setFilter(f);
  };
  const handleCubeFilter = (list) => {
    setMode(FilterMode.Cube);
    setCubeList(list);
  };
  const handleNoneFilter = () => setMode(FilterMode.None);

  return (
    <div hidden={hidden}>
      <Col xs={12} className="mt-5 text-center">
        <button type="button" className="link-button" onClick={() => setExpanded((e) => !e)}>
          Filter Card Pool {isExpanded ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
        </button>
      </Col>
      <Col xs={12} className="mt-1 text-center" hidden={!isExpanded}>
        <ButtonGroup>
          <ToggleButton
            type="radio"
            variant="outline-secondary"
            value="none"
            checked={mode === FilterMode.None}
            onClick={handleNoneFilter}
          >
            No Filter
          </ToggleButton>
          <ToggleButton
            type="radio"
            variant="outline-secondary"
            value="scryfall"
            checked={mode === FilterMode.Scryfall}
            onClick={() => setShownModal(FilterMode.Scryfall)}
          >
            Scryfall
          </ToggleButton>
          <ToggleButton
            type="radio"
            variant="outline-secondary"
            value="cube"
            checked={mode === FilterMode.Cube}
            onClick={() => setShownModal(FilterMode.Cube)}
          >
            Cube
          </ToggleButton>
        </ButtonGroup>
      </Col>
      <ScryfallFilterModal
        onHide={() => setShownModal(FilterMode.None)}
        show={shownModal === FilterMode.Scryfall}
        onSubmit={handleScryfallFilter}
      />
      <CubeFilterModal
        onSubmit={handleCubeFilter}
        show={shownModal === FilterMode.Cube}
        onHide={() => setShownModal(FilterMode.None)}
      />
    </div>
  );
}

interface Props {
  setNextCardFn: (arg: () => Promise<CardObject>) => void;
  hidden: boolean;
}

export default FilterSelect;
