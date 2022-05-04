import { useState, useRef, useEffect } from 'react';
import { Header, Controls, Grid } from './components';
import { InfoList } from './components/InfoList';
import IData from './models/Data';
import AppService from './services/app';

export default function App() {
  const [size, setSize] = useState(5);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [start, setStart] = useState(false);
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState<Array<IData>>([]);
  const [info, setInfo] = useState<Array<string>>([]);

  const gridKey = useRef(Date.now());

  useEffect(() => {
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isClear) {
      setIsClear(false);
      gridKey.current = Date.now();
    }
  }, [size, isClear]);

  useEffect(() => {
    const border = '1px solid lightgray';
    document.documentElement.style.setProperty('--border', border);
  }, []);

  const getData = async (): Promise<any> => {
    try {
      const _data = await AppService.getAll()
      setData(_data?.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleSelect = ({
    target: { value }
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(true);
    setSize(+value);
    setIsClear(true);
    setInfo([]);
  };

  const handleDraw = () => (e: React.MouseEvent) => {
    if (!start || !selected) return
    const cell = e.target as HTMLDivElement;
    if (isMouseDown) {
      cell.style.backgroundColor = 'white';
      return;
    };


    const index = Number(cell.getAttribute('data-att'));
    const col = (index + 1) % size === 0 ? size : (index + 1) % size;
    const row = Math.floor(index / size) + 1;
    setInfo(prevSelected => [...prevSelected, `row: ${row} col: ${col}`]);
    if (cell.style.backgroundColor === 'rgb(3, 168, 244)') {
      cell.style.backgroundColor = 'white';
    }
    else {
      cell.style.backgroundColor = '#03a8f4';
    }

  };

  const toggleStart = () => {
    setStart(true);
    setIsClear(true);
    setInfo([]);
  }

  return (
    <div className='App'>
      <Header />
      <main>
        <div className='container'>
          <Controls
            toggleStart={toggleStart}
            handleSelect={handleSelect}
            options={data}
          />
          <Grid
            size={size}
            gridKey={gridKey.current}
            handleDraw={handleDraw}
          />
        </div>
        <InfoList info={info} />
      </main>
    </div>
  );
}
