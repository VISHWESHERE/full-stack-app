import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./Routes/bookRoute.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.get("/",(req, res, next)=>{
res.send("Rey vishwesh ga nuv thop yehe");
})

app.use("/books", bookRoute);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("MongoDB connected");
    app.listen(PORT, ()=>{
        console.log("rey vishwesh ga nuv thop yehe", PORT);
    })
})
.catch((err)=>{
    console.log("getting this error: ", err.message);
}
)

