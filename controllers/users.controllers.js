const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
require("dotenv").config();

module.exports.usersController = {
  registerUser: async (req, res) => {
    try {
      const { firstName, lastName, login, age, password, phone, eMail, role } =
        req.body;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      if (!hash) {
        return res.status(400).json({ error: "Ошибка хеширования пароля" });
      }

      const user = await User.create({
        firstName,
        lastName,
        login,
        age,
        password: hash,
        phone,
        eMail,
        role,
      });

      return await res.json(user);
    } catch (error) {
      return res.status(401).json({
        error: "Логин занят",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { login, password, eMail } = req.body;

      const candidate = await User.findOne({ login });

      if (!candidate) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: "Неверный логин или пароль" });
      }

      const payload = {
        id: candidate._id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        login: candidate.login,
        telephone: candidate.telephone,
        eMail: candidate.eMail,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });
      return res.json({ token });
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Ошибка при авторизации: " + error.toString() });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate(
        "saveCourses myCourses"
      );
      return res.json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Ошибка при выводе пользователя: " + error.toString() });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find().populate("myCourses saveCourses");
      return res.json(users);
    } catch (error) {
      return res.json(error);
    }
  },
  pathAvatar: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        avatar: req.file.path,
      });
      const user = await User.findById(req.user.id);
      return res.json(user);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  addMoney: async (req, res) => {
    try {
      const userById = await User.findById(req.user.id);
      userById.money += req.body.money;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          money: userById.money,
        },
        {
          new: true,
        }
      );
      res.json(user);
    } catch (err) {
      res.json({ err: "Не удалось пополнить счет, попробуйте еще раз" });
    }
  },
};
