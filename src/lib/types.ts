
export interface Teacher {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    department: string;
}

export interface Class {
    id: string;
    name:string;
    studentCount: number;
    schedule: string;
    code: string;
}

export interface Session {
    id: string;
    class: string;
    time: string;
    students: number;
    status: 'active' | 'completed';
}
