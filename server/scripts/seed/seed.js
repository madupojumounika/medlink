import mongoose from "mongoose";
import { env } from "../src/config/env.js";
import { connectDB } from "../src/config/db.js";
import { seedHospitals } from "./hospital.seed.js";
import { seedDepartments } from "./department.seed.js";
import { seedEmployees } from "./employee.seed.js";
import { seedResources } from "./resource.seed.js";

async function runSeed() {
  try {
    await connectDB();
    console.log("Connected to DB, starting seed...");

    console.log("Seeding Hospitals...");
    const hospitals = await seedHospitals();

    console.log("Seeding Departments...");
    const departments = await seedDepartments(hospitals);

    console.log("Seeding Employees...");
    await seedEmployees(hospitals, departments);

    console.log("Seeding Resources...");
    await seedResources(hospitals);

    console.log("Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

runSeed();
