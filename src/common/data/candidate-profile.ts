// To parse this data:
//
//   import { Convert, CandidateProfiles } from "./file";
//
//   const candidateProfiles = Convert.toCandidateProfiles(json);

export interface CandidateProfile {
    cvUri:    string;
    dob:      string;
    email:    string;
    id:       string;
    jobId:    Array<string>;
    lastName: string;
    name:     string;
    videoUri: string;
    [property: string]: unknown;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCandidateProfile(json: string): CandidateProfile {
        return JSON.parse(json) as CandidateProfile;
    }

    public static toCandidateProfiles(json: string): Array<CandidateProfile> {
        return JSON.parse(json) as Array<CandidateProfile>;
    }

    public static candidateProfilesToJson(value: CandidateProfile): string {
        return JSON.stringify(value);
    }
}
