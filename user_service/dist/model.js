import mongoose, { Document, Schema } from "mongoose";
const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    playlist: [
        {
            type: String,
            required: true,
        }
    ]
}, { timestamps: true });
export const User = mongoose.model("User", schema);
//# sourceMappingURL=model.js.map