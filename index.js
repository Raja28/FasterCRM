const express = require("express")
const app = express()
require("dotenv").config()
const serverless = require("serverless-http");
app.use(express.json())
const cors = require("cors")
const { connect } = require("./config/connection")

app.use(cors({
    origin: "http://localhost:2025",
    credentials: true
}))
connect()
app.get("/", (req, res)=>{
    res.status(200).json({
        success: true,
        message: "Server running successfully"
    })
})

const enquiryRouter = require("./routes/enquiryRoutes")
const authRouter = require("./routes/authRoutes")

app.use("/api/enquiries", enquiryRouter)
app.use("/api/auth", authRouter)

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 2026;
    app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
    });
}

module.exports = app;
module.exports.handler = serverless(app);
