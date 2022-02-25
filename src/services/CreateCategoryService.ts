// o service não deve conhecer o request, ele precisa só dos dados

import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * [x] - Definir o tipo de retorno
 * [x] - Alterar o retorno de erro
 * [x] - Acessar o repositorio
 */
class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    // const categoriesRepository = new CategoriesRepository();
    // responsável por fazer tudo oq o service precisa
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      //   return response.status(400).json({
      //     error: "Category already exists",
      //   });
      // }

      throw new Error("Category already exists"); // lançado pra quem fez a requisição
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
