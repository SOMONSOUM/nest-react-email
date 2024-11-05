import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Resource as ResourceSchema } from "@prisma/client";

@ObjectType()
export class Resource implements ResourceSchema {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
