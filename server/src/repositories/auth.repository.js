import User from "../models/User.model.js";
import Hospital from "../models/Hospital.model.js";
import mongoose from "mongoose";

class AuthRepository {
  async createUser(userData, session) {
    const users = await User.create([userData], { session });
    return users[0];
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async createHospital(hospitalData, session) {
    const hospitals = await Hospital.create([hospitalData], { session });
    return hospitals[0];
  }

  async startTransaction() {
    const session = await mongoose.startSession();
    session.startTransaction();
    return session;
  }
}

export const authRepository = new AuthRepository();
