import { User } from "../types";

export interface UserStore {
  user: User;
  setUser: (arg0: User) => void;
}
