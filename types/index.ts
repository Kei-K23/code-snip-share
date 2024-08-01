interface Note {
    id: string;
    title: string;
    description: string;
    code: string;
    userId: string;
    language: string;
    isPreDeleted: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    topics: Topic[];
    favorite: Favorite | null
    user: User
}

interface Topic {
    id: string;
    name: string;
}
interface User {
    id: string,
    username: string,
    imageUrl?: string | null,
    email: string
}

interface Favorite {
    id: string;
    userId: string;
    noteId: string;
}

interface DataItem {
    topics_to_notes: {
        topicId: string;
        noteId: string;
        userId: string;
    };
    notes: Omit<Note, 'topics'>;
    topics: Topic;
}

export type {
    Note,
    Topic,
    DataItem,
    Favorite,
    User
}