import mongoose from "mongoose";
import Department from "../../src/models/Department.model.js";

export async function seedDepartments(hospitals) {
  const departmentsData = [];

  for (const hospital of hospitals) {
    departmentsData.push(
      {
        _id: new mongoose.Types.ObjectId(),
        hospitalId: hospital._id,
        name: "Cardiology",
        description: "Heart and cardiovascular diseases",
        isActive: true,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        hospitalId: hospital._id,
        name: "Neurology",
        description: "Brain and nervous system",
        isActive: true,
      },
      {
        _id: new mongoose.Types.ObjectId(),
        hospitalId: hospital._id,
        name: "Emergency",
        description: "24/7 Emergency care",
        isActive: true,
      }
    );
  }

  await Department.deleteMany({});
  return await Department.insertMany(departmentsData);
}
