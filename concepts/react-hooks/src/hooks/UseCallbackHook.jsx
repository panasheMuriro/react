import React, { useState, useCallback } from 'react';

function Button() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <h3>useCallback Example - Button</h3>
      <p>Button clicked: {count} times</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}

export default Button;