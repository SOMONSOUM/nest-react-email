import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Role as RoleSchema } from "@prisma/client";
import { PermissionResource } from "./permission-resource.entity";

@ObjectType()
export class Role implements RoleSchema {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [PermissionResource])
  permissions: PermissionResource[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
