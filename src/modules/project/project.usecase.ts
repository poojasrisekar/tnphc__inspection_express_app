import {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
  getProjectDashboardService,
  getProjectsByUserService
} from "./project.service";


// ✅ CREATE
export const createProjectUsecase = async (
  data: any
) => {
  return await createProjectService(data);
};


// ✅ GET ALL PROJECTS
export const getAllProjectsUsecase = async ({
  pageNumber,
  pageSize,
  search,
  status,
  districtId,
  departmentId,
  specialUnitId,
  userId
}: {
  pageNumber?: string;
  pageSize?: string;
  search?: string;
  status?: string;
  districtId?: string;
  departmentId?: string;
  specialUnitId?: string;
  userId?: string;
}) => {

  return getAllProjectsService({
    pageNumber,
    pageSize,
    search,
    status,
    districtId,
    departmentId,
    specialUnitId,
    userId
  });

};


// ✅ GET PROJECT BY ID
export const getProjectByIdUsecase = async (
  id: string
) => {

  const project = await getProjectByIdService(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};


// ✅ GET USER PROJECTS
export const getProjectsByUserUsecase = async (
  userId?: string
) => {

  return await getProjectsByUserService(userId);

};


// ✅ UPDATE
export const updateProjectUsecase = async (
  id: string,
  data: any
) => {

  return await updateProjectService(id, data);

};


// ✅ DELETE
export const deleteProjectUsecase = async (
  id: string
) => {

  return await deleteProjectService(id);

};


// ✅ DASHBOARD
export const getProjectDashboardUsecase = async () => {

  return getProjectDashboardService();

};