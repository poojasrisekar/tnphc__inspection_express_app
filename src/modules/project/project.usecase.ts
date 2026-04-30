import {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
  getProjectDashboardService,
  getProjectsByUserService
} from "./project.service";

export const createProjectUsecase = async (data: any) => {
  return await createProjectService(data);
};

export const getAllProjectsUsecase = async ({
  pageNumber,
  pageSize,
  search,
  status,
  districtId,
  departmentId,
  specialUnitId
}: {
  pageNumber?: string;
  pageSize?: string;
  search?: string;
  status?: string;
  districtId?: string;
  departmentId?: string;
  specialUnitId?: string;
}) => {
  return getAllProjectsService({
    pageNumber,
    pageSize,
    search,
    status,
    districtId,
    departmentId,
    specialUnitId
  });
};

export const getProjectByIdUsecase = async (id: string) => {
  const project = await getProjectByIdService(id);

  if (!project) throw new Error("Project not found");

  return project;
};

export const updateProjectUsecase = async (id: string, data: any) => {
  return await updateProjectService(id, data);
};

export const deleteProjectUsecase = async (id: string) => {
  return await deleteProjectService(id);
};

export const getProjectDashboardUsecase = async () => {
  return getProjectDashboardService();
};

export const getProjectsByUserUsecase = async (userId: string) => {
  return await getProjectsByUserService(userId);
};