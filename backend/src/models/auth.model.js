import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 16,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default:"user"
    },
  },
  { timestamps: true },
);

authSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
authSchema.methods.comparedPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Auth = mongoose.model("Auth", authSchema);
