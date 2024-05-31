import { get, post, put } from "aws-amplify/api";
import { Convert, Note } from "../data/note";

const baseUrl = "/notes";

// Fetch all notes
export async function fetchNotes(): Promise<Array<Note>> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toNotes(await response.body.text());
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}


// Fetch a specific note by ID
export async function fetchNoteById(id: string): Promise<Note> {
	try {
		const restOperation = get({
			apiName: "crispApi",
			path: `${baseUrl}/${id}`,
		});
		const response = await restOperation.response;
		console.log("GET call succeeded:", response);

		return Convert.toNotes(await response.body.text())[0] as Note;
	} catch (error) {
		console.log("GET call failed:", error);
		throw new Error("Failed to fetch jobs");
	}
}

//Create a note
export async function createNote(note: Note): Promise<void> {
	try {
		const inputId = crypto.randomUUID();
		note.id = inputId;

		const restOperation = post({
			apiName: "crispApi",
			path: `${baseUrl}`,
			options: { body: note as unknown as undefined},
		});
		const response = await restOperation.response;
		console.log("POST call succeeded:", response);
	} catch (error) {
		console.log("POST call failed:", error);
		throw new Error("Failed to fetch jobs");
	}
}

// Update a profile
export async function updateNote(
	note: Note
): Promise<Note> {

	console.log("Profile to update:", note);
	try {
		const restOperation = put({
			apiName: "crispApi",
			path: `${baseUrl}`,
			options: { body: note as unknown as undefined},
		});
		const response = await restOperation.response;
		console.log("PUT call succeeded:", response);
		return Convert.toNote(await response.body.text());
	} catch (error) {
		console.log("PUT call failed:", error);
		throw new Error("Failed to fetch profiles");
	}
}
