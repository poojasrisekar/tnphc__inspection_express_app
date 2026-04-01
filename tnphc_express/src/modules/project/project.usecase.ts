import {
  createProjectService,
  getAllProjectsService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService
} from "./project.service";

export const createProjectUsecase = async (data: any) => {
  return await createProjectService(data);
};

export const getAllProjectsUsecase = async ({
  pageNumber,
  pageSize,
  search,
}: {
  pageNumber?: string;
  pageSize?: string;
  search?: string;
}) => {
  return getAllProjectsService({
    pageNumber,
    pageSize,
    search,
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