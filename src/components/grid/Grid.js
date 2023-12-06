import "./Grid.css";

const Grid = () => {
  const handleNumberClick = (number) => {
    console.log(`Klik ${number}`);
  };

  const renderTable = (rows, columns) => {
    let number = 1;
    const table = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        const currentNumber = number;
        row.push(
          <td
            key={number.toString()}
            onClick={() => handleNumberClick(currentNumber)}
          >
            {number}
          </td>
        );
        number++;
      }
      table.push(<tr key={i}>{row}</tr>);
    }

    return table;
  };

  return (
    <div className="Grid">
      <header className="Grid-header">
        <p>Keno</p>
      </header>
      {/* Render the grid of numbers and handle clicks */}
      <div>
        <table border="1" style={{ borderCollapse: "collapse" }}>
          <tbody>{renderTable(8, 10)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Grid;
