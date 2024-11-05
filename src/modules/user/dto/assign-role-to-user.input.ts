import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AssignRoleToUserInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  roleId: number;
}
