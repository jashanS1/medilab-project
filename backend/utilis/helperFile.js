import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const imageUpload = (file, folder = "userImage") => {
    try {
        const fileExt = file.name.split(".").pop();
        const randomString = Math.random().toString(36).substring(2, 12).toUpperCase();
        const fileName = `${Date.now()}_${randomString}.${fileExt}`;
        
        const targetDir = path.join(__dirname, `../public/images/${folder}`);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        const filePath = path.join(targetDir, fileName);
        file.mv(filePath, (err) => {
            if (err) console.error("Error saving image:", err);
        });
        return fileName;
    } catch (e) {
        console.error("imageUpload exception:", e);
        return "default-avatar.webp";
    }
};
