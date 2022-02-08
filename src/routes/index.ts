import { Router } from "express";
import auth from "./auth";
import user from "./user";
import journal from "./journal";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/journal", journal);

export default routes;