import { constant } from "../constant";

const init_state = {
  id: 0,
  username: "",
  email: "",
};

export const userReducer = (state = init_state, action) => {
  if (action.type === constant.login)
    return { ...init_state, ...action.payload };
  if (action.type === constant.logout) return init_state;
  return state;
};
