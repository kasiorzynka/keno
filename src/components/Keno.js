import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./Keno.css";
import "bootstrap/dist/css/bootstrap.min.css";
//@ts-check

const Keno = () => {
  const [numbers, setNumbers] = useState([]);
  const [stake, setStake] = useState(0);

  const changeOneGridElementColor = (number, color) =>
    (document.getElementById(
      `number-${number.toString()}`
    ).style.backgroundColor = color);

  const clearFullGridLayout = () =>
    document.querySelectorAll(".grid-tbody td").forEach((number) => {
      number.style.backgroundColor = "#fff";
    });

  const handleNumberClick = (number) => {
    // Removing numbers clicked again
    if (numbers.includes(number)) {
      setNumbers(numbers.filter((value) => value !== number));
      changeOneGridElementColor(number, "#fff");
      // Adding new numbers if there is chosen less than 5
    } else if (numbers.length < 5) {
      setNumbers((oldArray) => [...oldArray, number]);
      changeOneGridElementColor(number, "#e1e1e1");
    } else {
      alert("Max 5 numbers!");
    }
  };

  const handleLuckyPick = () => {
    // Removes previous choices
    setNumbers([]);
    clearFullGridLayout();
    // Adding 5 random numbers
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * (80 - 1 + 1)) + 1;
      changeOneGridElementColor(randomNumber, "#e1e1e1");
      setNumbers((oldArray) => [...oldArray, randomNumber]);
    }
  };

  const handleStakeClick = (e) => {
    // Handles buttons with the most popular stakes
    const stakeButtons = document.querySelectorAll(".stake-buttons .btn");
    stakeButtons.forEach((button) => {
      button.classList.remove("active");
    });
    e.target.classList.add("active");
    setStake(e.target.value);
  };

  const handleBetClick = () => {
    // Handles validation and clears out the selections
    if (numbers.length === 5 && stake > 0) {
      alert(`You bet ${stake}$ on numbers: ${numbers.join()}`);
    } else {
      alert(
        `Please choose 5 numbers or click Lucky pick button, choose a stake and then click Place bet button.`
      );
    }
    setStake(0);
    setNumbers([]);
    clearFullGridLayout();
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
            className="grid-td"
            id={`number-${number.toString()}`}
            key={number.toString()}
            value={number}
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
    <div className="grid">
      <header className="grid-header">
        <p>Keno</p>
      </header>
      <div className="instruction">
        <p>
          Please choose 5 numbers or click Lucky pick button, choose a stake and
          click Place bet button.
        </p>
        <p>Good luck!</p>
      </div>
      {/* Render the grid of numbers and handle clicks */}
      <div className="grid-body">
        <Table bordered>
          <tbody className="grid-tbody">{renderTable(8, 10)}</tbody>
        </Table>
      </div>
      <div>
        <Button
          className="lucky-pick"
          variant="secondary"
          onClick={() => handleLuckyPick()}
        >
          Lucky Pick
        </Button>
      </div>
      <div className="stake-buttons">
        <Button variant="light" value="50" onClick={(e) => handleStakeClick(e)}>
          $50
        </Button>
        <Button
          variant="light"
          value="100"
          onClick={(e) => handleStakeClick(e)}
        >
          $100
        </Button>
        <Button
          variant="light"
          value="200"
          onClick={(e) => handleStakeClick(e)}
        >
          $200
        </Button>
        <Button
          variant="light"
          value="500"
          onClick={(e) => handleStakeClick(e)}
        >
          $500
        </Button>
        <Button
          variant="light"
          value="1000"
          onClick={(e) => handleStakeClick(e)}
        >
          $1000
        </Button>
        <input
          className="stake-input"
          type="number"
          placeholder="0"
          min="0"
          value={stake}
          onChange={(e) => handleStakeClick(e)}
        />
        $
      </div>
      <Button
        className="place-bet"
        variant="dark"
        value={stake}
        onClick={() => handleBetClick()}
      >
        Place bet
      </Button>
    </div>
  );
};

export default Keno;
