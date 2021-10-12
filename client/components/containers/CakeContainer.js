import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCake, makeCake } from '../redux';

function CakeContainer() {
  const [number, setNumber] = useState(1);
  const numberOfCakes = useSelector((state) => state.cake.numberOfCakes);
  const cakeDispatch = useDispatch();

  return (
    <div>
      <h2>number of cakes {numberOfCakes}</h2>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={() => cakeDispatch(buyCake(number))}>
        buy {number} cakes
      </button>
      <button onClick={() => cakeDispatch(makeCake())}>make cake</button>
    </div>
  );
}

export default CakeContainer;
