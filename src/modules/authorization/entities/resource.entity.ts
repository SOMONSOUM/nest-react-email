import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Resource as ResourceSchema } from "@prisma/client";
import { Permission } from "./permission.entity";

@ObjectType()
export class Resource implements ResourceSchema {

  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [Permission])
  permissions: Permission[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
