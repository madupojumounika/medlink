import mongoose from "mongoose";
import HospitalResource from "../../src/models/HospitalResource.model.js";

export async function seedResources(hospitals) {
  const resourcesData = [];

  for (const hospital of hospitals) {
    resourcesData.push({
      hospitalId: hospital._id,
      totalICUBeds: 50,
      availableICUBeds: 15,
      totalGeneralBeds: 200,
      availableGeneralBeds: 45,
      totalEmergencyBeds: 30,
      availableEmergencyBeds: 5,
      totalVentilators: 20,
      availableVentilators: 8,
      availableDoctors: 12,
      nursesCount: 150,
      operationTheatres: 8,
      availableAmbulances: 4,
      bloodUnits: 120,
    });
  }

  await HospitalResource.deleteMany({});
  return await HospitalResource.insertMany(resourcesData);
}
