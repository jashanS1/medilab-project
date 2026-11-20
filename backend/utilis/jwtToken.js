import jwt from "jsonwebtoken";
import userSchema from "../model/userModel.js";
import { getDbStatus } from "../connection/db.connect.js";

const jwtTokenSign = async (id) => {
    try {
        const secretKey = process.env.JWTSECRETKEY || "medilab_super_secret_jwt_key_2026";
        const rawId = (id && typeof id === "object" && id._id) ? id._id.toString() : (id ? id.toString() : "medilab-user");
        const token = jwt.sign({ id: rawId }, secretKey, { expiresIn: "7d" });
        const decoded = jwt.verify(token, secretKey);

        if (getDbStatus() && rawId && rawId !== "medilab-user") {
            try {
                await userSchema.findByIdAndUpdate(
                    rawId,
                    { token: token, loginTime: decoded.iat },
                    { new: true }
                );
            } catch (updateErr) {
                console.log("Token update in DB warning:", updateErr.message);
            }
        }

        return { token, decoded };
    } catch (error) {
        console.error("JWT signing error:", error);
        return { token: "fallback-token-" + Date.now(), decoded: { iat: Math.floor(Date.now() / 1000) } };
    }
};

export default jwtTokenSign;
