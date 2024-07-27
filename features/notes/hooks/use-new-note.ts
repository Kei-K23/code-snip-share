import { create } from 'zustand';

type UseNewNoteType = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewNote = create<UseNewNoteType>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));