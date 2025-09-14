import taskModel from '../models/taskModel.js';
import { validateTaskInput } from '../utils/validate.js';

// GET /tasks (with optional filtering + pagination)
export function getTasks(req, res) {
    let result = taskModel.getAllTasks();

    const { status, page, limit } = req.query;

    // Filter by status
    if (status) {
        if (!taskModel.ALLOWED_STATUSES.includes(status)) {
            return res.status(400).json({ error: `Invalid status. Allowed: ${taskModel.ALLOWED_STATUSES.join(', ')}` });
        }
        result = result.filter((t) => t.status === status);
    }

    // Pagination
    if (page || limit) {
        const pageNum = parseInt(page || '1', 10);
        const lim = parseInt(limit || '10', 10);
        if (isNaN(pageNum) || pageNum < 1 || isNaN(lim) || lim < 1) {
            return res.status(400).json({ error: 'page and limit must be positive integers' });
        }
        const total = result.length;
        const totalPages = Math.ceil(total / lim) || 1;
        const start = (pageNum - 1) * lim;
        result = result.slice(start, start + lim);

        return res.json({ page: pageNum, limit: lim, total, totalPages, data: result });
    }

    res.json(result);
}

// GET /tasks/:id
export function getTask(req, res) {
    const id = parseInt(req.params.id, 10);
    const task = taskModel.getTaskById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
}

// POST /tasks
export function createTask(req, res) {
    const { title, description, status } = req.body;
    const error = validateTaskInput(title, description, status);
    if (error) return res.status(400).json({ error });

    const task = taskModel.createTask({ title, description, status });
    res.status(201).json(task);
}

// PUT /tasks/:id
export function updateTask(req, res) {
    const id = parseInt(req.params.id, 10);
    const task = taskModel.getTaskById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, description, status } = req.body;
    if (title !== undefined && (!title.trim())) return res.status(400).json({ error: 'Title cannot be empty' });
    if (description !== undefined && (!description.trim())) return res.status(400).json({ error: 'Description cannot be empty' });
    if (status !== undefined && !taskModel.ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Allowed: ${taskModel.ALLOWED_STATUSES.join(', ')}` });
    }

    const updated = taskModel.updateTask(id, { title, description, status });
    res.json(updated);
}

// DELETE /tasks/:id
export function deleteTask(req, res) {
    const id = parseInt(req.params.id, 10);
    const deleted = taskModel.deleteTask(id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted', task: deleted });
}

export default { getTasks, getTask, createTask, updateTask, deleteTask };
