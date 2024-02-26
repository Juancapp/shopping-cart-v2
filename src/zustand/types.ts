import { User } from "../types";

export interface UserStore {
  user: User | {};
  setUser: (arg0: User | {}, arg1?: boolean) => void;
  isFetching?: boolean;
}
