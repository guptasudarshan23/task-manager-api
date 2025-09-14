Task Manager API (Express + Node.js)

A simple **Task Manager REST API** built with **Node.js** and **Express**.  
It allows you to **create, read, update, and delete tasks (CRUD)** with validation.  
Tasks are stored **in-memory**, so data will reset when the server restarts.

---

## Features
- Create a new task with title, description, and status
- Fetch all tasks
- Fetch a single task by ID
- Update task details (PUT/PATCH)
- Delete a task
- Input validation (title, description, allowed statuses)
- Filtering by status and pagination for GET all tasks

---

## Allowed Statuses
- `pending`
- `in-progress`
- `completed`

---

## Requirements
Make sure you have installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Postman](https://www.postman.com/downloads/) (to test the API)

---

## Installation

1. Clone this repository or copy the code into a folder:
   ```bash
   git clone <your-repo-link>
   cd task
