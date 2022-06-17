import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { 
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
} from "./schema/product.schema";


const routes = (app: Express) => {
  // App Status
  app.get(
    "/status", 
    (req: Request, res: Response) => res.sendStatus(200)
  )

  // User
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  // Session
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // Product
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createUserSessionHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    createUserSessionHandler
  );
  app.get(
    "/api/products/:productId", 
    validateResource(getProductSchema), 
    getUserSessionsHandler
  );
  app.delete(
    "/api/products/:productId", 
    [requireUser, validateResource(deleteProductSchema)],
    deleteSessionHandler
  );
}

export default routes;