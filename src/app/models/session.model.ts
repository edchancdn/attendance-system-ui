import { Student } from "./student.model";

export class Session {
    id?: any;
    sessionDate?: string;
    startTime?: string;
    endTime?: string;
    attendenStudents?: Student[];
}
