const e = require("express");
const Service = require("../models/Service.model.js");
const User = require("../models/User.model.js");

module.exports.serviceController = {
  addService: async (req, res) => {
    const {
      name,
      description,
      tags,
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
        tags,
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
      return res.json(servById);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка прив выводе курса по ID: " + error.message,
      });
    }
  },
  getServiceByTag: async (req, res) => {
    try {
      const servByTag = await Service.find({ tags: req.body.tags });
      return await res.json(servByTag);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе курса по тегу: " + error.toString(),
      });
    }
  },
  getServiceByAgeFromContent: async (req, res) => {
    try {
      const age = await req.user.age;
      const rangeFrom12 = await Service.find({
        content: { $lte: age },
      });
      return res.json(rangeFrom12);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе курса c content12: " + error.toString(),
      });
    }
  },
  getServiceByFormat: async (req, res) => {
    try {
      const servByTag = await Service.find({ format: req.body.tag });
      return res.json(servByTag);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе курса по формату: " + error.toString(),
      });
    }
  },

  entryCourse: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const couse = await Service.findById(req.params.id);
      const cash = user.money - couse.price;

      if (user.money >= couse.price) {
        await User.findByIdAndUpdate(user, {
          $push: {
            myCourses: couse,
          },
          money: cash,
        });
        return res.json("Kyrs обавлен");
      } else {
        return res.json("Недостаточно средств. Пополните баланс.");
      }
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при записи на курс: " + error.message,
      });
    }
  },
};
