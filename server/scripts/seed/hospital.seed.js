import mongoose from "mongoose";
import Hospital from "../../src/models/Hospital.model.js";

export async function seedHospitals() {
  const hospitalsData = [
    {
      _id: new mongoose.Types.ObjectId("64d1f2a3e4b0c2a8f8d9b001"),
      hospitalName: "City General Hospital",
      hospitalCode: "CGH001",
      email: "hospital@test.com",
      phone: "+1-234-567-8901",
      address: "123 Main St, Healthcare District",
      district: "Central",
      state: "California",
      logo: "https://ui-avatars.com/api/?name=CG&background=0D8ABC&color=fff",
      licenseDetails: "LIC-12345-CA",
      workingHours: "24/7",
      emergencyContact: "911-000-0001",
      isActive: true,
    },
    {
      _id: new mongoose.Types.ObjectId("64d1f2a3e4b0c2a8f8d9b002"),
      hospitalName: "Mercy Care Center",
      hospitalCode: "MCC002",
      email: "mercy@test.com",
      phone: "+1-234-567-8902",
      address: "456 Oak Ave, Medical Park",
      district: "North",
      state: "California",
      logo: "https://ui-avatars.com/api/?name=MC&background=10B981&color=fff",
      licenseDetails: "LIC-12346-CA",
      workingHours: "24/7",
      emergencyContact: "911-000-0002",
      isActive: true,
    }
  ];

  await Hospital.deleteMany({});
  return await Hospital.insertMany(hospitalsData);
}
