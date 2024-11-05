import { Injectable } from "@nestjs/common";
import { CreateAuthorizationInput } from "../dto/create-authorization.input";
import { UpdateAuthorizationInput } from "../dto/update-authorization.input";

@Injectable()
export class AuthorizationService {
  create(createAuthorizationInput: CreateAuthorizationInput) {
    return "This action adds a new authorization";
  }

  findAll() {
    return `This action returns all authorization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authorization`;
  }

  update(id: number, updateAuthorizationInput: UpdateAuthorizationInput) {
    return `This action updates a #${id} authorization`;
  }

  remove(id: number) {
    return `This action removes a #${id} authorization`;
  }
}
