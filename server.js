import express from "express";
import connectDB from "./config/db.js";

import dotenv from "dotenv";

// routes
import authRoutes from "./routes/auth.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import { authMiddleware } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/suppliers", authMiddleware, supplierRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/invoices", authMiddleware, invoiceRoutes);

app.use("/api/admin", authMiddleware, adminRoutes);

app.listen(process.env.PORT, () => {
    console.log("server runnig on ", process.env.PORT);
});
