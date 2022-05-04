interface ControlProps {
  info: Array<string>;
}

export function InfoList({
  info
}: ControlProps) {
  return (
    <div className='container'>
      <h1>Hover squares</h1>
        <div className="info_container">
          <ul className="info_container_ul">
            {info.map((item, i) => {
              return (
                <li
                  className='info'
                  key={i}
                >
                  <div>{item}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
  );
}
