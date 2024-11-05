import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateResourceInput {
  @Field(() => String)
  name: string;
}
