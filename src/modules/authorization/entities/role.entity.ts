import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Role as RoleSchema } from "@prisma/client";

@ObjectType()
export class Role implements RoleSchema {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
