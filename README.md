# Blog / Notes REST API

## Project Description
This is a backend REST API built with Node.js and Express.js to manage blog posts or notes. It allows users to perform CRUD (Create, Read, Update, Delete) operations on notes. The data is stored in an in-memory array for simplicity and demonstration purposes.

## Requirements
- Node.js installed on your machine.

## Installation & Run Instructions

1.  **Initialize the project (if not already done):**
    ```bash
    npm install
    ```

2.  **Start the server:**
    ```bash
    npm start
    # OR
    node server.js
    ```
    The server will start on `http://localhost:3000`.

3.  **Test the API:**
    *   **Manual Testing:** You can use Postman, Insomnia, or your browser to test the endpoints.
    *   **Automated Verification:** Run the provided test script:
        ```bash
        node test-api.js
        ```
        *Note: Ensure the server is running in a separate terminal before running the test script.*

## API Routes for `api/notes`

| Method | Endpoint | Description | Request Body (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/notes` | Fetch all notes. | N/A |
| `GET` | `/api/notes/:id` | Fetch a single note by ID. | N/A |
| `POST` | `/api/notes` | Create a new note. | `{ "title": "My Note", "content": "Hello World" }` |
| `PUT` | `/api/notes/:id` | Update an existing note. | `{ "title": "Updated Title", "content": "New Content" }` |
| `DELETE` | `/api/notes/:id` | Delete a note. | N/A |

### Middleware
**`validateNote.js`**: This middleware is used in `POST` and `PUT` requests to ensure that every note has a valid `title` and `content`. If the validation fails, it returns a `400 Bad Request` status with an error message, preventing invalid data from entering the system.

### Challenges & Solutions
-   **API Routing**: Organizing routes cleanly was achieved using `express.Router()`. This allows `notesRoutes.js` to handle all note-related logic, keeping `server.js` clean.
-   **Middleware Logic**: Implementing validation reusable middleware was key. Instead of repeating validation code in both POST and PUT routes, I created a separate function `validateNote` to handle this logic efficiently.

## RESTful Concepts
-   **Resource-Based**: The API exposes "notes" as resources.
-   **HTTP Verbs**: Uses GET, POST, PUT, DELETE for their intended semantic purposes.
-   **Stateless**: Each request contains all information needed to process it.
-   **JSON**: Uses JSON for data exchange.
