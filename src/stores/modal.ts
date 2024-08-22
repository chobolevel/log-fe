import {useShallow} from "@/hooks";
import {ReactNode} from "react";
import {create} from "zustand";
import {Nullable} from "@/types";

interface Modal<T> {
  modal: React.FC<T>;
  props: T;
}

interface Alert {
  title?: string;
  content: ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
}

interface Confirm {
  title?: string;
  content: ReactNode;
  onConfirm?: () => void;
}

interface Viewer {
  images: { src: string; alt: string }[];
  index: number;
}

interface T {
  modals: Modal<any>[];
  alert: Nullable<Alert>;
  confirm: Nullable<Confirm>;
  viewer: Nullable<Viewer>;

  openModal: <T>(modal: React.FC<T>, props: Omit<T, "onClose">) => void;
  openAlert: (alert: Alert) => void;
  openConfirm: (confirm: Confirm) => void;
  openViewer: (images: { src: string; alt: string }[], index: number) => void;

  closeModal: (modal: React.FC) => void;
  closeAllModal: () => void;
  closeAlert: () => void;
  closeConfirm: () => void;
  closeViewer: () => void;
}

export const modalStore = create<T>((set) => ({
  modals: [],
  alert: null,
  confirm: null,
  viewer: null,

  openModal: (modal, props) =>
    set((state) => ({modals: [...state.modals, {modal, props}]})),
  openAlert: (alert) => set({alert}),
  openConfirm: (confirm) => set({confirm}),
  openViewer: (images, index) => set({viewer: {images, index}}),

  closeModal: (modal) =>
    set((state) => ({modals: state.modals.filter((m) => m.modal !== modal)})),
  closeAllModal: () => set((state) => ({modals: []})),
  closeAlert: () => set({alert: null}),
  closeConfirm: () => set({confirm: null}),
  closeViewer: () => set({viewer: null}),
}));

export const useModalStore = <K extends keyof T>(keys: K[]) => {
  return useShallow(modalStore, keys);
};
