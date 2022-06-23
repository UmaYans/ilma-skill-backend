const Category = require("../models/Category.model");

module.exports.categoryController = {
  getCategory: async (req, res) => {
    try {
      const cats = await Category.find();
      return res.json(cats);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе: " + error.toString(),
      });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const cats = await Category.findById(req.params.id);

      return res.json(cats);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе категорий по id: " + error.toString(),
      });
    }
  },

  postCategory: async (req, res) => {
    try {
      const cats = await Category.create({
        name: req.body.name,
      });
      return res.json(cats);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при добавлении: " + error.toString(),
      });
    }
  },
};
