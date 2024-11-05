import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  resourceId: number;
}
