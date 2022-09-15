export interface StoryItem {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

export interface UserData {
    created: number;
    id: string;
    karma: number;
    submitted: number[];
}

export interface StoryDetails {
    id: number;
    title: string;
    url: string;
    time: number;
    score: number;
    authorId: string;
    authorKarmaScore: number;
    storyImage: string;
}