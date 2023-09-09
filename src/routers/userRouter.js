import express from "express";
import userController from "../controllers/userController";
import listObject from "../helpers/listObject";
const userRouter = express.Router();

userRouter.post("/register", userController.addUsers);
userRouter.post("/create-thread", userController.addThread);
userRouter.post("/login", userController.UsersLogin);

// userRouter.put("/users/:id", userController.updateUsers);
userRouter.get("/users", userController.getUsers);
userRouter.get("/threads", userController.getThread);
userRouter.post("/new-messsage", userController.initiateNewMessage);
userRouter.post("/messsage", userController.addMessage);
userRouter.post("/add-member", userController.addParticipants);
userRouter.post("/list-messsage", listObject, userController.getMessage);
// userRouter.delete("/users/:id", userController.deleteUsers);
// userRouter.post("/list-users", listObject, userController.listUsers);

export default userRouter;
