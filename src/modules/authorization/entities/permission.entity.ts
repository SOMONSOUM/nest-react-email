import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Permission as PermissionSchema } from "@prisma/client";
import { Resource } from "./resource.entity";

@ObjectType()
export class Permission implements PermissionSchema {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  resourceId: number | null;

  @Field(() => Resource, { nullable: true })
  resource: Resource | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
