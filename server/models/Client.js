import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: String,
    nit: Number,
    phoneNumber: String,
    email: {
      type: String,
      unique: true,
    },
    address: String,
    transactions: Array,
  },
  { timestamps: true }
);

const User = mongoose.model("Client", ClientSchema);
export default Client;
