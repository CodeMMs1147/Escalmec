import mongoose, { Schema } from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [{
      type: Schema.Types.ObjectId,
      ref: 'role'
    }],
    // city: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Usuarios", usuarioSchema);