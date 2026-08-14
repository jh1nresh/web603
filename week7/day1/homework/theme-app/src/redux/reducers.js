import { TOGGLE_DARKTHEME } from "./actions";

const initialState = {
  isDarkTheme: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DARKTHEME:
      return { ...state, isDarkTheme: !state.isDarkTheme };
    default:
      return state;
  }
}
