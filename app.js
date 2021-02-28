import path from "path";
import express from "express";
import nunjucks from "nunjucks";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { errors } from "celebrate";
import { requestLogger, errorLogger } from "./middleware/logger.js";
import { developmentConfig } from "./config/developmentConfig.js";
import errorhandler from "./middleware/errorhandler.js";
import router from "./routes/index.js";

const app = express();
let ROOT = path.dirname(fileURLToPath(import.meta.url));
app.use("/", express.static(absolutePath("./assets")));
nunjucks.configure(absolutePath("./views"), {
    express: app
});

// connect to the MongoDB server
const databaseUri = developmentConfig.databaseUri;
mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.use(cors());
app.use(requestLogger);
app.use(bodyParser.json());

app.use('/', router);

app.use(errorLogger);
// celebrate errorhandling
app.use(errors());
// errorhandling for all other cases
app.use(errorhandler);

app.listen(3000, () => {});


function absolutePath(filepath) {
    return path.resolve(ROOT, filepath);
}
