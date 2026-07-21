import HospitalResource from "../models/HospitalResource.model.js";

class HospitalResourceRepository {
  async createResource(resourceData) {
    const resource = new HospitalResource(resourceData);
    return await resource.save();
  }

  async getAllResources() {
    return await HospitalResource.find();
  }

  async getResourceById(id) {
    return await HospitalResource.findById(id);
  }

  async updateResource(id, updateData) {
    return await HospitalResource.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deleteResource(id) {
    return await HospitalResource.findByIdAndDelete(id);
  }
}

export const hospitalResourceRepository = new HospitalResourceRepository();
