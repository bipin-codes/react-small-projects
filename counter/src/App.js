import React, { useState } from 'react';

function App() {
  const [val, setVal] = useState(0);
  const onAdd = () => {
    setVal(val + 1);
  };
  const onSubtract = () => {
    setVal(val - 1);
  };
  return (
    <div>
      <label>Current Value : {val}</label>
      <button onClick={onAdd}>Add</button>
      <button onClick={onSubtract}>Sub</button>
    </div>
  );
}

export default App;
