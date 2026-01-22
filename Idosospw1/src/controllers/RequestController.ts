import { Request as ExpressRequest, Response } from "express";
import { Request as RequestModel } from "../models/Request";

// Mock database
let requests: RequestModel[] = [];
let nextId = 1;

export class RequestController {
  static create(req: ExpressRequest, res: Response) {
    try {
      const { idosoId, activity, date, status } = req.body;

      if (!idosoId || !activity || !date) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newRequest: RequestModel = {
        id: nextId++,
        idosoId,
        activity,
        date,
        status: status || "PENDENTE",
      };

      requests.push(newRequest);
      return res.status(201).json(newRequest);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static getAll(req: ExpressRequest, res: Response) {
    try {
      return res.json(requests);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static getById(req: ExpressRequest, res: Response) {
    try {
      const { id } = req.params;
      const request = requests.find(r => r.id === parseInt(Array.isArray(id) ? id[0] : id));

      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      return res.json(request);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static getByIdosoId(req: ExpressRequest, res: Response) {
    try {
      const { idosoId } = req.params;
      const userRequests = requests.filter(r => r.idosoId === parseInt(Array.isArray(idosoId) ? idosoId[0] : idosoId));

      return res.json(userRequests);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static update(req: ExpressRequest, res: Response) {
    try {
      const { id } = req.params;
      const { activity, date, status } = req.body;

      const request = requests.find(r => r.id === parseInt(Array.isArray(id) ? id[0] : id));
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      if (activity) request.activity = activity;
      if (date) request.date = date;
      if (status) request.status = status;

      return res.json(request);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static delete(req: ExpressRequest, res: Response) {
    try {
      const { id } = req.params;
      const index = requests.findIndex(r => r.id === parseInt(Array.isArray(id) ? id[0] : id));

      if (index === -1) {
        return res.status(404).json({ error: "Request not found" });
      }

      const deletedRequest = requests.splice(index, 1);
      return res.json(deletedRequest[0]);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
