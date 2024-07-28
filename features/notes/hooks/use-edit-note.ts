import { create } from 'zustand';

type UseEditNoteType = {
    id?: string;
    isOpen: boolean;
    onOpen: (id?: string) => void;
    onClose: () => void;
}

export const useEditNote = create<UseEditNoteType>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id?: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));