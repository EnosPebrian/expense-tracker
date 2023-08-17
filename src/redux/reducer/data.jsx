import { constant } from "../constant";

const init_state = {
  id: 0,
  name: "",
  nominal: 0,
  category: "",
  date: "",
  time: "",
};

export const dataReducer = (state = init_state, action) => {
  if (action.type === constant.editdata)
    return { ...init_state, ...action.payload };
  if (action.type === constant.finishedit) return init_state;
  return state;
};
