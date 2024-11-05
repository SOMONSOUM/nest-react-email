import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { PrismaService } from "src/prisma/prisma.service";
import { GraphQLError } from "graphql";
import { hashPassword } from "src/utils";
import { AssignRoleToUserInput } from "./dto/assign-role-to-user.input";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createUserInput: CreateUserInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserInput.email },
    });

    if (user) {
      throw new GraphQLError("User already exists", {
        extensions: {
          code: "USER_ALREADY_EXISTS",
        },
      });
    }

    return this.prisma.user.create({
      data: {
        ...createUserInput,
        password: await hashPassword(createUserInput.password),
      },
      include: {
        role: true,
      },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
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
              },
            },
          },
        },
      },
    });

    return users.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: {
        id: user.role.id,
        name: user.role.name,
        permissions: user.role.rolePermission.map(rolePermission => ({
          id: rolePermission.permission.id,
          name: rolePermission.permission.name,
          resource: rolePermission.permission.resource?.name || null,
        })),
        createdAt: user.role.createdAt,
        updatedAt: user.role.updatedAt,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
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
              },
            },
          },
        },
      },
    });

    return {
      ...user,
      role: {
        ...user.role,
        permissions: user.role.rolePermission.map(rolePermission => ({
          id: rolePermission.permission.id,
          name: rolePermission.permission.name,
          resource: rolePermission.permission.resource?.name || null,
          createdAt: rolePermission.permission.createdAt,
          updatedAt: rolePermission.permission.updatedAt,
        })),
        createdAt: user.role.createdAt,
        updatedAt: user.role.updatedAt,
      }
    }
  }


  async assignRole(input: AssignRoleToUserInput) {
    const role = await this.prisma.role.findUniqueOrThrow({ where: { id: input.roleId } });
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: input.userId } });

    const assignedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        role: {
          connect: {
            id: role.id
          }
        }
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
              },
            },
          },
        },
      },
    });

    return {
      ...assignedUser,
      role: {
        ...assignedUser.role,
        permissions: assignedUser.role.rolePermission.map(rolePermission => ({
          id: rolePermission.permission.id,
          name: rolePermission.permission.name,
          resource: rolePermission.permission.resource?.name || null,
          createdAt: rolePermission.permission.createdAt,
          updatedAt: rolePermission.permission.updatedAt,
        })),
      }
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
