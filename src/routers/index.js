import express from "express";
import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import userRouter from "./userRouter";
import { checkAuthReq } from "../helpers";

const recordRoutes = express.Router();

recordRoutes.get("/", async (req, res) => {
  res
    .status(STATUS_CODE.success)
    .json(
      response("success", { message: "success" }, true, STATUS_CODE.success)
    );
});

recordRoutes.use("/api", userRouter);

recordRoutes.use("*", (req, res) => {
  return res.status(STATUS_CODE.notFound).json(
    response("router not found", {}, false, STATUS_CODE.notFound, {
      error: "Router not found",
    })
  );
});

export default recordRoutes;
