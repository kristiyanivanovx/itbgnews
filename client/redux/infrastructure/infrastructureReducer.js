import getEndpoint from '../../utilities/infrastructure/getEndpoint';

const initialState = {
  endpoint: getEndpoint(),
};

const infrastructureReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default infrastructureReducer;
