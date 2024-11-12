import React, { useState, useMemo } from 'react';

function Calculation() {
  const [number, setNumber] = useState(0);
  const [incrementCount, setIncrementCount] = useState(0);

  const slowSquare = (num) => {
    console.log('Calculating square...');
    for (let i = 0; i < 1000000000; i++) {} // Simulate heavy computation
    return num * num;
  };

  const squaredNumber = useMemo(() => slowSquare(number), [number]);

// const squaredNumber = slowSquare(number);
  return (
    <div>
      <h3>useMemo Example - Heavy Calculation</h3>
      <p>Number: {number}</p>
      <p>Squared Number: {squaredNumber}</p>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
      />
      <p>Unrelated Counter: {incrementCount}</p>
      <button onClick={() => setIncrementCount((prev) => prev + 1)}>Increment Counter</button>
    </div>
  );
}

export default Calculation;
