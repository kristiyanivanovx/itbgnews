import getEndpoint from '../../utilities/getEndpoint';

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
