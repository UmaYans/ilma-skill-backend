const Service = require("../models/Service.model.js");

module.exports.serviceController = {
  addService: async (req, res) => {
    const {
      name,
      description,
      tag,
      photo,
      price,
      oldPrice,
      content,
      format,
      time,
      catId,
    } = req.body;
    try {
      const course = await Service.create({
        name,
        description,
        tag,
        photo,
        price,
        oldPrice,
        content,
        format,
        time,
        catId,
      });
      return res.json(course);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при создании курса: " + error.toString(),
      });
    }
  },
  getAllServices: async (req, res) => {
    try {
      const AllService = await Service.find({});
      return res.json(AllService);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе всех курсов: " + error.toString(),
      });
    }
  },
  getServiceById: async (req, res) => {
    try {
      const servById = await Service.findById(req.params.id);
      return res.json(AllService);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе курса по ID: " + error.toString(),
      });
    }
  },
  getServiceByTag: async (req, res) => {
    try {
      const servByTag = await Service.find({tag}).includes()
      return res.json(servByTag);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе курса по тегу: " + error.toString(),
      });
    }
  },
  getServiceByAgeFromContent: async (req, res) => {
    try {
      
      const age = req.user

      const rangeFrom12 = await Service.find({ content: {$gte: age} });
      
      return res.json(AllService);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе курса : " + error.toString(),
      });
    }
  },
};
