const initialState = {
  food: [],
  newTaste: [],
  popular: [],
  recommended: [],
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FOOD':
      return {
        ...state,
        food: action.value,
      };

    case 'SET_NEW_TASTE':
      return {
        ...state,
        newTaste: action.value,
      };

    case 'SET_POPULAR':
      return {
        ...state,
        popular: action.value,
      };

    case 'SET_RECOMMENDED':
      return {
        ...state,
        recommended: action.value,
      };

    default:
      return state;
  }
};
