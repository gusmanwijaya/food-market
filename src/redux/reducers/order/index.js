const initialState = {
  order: [],
  inProgress: [],
  pastOrders: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return {
        ...state,
        order: action.value,
      };

    case 'SET_IN_PROGRESS':
      return {
        ...state,
        inProgress: action.value,
      };

    case 'SET_PAST_ORDERS':
      return {
        ...state,
        pastOrders: action.value,
      };

    default:
      return state;
  }
};
