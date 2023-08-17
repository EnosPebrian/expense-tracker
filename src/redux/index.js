import { dataReducer } from "./reducer/data";
import { userReducer } from "./reducer/user";

export const reducers = {
  auth: userReducer,
  dataexpense: dataReducer,
};
