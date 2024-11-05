import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AssignPermissionInput {
  @Field(() => Int)
  roleId: number;

  @Field(() => Int)
  permissionId: number;
}
