const initialState = {
  isLoading: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.value,
      };

    default:
      return state;
  }
};

export {globalReducer};
