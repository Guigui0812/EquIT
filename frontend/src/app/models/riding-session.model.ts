export interface RidingSession {
    id: number;
    date: string;
    duration: number;
    lessonCapacity: number;
    lessonLevel: string;
    teacher: string;
    riders: any[];
    horses: any[];
}