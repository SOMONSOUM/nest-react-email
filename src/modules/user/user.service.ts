import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { PrismaService } from "src/prisma/prisma.service";
import { GraphQLError } from "graphql";
import { hashPassword } from "src/utils";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
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
    return this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        role: true,
      },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
