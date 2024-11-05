import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePermissionInput } from "../dto/create-permission.input";
import { GraphQLError } from "graphql";

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreatePermissionInput) {
    const permission = await this.prisma.permission.findUnique({
      where: { name: input.name },
    });

    if (permission) {
      throw new GraphQLError("Permission already exists", {
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
    });
  }

  async findAll() {
    return await this.prisma.permission.findMany({
      include: { resource: true },
    });
  }
}
