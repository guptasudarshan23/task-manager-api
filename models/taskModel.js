const ALLOWED_STATUSES = ['pending', 'in-progress', 'completed'];

let tasks = [];
let nextId = 1;

function getAllTasks() {
    return tasks;
}

function getTaskById(id) {
    return tasks.find((t) => t.id === id);
}

function createTask({ title, description, status }) {
    const task = {
        id: nextId++,
        title,
        description,
        status: status || 'pending',
        createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
}

function updateTask(id, updates) {
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...updates };
    return tasks[idx];
}

function deleteTask(id) {
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    return tasks.splice(idx, 1)[0];
}

export default {
    ALLOWED_STATUSES,
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
