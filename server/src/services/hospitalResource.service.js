import { hospitalResourceRepository } from "../repositories/hospitalResource.repository.js";
import { ApiError } from "../utils/ApiError.js";

class HospitalResourceService {
  async createResource(resourceData) {
    const resource = await hospitalResourceRepository.createResource(resourceData);
    return { message: "Hospital resource created successfully", data: resource };
  }

  async getAllResources() {
    const resources = await hospitalResourceRepository.getAllResources();
    return { message: "Hospital resources retrieved successfully", data: resources };
  }

  async getResourceById(id) {
    const resource = await hospitalResourceRepository.getResourceById(id);
    if (!resource) {
      throw new ApiError(404, "Hospital resource not found");
    }
    return { message: "Hospital resource retrieved successfully", data: resource };
  }

  async updateResource(id, updateData) {
    const resource = await hospitalResourceRepository.updateResource(id, updateData);
    if (!resource) {
      throw new ApiError(404, "Hospital resource not found");
    }
    return { message: "Hospital resource updated successfully", data: resource };
  }

  async deleteResource(id) {
    const resource = await hospitalResourceRepository.deleteResource(id);
    if (!resource) {
      throw new ApiError(404, "Hospital resource not found");
    }
    return { message: "Hospital resource deleted successfully", data: resource };
  }
}

export const hospitalResourceService = new HospitalResourceService();
