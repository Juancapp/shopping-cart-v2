export enum ToastType {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

export interface ToastStore {
  type: ToastType;
  text: string;
  setToast: (type: ToastType, text: string) => void;
}
