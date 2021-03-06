const Comment = require("../models/Comment.model");

module.exports.CommentController = {
  getComByService: async (req, res) => {
    try {
      const getCom = await Comment.find({
        serviceId: req.params.servId,
      }).populate("serviceId userId");
      return res.json(getCom);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе комментарий к курсу: " + error.toString(),
      });
    }
  },

  getComUserId: async (req, res) => {
    try {
      const getCom = await Comment.find({
        userId: req.user.id,
      }).populate("serviceId userId");
      return res.json(getCom);
    } catch (error) {
      return res.status(400).json({
        error:
          "Ошибка при выводе комментарий пользователя: " + error.toString(),
      });
    }
  },

  postComments: async (req, res) => {
    try {
      const postCom = await Comment.create({
        userId: req.user.id,
        serviceId: req.params.id,
        text: req.body.text,
        grade: req.body.grade,
      });

      const comm = await Comment.findById(postCom._id).populate("userId");

      return res.json(comm);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при добавлении комментария: " + error.toString(),
      });
    }
  },

  deleteComments: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);

      if (comment.userId.toString() === req.user.id) {
        await comment.remove();
        return res.json(comment);
      }

      return res.status(401).json({ error: "Нет доступа" });
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при удалении комментария: " + error.toString(),
      });
    }
  },
};
