import { ToastType } from "../../../zustand/types";

export const classTypes = {
  [ToastType.SUCCESS]: {
    bgColor: "bg-green-500",
    ringColor: "focus:ring-green-500",
    darkRingColor: "dark:focus:ring-green-700",
    ringOffsetColor: "focus:ring-offset-green-800",
  },
  [ToastType.ERROR]: {
    bgColor: "bg-red-500",
    ringColor: "focus:ring-red-500",
    darkRingColor: "dark:focus:ring-red-700",
    ringOffsetColor: "focus:ring-offset-red-800",
  },
  [ToastType.INFO]: {
    bgColor: "bg-blue-500",
    ringColor: "focus:ring-blue-500",
    darkRingColor: "dark:focus:ring-blue-700",
    ringOffsetColor: "focus:ring-offset-blue-800",
  },
};
