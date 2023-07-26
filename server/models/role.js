import { Schema, model } from "mongoose";

export const ROLES = ['user',  'admin', 'superAdmin'];

const roleSchema = new Schema(
  {
    name: String
  },
  {
    versionKey: false,
  },
);

roleSchema.statics.getRole = async (RoleName, schema) => {
  const foundRoles = await schema.find({ name: { $in: RoleName } });
  return foundRoles.map(roleName => roleName.id);
}

roleSchema.statics.defaultRole = async (schema) => {
  const defaultRole = await schema.find({ name: 'user' });
  return defaultRole;
};

export default model('role', roleSchema);