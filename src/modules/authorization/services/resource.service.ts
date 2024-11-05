import { Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { CreateResourceInput } from "src/modules/authorization/dto/create-resource.input";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ResourceService {
  constructor(private readonly prisma: PrismaService) { }

  async create(input: CreateResourceInput) {
    const resource = await this.prisma.resource.findUnique({
      where: { name: input.name },
    });

    if (resource) {
      throw new GraphQLError("Resource already exists", {
        extensions: {
          code: "RESOURCE_ALREADY_EXISTS",
        },
      });
    }

    return await this.prisma.resource.create({ data: { name: input.name } });
  }

  async findAll() {
    return await this.prisma.resource.findMany({
      include: {
        permissions: true,
      }
    });
  }
}
