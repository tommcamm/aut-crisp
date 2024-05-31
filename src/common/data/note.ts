export interface Note {
    id: string,
    recruiterProfileId: string,
    candidateProfileId: string,
    notes: string,
}

export class Convert {
    public static toNote(json: string): Note {
        return JSON.parse(json) as Note;
    }

    public static toNotes(json: string): Array<Note> {
        return JSON.parse(json) as Array<Note>;
    }

    public static noteToJson(value: Note): string {
        return JSON.stringify(value);
    }
}
