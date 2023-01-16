import './App.css';
import React, { useState } from 'react';
import data from './data/data.json';

function App() {
  const [items, setItems] = useState(
    data.map((datum) => {
      return { ...datum, closed: true };
    })
  );

  const toggle = (id) => {
    setItems(
      items.map((item) => {
        const { closed } = item;
        if (item.id === id) return { ...item, closed: !closed };
        return item;
      })
    );
  };
  return (
    <div>
      {items.map((item, idx) => {
        return (
          <div key={idx}>
            <p
              className="title"
              onClick={() => {
                toggle(item.id);
              }}
            >
              {item.title}
            </p>
            <p className={item.closed ? 'hide' : ''}>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
