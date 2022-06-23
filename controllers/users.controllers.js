const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
require("dotenv").config();

module.exports.usersController = {
  registerUser: async (req, res) => {
    try {
      const { firstName, lastName, login, password, phone, eMail,role } = req.body;
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
      const user = await User.findById(req.user.id);
      return res.json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Ошибка при выводе пользователя: " + error.toString() });
    }
  },
};
