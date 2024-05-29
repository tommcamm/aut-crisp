export interface Job {
    id: string,
    title: string,
    description: string,
    salary: string,
    categoryId: string,
}

export class Convert {
    public static toJob(json: string): Job {
        return JSON.parse(json) as Job;
    }

    public static toJobs(json: string): Array<Job> {
        return JSON.parse(json) as Array<Job>;
    }

    public static jobToJson(value: Job): string {
        return JSON.stringify(value);
    }
}
