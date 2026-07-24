import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../src/models/User.model.js";
import AdminProfile from "../../src/models/AdminProfile.model.js";
import DoctorProfile from "../../src/models/DoctorProfile.model.js";
import CoordinatorProfile from "../../src/models/CoordinatorProfile.model.js";

export async function seedEmployees(hospitals, departments) {
  await User.deleteMany({});
  await AdminProfile.deleteMany({});
  await DoctorProfile.deleteMany({});
  await CoordinatorProfile.deleteMany({});

  const password = await bcrypt.hash("password123", 10);
  const users = [];
  const profiles = [];

  for (const hospital of hospitals) {
    // 1. Hospital Admin
    const adminUser = new User({
      _id: new mongoose.Types.ObjectId(),
      hospitalId: hospital._id,
      fullName: `Admin ${hospital.hospitalName}`,
      email: hospital.email, // using same email as hospital for easy login
      password,
      role: "hospital_admin",
      isActive: true,
    });
    users.push(adminUser);

    const adminProfile = new AdminProfile({
      userId: adminUser._id,
      hospitalId: hospital._id,
      phone: hospital.phone,
      designation: "Chief Administrator",
      photoUrl: "https://ui-avatars.com/api/?name=AD&background=475569&color=fff",
    });
    profiles.push(adminProfile.save());

    // 2. Doctor for each department
    const hospitalDepts = departments.filter(d => d.hospitalId.toString() === hospital._id.toString());
    
    for (const dept of hospitalDepts) {
      const docUser = new User({
        _id: new mongoose.Types.ObjectId(),
        hospitalId: hospital._id,
        fullName: `Dr. ${dept.name} Specialist`,
        email: `doctor.${dept.name.toLowerCase()}@${hospital.hospitalCode.toLowerCase()}.test.com`,
        password,
        role: "doctor",
        isActive: true,
      });
      users.push(docUser);

      const docProfile = new DoctorProfile({
        userId: docUser._id,
        hospitalId: hospital._id,
        departmentId: dept._id,
        qualifications: ["MBBS", "MD"],
        licenseNumber: `MED-${Math.floor(1000 + Math.random() * 9000)}`,
        experience: Math.floor(5 + Math.random() * 15),
        opTimings: "09:00 AM - 05:00 PM",
        availability: true,
        shift: "Morning",
        photoUrl: "https://ui-avatars.com/api/?name=DR&background=3B82F6&color=fff",
      });
      profiles.push(docProfile.save());

      // Update Department Head
      dept.headOfDepartment = docProfile._id;
      await dept.save();
    }

    // 3. Referral Coordinator
    const coordUser = new User({
      _id: new mongoose.Types.ObjectId(),
      hospitalId: hospital._id,
      fullName: `Coordinator ${hospital.hospitalName}`,
      email: `coordinator@${hospital.hospitalCode.toLowerCase()}.test.com`,
      password,
      role: "referral_coordinator",
      isActive: true,
    });
    users.push(coordUser);

    const coordProfile = new CoordinatorProfile({
      userId: coordUser._id,
      hospitalId: hospital._id,
      phone: "+1-999-888-7777",
      shift: "Night",
      photoUrl: "https://ui-avatars.com/api/?name=CO&background=F59E0B&color=fff",
    });
    profiles.push(coordProfile.save());
  }

  await User.insertMany(users);
  await Promise.all(profiles);
}
