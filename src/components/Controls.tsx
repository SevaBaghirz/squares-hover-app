import IData from "../models/Data";

interface ControlProps {
  toggleStart: () => void;
  handleSelect: ({
    target: { value }
  }: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<IData>;
}

export function Controls({
  toggleStart,
  handleSelect,
  options,
}: ControlProps) {
  return (
    <div className='controls'>
      <select
        defaultValue=""
        onChange={handleSelect}
        required
      >
        <option value="" disabled hidden>Pick mode</option>
        {options.map((option: IData, i) => (
          <option key={i} value={option.field}>{option.name}</option>
        ))}
      </select>
      <button type='button' onClick={toggleStart}>
        Start
      </button>
    </div>
  );
}
