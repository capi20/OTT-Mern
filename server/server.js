import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "express-async-errors";
import authRouter from "./routes/authRoutes.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
	cors({
		origin: "https://homeshow-2.web.app",
		methods: ["GET", "POST", "PATCH"]
	})
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(err);
	}
};

start();
