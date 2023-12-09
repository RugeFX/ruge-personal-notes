import apiClient from "./api-client";

export async function addNote({ title, body }) {
  const { data } = await apiClient.post("notes", { title, body });

  return { error: false, data };
}

export async function getActiveNotes() {
  try {
    const { data } = await apiClient.get("notes");

    return { error: false, data };
  } catch (e) {
    return { error: true, data: e.response.data.message };
  }
}

export async function getArchivedNotes() {
  try {
    const { data } = await apiClient.get("notes/archived");

    return { error: false, data };
  } catch (e) {
    return { error: true, data: e.response.data.message };
  }
}

export async function getNote(id) {
  try {
    const { data } = await apiClient.get(`notes/${id}`);

    return { error: false, data };
  } catch (e) {
    return { error: true, data: e.response.data.message };
  }
}

export async function archiveNote(id) {
  try {
    const { data } = await apiClient.post(`notes/${id}/archive`);

    return { error: false, data };
  } catch (e) {
    return { error: true, data: e.response.data.message };
  }
}

export async function unarchiveNote(id) {
  try {
    const { data } = await apiClient.post(`notes/${id}/unarchive`);

    return { error: false, data };
  } catch (e) {
    return { error: true, data: e.response.data.message };
  }
}

export async function deleteNote(id) {
  try {
    const { data } = await apiClient.delete(`notes/${id}`);

    return { error: false, data };
  } catch (e) {
    return { error: true, data: e.response.data.message };
  }
}
