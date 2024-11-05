import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateResourceInput } from "./dto/create-resource.input";
import { ResourceService } from "./services/resource.service";
import { Resource } from "./entities/resource.entity";
import { PermissionService } from "./services/permission.service";
import { CreatePermissionInput } from "./dto/create-permission.input";
import { Permission } from "./entities/permission.entity";
import { Role } from "./entities/role.entity";
import { AssignPermissionInput } from "./dto/assign-permission.input";

@Resolver()
export class AuthorizationResolver {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly permissionService: PermissionService
  ) { }

  @Mutation(() => Resource)
  async createResource(@Args("input") input: CreateResourceInput) {
    return await this.resourceService.create(input);
  }

  @Mutation(() => Permission)
  async createPermission(@Args("input") input: CreatePermissionInput) {
    return await this.permissionService.create(input);
  }

  @Query(() => [Resource])
  async resources() {
    return await this.resourceService.findAll();
  }

  @Query(() => [Permission])
  async permissions() {
    return await this.permissionService.findAll();
  }

  @Mutation(() => Role)
  async assignPermission(@Args("input") input: AssignPermissionInput) {
    return await this.permissionService.assignPemission(input);
  }
}
