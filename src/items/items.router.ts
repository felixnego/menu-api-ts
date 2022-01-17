/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { IBaseItem, IItem } from "./item.interface";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get("/", async(req: Request, res: Response) => {

    try {
        const items: IItem[] = await ItemService.findAll();

        res.status(200).send(items);
    } catch(err: any) {

        res.status(500).send(err.message);
    }
});

// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {

    const id: number = parseInt(req.params.id, 10);
  
    try {
      const item: IItem = await ItemService.find(id);
  
      if (item) {
        return res.status(200).send(item);
      }
  
      res.status(404).send("item not found");
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  });
  

// POST items
itemsRouter.post("/", async (req: Request, res: Response) => {
    try {
      const item: IBaseItem = req.body;
  
      const newItem = await ItemService.create(item);
  
      res.status(201).json(newItem);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  });

// PUT items/:id
itemsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const itemUpdate: IItem = req.body;
  
      const existingItem: IItem = await ItemService.find(id);
  
      if (existingItem) {
        const updatedItem = await ItemService.update(id, itemUpdate);
        return res.status(200).json(updatedItem);
      }
  
      const newItem = await ItemService.create(itemUpdate);
  
      res.status(201).json(newItem);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  });

// DELETE items/:id
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await ItemService.remove(id);
  
      res.sendStatus(204);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  });