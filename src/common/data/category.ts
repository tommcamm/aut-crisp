export interface Category {
    id: string,
    description: string,
}

export class Convert {
    public static toCategory(json: string): Category {
        return JSON.parse(json) as Category;
    }

    public static toCategories(json: string): Array<Category> {
        return JSON.parse(json) as Array<Category>;
    }

    public static categoryToJson(value: Category): string {
        return JSON.stringify(value);
    }
}
