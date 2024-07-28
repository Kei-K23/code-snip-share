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
}

interface Topic {
    id: string;
    name: string;
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
    DataItem
}