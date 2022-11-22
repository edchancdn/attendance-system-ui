import { Session } from "./session.model";
import { Student } from "./student.model";

export class Cohort {
    id?: any;
    name?: string;
    courseName?: string;
    startDate?: Date;
    endDate?: Date;
    students?: Student[];
    sessions?: Session[];
}
