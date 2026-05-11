import * as service from "./dropdown.service";

export const getMaterialBrandGradeDropdownUsecase =
  async () => {
    return service.getMaterialBrandGradeDropdownService();
  };