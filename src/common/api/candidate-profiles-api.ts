import { CandidateProfile, Convert } from "../data/candidate-profile";
import { getAuthHeaders } from "./auth-api";
const baseUrl = 'https://api.crisp.nz/profiles';


// Create a new profile
export async function createProfile(profile: CandidateProfile): Promise<void> {
  const headers = await getAuthHeaders();
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(profile)
  });
  if (!response.ok) {
    throw new Error('Failed to create profile');
  }
  // Do nothing after profile is created
}

// Fetch all profiles
export async function fetchProfiles(): Promise<Array<CandidateProfile>> {
  const headers = await getAuthHeaders();
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers
  });
  if (!response.ok) {
    throw new Error('Failed to fetch profiles');
  } return Convert.toCandidateProfiles(await response.json() as string);
}

// Fetch a specific profile by ID
export async function fetchProfileById(id: string): Promise<CandidateProfile> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'GET',
    headers
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch profile with ID: ${id}`);
  }
  return Convert.toCandidateProfile(await response.json() as string);
}

// Update a profile
export async function updateProfile(id: string, profile: CandidateProfile): Promise<CandidateProfile> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(profile)
  });
  if (!response.ok) {
    throw new Error(`Failed to update profile with ID: ${id}`);
  }
  return Convert.toCandidateProfile(await response.json() as string);
}
