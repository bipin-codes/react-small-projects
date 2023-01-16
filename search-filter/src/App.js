import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom/client';

const data = [
  'Banana',
  'Pineapple',
  'Guava',
  'Strawberry',
  'Orange',
  'Tomato',
  'Kiwi',
  'Apple',
  'Appy',
  'Avocado',
];
function App() {
  const [items, setItems] = useState(data);
  const [term, setTerm] = useState('');

  const onChangeHandler = (event) => {
    const { target } = event;
    setTerm(target.value);
  };

  useEffect(() => {
    setItems(data.filter((x) => x.match(term)));
  }, [term]);

  return (
    <div>
      <div>
        <label>Search : </label>
        <input
          value={term}
          onChange={onChangeHandler}
          type={'text'}
          placeholder="Enter the name"
        />
      </div>
      <div>
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
