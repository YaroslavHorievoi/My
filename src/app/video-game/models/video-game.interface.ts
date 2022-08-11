export interface VideoGameInterface {
    id: number;
    first_release_date: number;
    name: string;
    rating: number;
    summary: string;
}

export interface VideoGameFilterInterface {
    gameName: string;
    gameRating: number;
    orderName: string;
    order: string;
}
