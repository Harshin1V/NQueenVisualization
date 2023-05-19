import React, { useState } from "react";

// Function to solve N-Queen problem
const solveNQueens = (n) => {
  const result = [];
  const board = Array(n)
    .fill()
    .map(() => Array(n).fill("."));

  const isValidMove = (row, col) => {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") {
        return false;
      }
      for (let j = 0; j < n; j++) {
        if (
          board[i][j] === "Q" &&
          (col - j === row - i || col - j === i - row)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const placeQueens = (row) => {
    if (row === n) {
      const solution = board.map((row) => row.join(""));
      result.push(solution);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValidMove(row, col)) {
        board[row][col] = "Q";
        placeQueens(row + 1);
        board[row][col] = ".";
      }
    }
  };

  placeQueens(0);
  return result;
};

const NQueenVisualization = () => {
  const [n, setN] = useState(4); // Default value is 4
  const [solutions, setSolutions] = useState([]);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    setN(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const result = solveNQueens(n);
    setSolutions(result);
  };

  return (
    <div>
      <h1>N-Queen Visualization</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Enter the number of queens (N):
          <input type="number" value={n} onChange={handleInputChange} min="1" />
        </label>
        <button type="submit">Generate Solutions</button>
      </form>
      <div>
        {solutions.map((solution, index) => (
          <div key={index}>
            <h2>Solution {index + 1}</h2>
            <table>
              <tbody>
                {solution.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.split("").map((cell, colIndex) => (
                      <td key={colIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NQueenVisualization;
