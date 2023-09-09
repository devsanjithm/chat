import cors from "cors";
import express from "express";
import dbService from "./src/database/index";
import Print from "./src/helpers/endPointPrinter";
import recordRoutes from "./src/routers/index";
import bodyParser from "body-parser";

const port = process.env.PORT || 6678;
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());
app.use(Print, recordRoutes);

dbService.connect((err) => {
  if (err) {
    console.log("error while connecting to db", err);
    process.exit(0);
  }
  app.listen(port, () => {
    console.log(`server running on port http://localhost: ${port}`);
  });
});
