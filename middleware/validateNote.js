/**
 * Middleware to validate note data for POST and PUT requests.
 * Checks if title and content are present and strings.
 */
const validateNote = (req, res, next) => {
    const { title, content } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({
            success: false,
            message: "Validation Error: 'title' is required and must be a non-empty string."
        });
    }

    if (!content || typeof content !== 'string' || !content.trim()) {
        return res.status(400).json({
            success: false,
            message: "Validation Error: 'content' is required and must be a non-empty string."
        });
    }

    // If validation passes, proceed to the next middleware/route handler
    next();
};

module.exports = validateNote;
