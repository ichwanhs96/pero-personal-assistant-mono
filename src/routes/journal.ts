import { Router } from "express";
import JournalController from "../controllers/journal";
import { checkJwt } from "../middlewares/check_jwt";
import { checkRole } from "../middlewares/check_roles";

const router = Router();

//Get all journals
router.get("/", [checkJwt, checkRole(["ADMIN"])], JournalController.getJournals);

// Get one journal
router.get(
    "/:id",
    [checkJwt, checkRole(["ADMIN"])],
    JournalController.getOneById
  );

//Post journal
router.post("/", [checkJwt, checkRole(["ADMIN"])], JournalController.newJournal);

//Edit journal
router.patch("/:id", [checkJwt, checkRole(["ADMIN"])], JournalController.editJournal);

//Delete journal
router.delete("/:id", [checkJwt, checkRole(["ADMIN"])], JournalController.deleteJournal);

export default router;