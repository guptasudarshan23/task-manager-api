import taskModel from "../models/taskModel.js";

const { ALLOWED_STATUSES } = taskModel;

export function validateTaskInput(title, description, status) {
    if (!title || typeof title !== "string" || !title.trim()) {
        return "Title is required and cannot be empty";
    }
    if (!description || typeof description !== "string" || !description.trim()) {
        return "Description is required and cannot be empty";
    }
    if (status && !ALLOWED_STATUSES.includes(status)) {
        return `Invalid status. Allowed: ${ALLOWED_STATUSES.join(", ")}`;
    }
    return null;
}
