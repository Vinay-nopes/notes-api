/**
 * In-memory storage for notes.
 * acts as a mock database.
 */

let notes = [
    {
        id: 1,
        title: "Welcome to my Blog API",
        content: "This is a simple RESTful API built with Node.js and Express.",
        createdAt: new Date()
    },
    {
        id: 2,
        title: "Express Middleware",
        content: "Middleware functions are functions that have access to the request object, the response object, and the next middleware function.",
        createdAt: new Date()
    }
];

module.exports = notes;
