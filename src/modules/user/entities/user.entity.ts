import { ObjectType, Field, Int } from "@nestjs/graphql";
import { User as UserSchema } from "@prisma/client";
import { Role } from "src/modules/authorization/entities/role.entity";

@ObjectType()
export class User implements UserSchema {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  password: string;

  @Field(() => String, { nullable: true })
  firstName: string | null;

  @Field(() => String, { nullable: true })
  lastName: string | null;

  roleId: number;

  @Field(() => Role, { nullable: true })
  role: Role | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
