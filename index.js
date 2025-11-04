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


connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("✅ Server running on port:", PORT);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server due to DB connection error:", err);
  });


module.exports = app;
module.exports.handler = serverless(app);
