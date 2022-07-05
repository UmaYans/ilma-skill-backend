const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
// здесь он не нужон require("dotenv").config() 

module.exports.usersController = {
  registerUser: async (req, res) => {
    try {
      const { firstName, lastName, login, age, password, phone, email, role } =
        req.body;

      if (!firstName || !lastName || !email || !age || !password ) {
        res.status(400);
        throw new Error("Пожалуйста заполните все поля!");
      }

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        throw new Error("Пользователь с такой почтой уже есть.");
      }

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
        email,
        role,
      });

      return await res.json(user);
    } catch (error) {
      return res.status(401).json({
        error: error.message,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;

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
        email: candidate.email,
        isAdmin: candidate.isAdmin,
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

  userByNameOrEmail: async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            { lastName: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    return res.send(users);
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate("saveCourses");
      return res.json(user);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Ошибка при выводе пользователя: " + error.toString() });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
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
};
