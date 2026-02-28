const validateTask = (req, res, next) => {
  const data = req.body;

  if (!data.title || typeof data.title !== 'string') {
    return res.status(400).json({ message: "error: title is required and must be a string" });
  }

  if (!data.description || typeof data.description !== 'string') {
    return res.status(400).json({ message: "error: description is required and must be a string" });
  }

  if (typeof data.completed !== 'boolean') {
    return res.status(400).json({ message: "error: completed is required and must be a boolean" });
  }

  if (!data.priority || typeof data.priority !== 'string') {
    return res.status(400).json({ message: "error: priority is required and must be a string" });
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(data.priority.toLowerCase())) {
    return res.status(400).json({ message: "error: priority must be 'low', 'medium', or 'high'" });
  }

  next();
};

module.exports = validateTask;
