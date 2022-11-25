import { Student } from "./student.model";

export class Session {
    id?: any;
    sessionDate?: Date;
    startTime?: string;
    endTime?: string;
    attendedStudents?: Student[];
    checked?: boolean;
}
