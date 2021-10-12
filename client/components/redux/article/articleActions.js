import { BUY_CAKE, MAKE_CAKE } from './cakeTypes';

export const buyCake = (number = 1) => {
  return {
    type: BUY_CAKE,
    payload: number,
  };
};

export const makeCake = () => {
  return {
    type: MAKE_CAKE,
  };
};
