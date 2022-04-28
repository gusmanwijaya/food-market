const initStateSignUp = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

export const signUpReducer = (state = initStateSignUp, action) => {
  switch (action.type) {
    case 'SET_SIGNUP':
      return {
        ...state,
        name: action.value.name,
        email: action.value.email,
        password: action.value.password,
        password_confirmation: action.value.password_confirmation,
      };

    default:
      return state;
  }
};

const initPhoto = {
  uri: '',
  type: '',
  name: '',
  isUploadPhoto: false,
};

export const photoReducer = (state = initPhoto, action) => {
  switch (action.type) {
    case 'SET_PHOTO':
      return {
        ...state,
        uri: action.value.uri,
        type: action.value.type,
        name: action.value.name,
      };

    case 'SET_UPLOAD_STATUS':
      return {
        ...state,
        isUploadPhoto: action.value,
      };

    default:
      return state;
  }
};
