import {
  createGradeService,
  getGradeByIdService,
  updateGradeService,
  deleteGradeService,
  listGradesService,
} from "./grade.service";

export const createGradeUsecase = async (data: any) => {
  return createGradeService(data);
};

export const getGradeByIdUsecase = async (id: string) => {
  const grade = await getGradeByIdService(id);
  if (!grade) throw new Error("Grade not found");
  return grade;
};

export const updateGradeUsecase = async (id: string, data: any) => {
  return updateGradeService(id, data);
};

export const deleteGradeUsecase = async (id: string) => {
  return deleteGradeService(id);
};

export const listGradesUsecase = async (query: any) => {
  return listGradesService(query);
};