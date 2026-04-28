import {
  createMaterialService,
  getMaterialByIdService,
  updateMaterialService,
  deleteMaterialService,
  listMaterialsService,
  getMaterials,
} from "./material.service";

export const createMaterialUsecase = async (data: any) => {
  return createMaterialService(data);
};

export const getMaterialByIdUsecase = async (id: string) => {
  const material = await getMaterialByIdService(id);
  if (!material) throw new Error("Material not found");
  return material;
};

export const updateMaterialUsecase = async (id: string, data: any) => {
  return updateMaterialService(id, data);
};

export const deleteMaterialUsecase = async (id: string) => {
  return deleteMaterialService(id);
};

export const listMaterialsUsecase = async (query: any) => {
  return listMaterialsService(query);
};

export const getMaterialsUsecase = async (query: any) => {
  const data = await getMaterials(query);

  // 👉 Optional: transform response for UI
  const formatted = data.map((material) => ({
    id: material.id,
    name: material.name,

    brands: material.brands.map((brand) => ({
      id: brand.id,
      name: brand.name,

      grades: brand.grades.map((grade) => ({
        id: grade.id,
        name: grade.name,
      })),
    })),
  }));

  return formatted;
};