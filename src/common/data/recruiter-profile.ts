export interface RecruiterProfile {
    companyName: string;
    name: string;
    lastName: string;
    email: string;
    id: string;
}

export class Convert {
    public static toRecruiterProfile(json: string): RecruiterProfile {
        return JSON.parse(json) as RecruiterProfile;
    }

    public static toRecruiterProfiles(json: string): Array<RecruiterProfile> {
        return JSON.parse(json) as Array<RecruiterProfile>;
    }

    public static recruiterProfilesToJson(value: RecruiterProfile): string {
        return JSON.stringify(value);
    }
}
