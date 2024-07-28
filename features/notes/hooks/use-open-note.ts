import { create } from 'zustand';

type UseOpenNoteType = {
    id?: string;
    isOpen: boolean;
    onOpen: (id?: string) => void;
    onClose: () => void;
}

export const useOpenNote = create<UseOpenNoteType>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id?: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));