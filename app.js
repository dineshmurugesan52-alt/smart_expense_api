require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const expenseRouter = require("./routes/expenseRoutes");
const authRouter = require("./routes/authRoutes");
app.use(express.json());
app.use("/auth", authRouter);
app.use("/expense", expenseRouter)
console.log(expenseRouter);
app.get("/", (req, res) => {
    console.log(req.url);
    res.send("Welcome to the expense server...")
});
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: err.message
    });
});
async function startServer() {
    await connectDB();
    app.listen(3000, () => {
        console.log("Server is running...");
    })
}
startServer();
