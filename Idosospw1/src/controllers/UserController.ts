import { Request, Response } from "express";
import { User } from "../models/User";

// Mock database
let users: User[] = [];
let nextId = 1;

export class UserController {
  static create(req: Request, res: Response) {
    try {
      const { name, email, password, role, latitude, longitude } = req.body;
      
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newUser: User = {
        id: nextId++,
        name,
        email,
        password,
        role,
        latitude,
        longitude,
      };

      users.push(newUser);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static getAll(req: Request, res: Response) {
    try {
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = users.find(u => u.id === parseInt(Array.isArray(id) ? id[0] : id));

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, latitude, longitude, role } = req.body;

      const user = users.find(u => u.id === parseInt(Array.isArray(id) ? id[0] : id));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (latitude !== undefined) user.latitude = latitude;
      if (longitude !== undefined) user.longitude = longitude;
      if (role) user.role = role;

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const index = users.findIndex(u => u.id === parseInt(Array.isArray(id) ? id[0] : id));

      if (index === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      const deletedUser = users.splice(index, 1);
      return res.json(deletedUser[0]);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
