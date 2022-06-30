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
      teacher,
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
        teacher: req.user.id,
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
      const AllService = await Service.find({}).populate("catId teacher")
      return res.json(AllService);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе всех курсов: " + error.toString(),
      });
    }
  },

  getServiceById: async (req, res) => {
    try {
      const servById = await Service.findById(req.params.id).populate(
        "teacher catId"
      );
      return res.json(servById);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка прив выводе курса по ID: " + error.message,
      });
    }
  },

  getServiceByTag: async (req, res) => {
    try {
      const servByTag = await Service.find({ tags: req.body.tags }).populate(
        "teacher catId"
      );
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
      }).populate("teacher catId");
      return res.json(rangeFrom12);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при выводе курса c content12: " + error.toString(),
      });
    }
  },

  getServiceByFormat: async (req, res) => {
    try {
      const servByTag = await Service.find({ format: req.body.tag }).populate(
        "teacher catId"
      );
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
        const us = await User.findByIdAndUpdate(user, {
         $addToSet: {
            myCourses: couse,
          },
          money: cash,
        }, {new: true})
        return res.json(us);
      } else {
        return res.json({error : "Недостаточно средств. Пополните баланс."});
      }
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при записи на курс: " + error.message,
      });
    }
  },
  
  saveCorses: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const couse = await Service.findById(req.params.id);

      const us = await User.findByIdAndUpdate(user, {
        $addToSet: {
          saveCourses: couse,
        },
      }, {new: true})
      return res.json(us);
      
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при сохранении курса: " + error.message,
      });
    }
  }, 

  deleteSaveCourse: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const couse = await Service.findById(req.params.id);

      const us = await User.findByIdAndUpdate(user, {
        $pull: {
          saveCourses: couse,
        },
      }, {new: true})
      return res.json(us);
      
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при удалении курсА: " + error.message,
      });
    }
  }
};
