import role from "../models/role.js"

export const createRoles = async () => {
  try {
    const count = await role.estimatedDocumentCount()

    if (count > 0) return;
  
    const values = await Promise.all([
      new role({name: 'user'}).save(),
      new role({name: 'admin'}).save(),
      new role({name: 'superAdmin'}).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error)
  }
};