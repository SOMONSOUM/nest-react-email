import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePermissionInput } from "../dto/create-permission.input";
import { GraphQLError } from "graphql";
import { AssignPermissionInput } from "../dto/assign-permission.input";

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(input: CreatePermissionInput) {
    const permission = await this.prisma.permission.findFirst({
      where: {
        resourceId: input.resourceId,
        name: input.name,
      },
    });

    if (permission) {
      throw new GraphQLError("Permission already exists for this resource", {
        extensions: {
          code: "PERMISSION_ALREADY_EXISTS",
        },
      });
    }

    const resource = await this.prisma.resource.findUnique({
      where: { id: input.resourceId },
    });

    if (!resource) {
      throw new GraphQLError("Resource not found", {
        extensions: {
          code: "RESOURCE_NOT_FOUND",
        },
      });
    }

    return await this.prisma.permission.create({
      data: input,
      include: { resource: true },
    });
  }

  async findAll() {
    return await this.prisma.permission.findMany({
      include: { resource: true },
    });
  }

  async assignPemission(input: AssignPermissionInput) {
    const rolePermission = await this.prisma.rolePermission.findFirstOrThrow({
      where: {
        roleId: input.roleId,
        permissionId: input.permissionId,
      },
    });

    if (rolePermission) {
      throw new GraphQLError("Permission already assigned to this role", {
        extensions: {
          code: "PERMISSION_ALREADY_ASSIGNED",
        },
      });
    }

    const assignedPermission = await this.prisma.rolePermission.create({
      data: {
        role: {
          connect: {
            id: input.roleId,
          },
        },
        permission: {
          connect: {
            id: input.permissionId,
          },
        },
      },
      include: {
        role: {
          include: {
            rolePermission: {
              include: {
                permission: {
                  include: {
                    resource: true,
                  },
                },
              }
            }
          }
        },
      }
    });
    return {
      id: assignedPermission.role.id,
      name: assignedPermission.role.name,
      createdAt: assignedPermission.role.createdAt,
      updatedAt: assignedPermission.role.updatedAt,
      permissions: assignedPermission.role.rolePermission.map(rolePermission => ({
        id: rolePermission.permission.id,
        name: rolePermission.permission.name,
        resource: rolePermission.permission.resource?.name || null,
        createdAt: rolePermission.permission.createdAt,
        updatedAt: rolePermission.permission.updatedAt,
      }))
    };
  }

}
