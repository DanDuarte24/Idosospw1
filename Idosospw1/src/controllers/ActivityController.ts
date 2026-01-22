import { Request, Response } from "express";
import { Activity } from "../models/Activity";

// Mock database
let activities: Activity[] = [];
let nextId = 1;

export class ActivityController {
  static create(req: Request, res: Response) {
    try {
      const { requestId, photo, startedAt, endedAt } = req.body;

      if (!requestId || !photo) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newActivity: Activity = {
        id: nextId++,
        requestId,
        photo,
        startedAt: startedAt || new Date().toISOString(),
        endedAt: endedAt || "",
      };

      activities.push(newActivity);
      return res.status(201).json(newActivity);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static getAll(req: Request, res: Response) {
    try {
      return res.json(activities);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const activity = activities.find(a => a.id === parseInt(Array.isArray(id) ? id[0] : id));

      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }

      return res.json(activity);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static getByRequestId(req: Request, res: Response) {
    try {
      const { requestId } = req.params;
      const requestActivities = activities.filter(a => a.requestId === parseInt(Array.isArray(requestId) ? requestId[0] : requestId));

      return res.json(requestActivities);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { photo, startedAt, endedAt } = req.body;

      const activity = activities.find(a => a.id === parseInt(Array.isArray(id) ? id[0] : id));
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }

      if (photo) activity.photo = photo;
      if (startedAt) activity.startedAt = startedAt;
      if (endedAt) activity.endedAt = endedAt;

      return res.json(activity);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const index = activities.findIndex(a => a.id === parseInt(Array.isArray(id) ? id[0] : id));

      if (index === -1) {
        return res.status(404).json({ error: "Activity not found" });
      }

      const deletedActivity = activities.splice(index, 1);
      return res.json(deletedActivity[0]);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
