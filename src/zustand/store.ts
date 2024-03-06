import { create } from "zustand";
import { ToastStore, ToastType } from "./types";

export const useToastStore = create<ToastStore>((set) => ({
  type: ToastType.SUCCESS,
  text: "",
  setToast: (type, text) => {
    setTimeout(() => {
      return set(() => {
        return { type: ToastType.SUCCESS, text: "" };
      });
    }, 5000);

    return set(() => {
      return { type: type, text };
    });
  },
}));
