import { create } from "zustand";
import { User } from "../types";

export const useUserStore = create<{
  user: User | {};
  setUser: (arg0: User | {}) => void;
}>((set) => ({
  user: {},
  setUser: (user: User | {}) => set(() => ({ user: user })),
}));
