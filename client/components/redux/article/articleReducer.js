import { BUY_CAKE, MAKE_CAKE } from './cakeTypes';

const initialState = {
  numberOfCakes: 15,
};

const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - action.payload,
      };
    case MAKE_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes + 1,
      };
    default:
      return state;
  }
};

export default cakeReducer;
