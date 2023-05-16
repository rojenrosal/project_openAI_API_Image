import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import imageRenderRoutes from "./routes/imageRenderRoutes.js";

import connectDB from "./mongodb/connect.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/imageRender", imageRenderRoutes);

app.get("/", async (req, res) => {
  res.send("Hello From Image Renderer");
});

const StartServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server has started at on port http://localhost:8080 ")
    );
  } catch (error) {
    console.log(error);
  }
};

StartServer();
