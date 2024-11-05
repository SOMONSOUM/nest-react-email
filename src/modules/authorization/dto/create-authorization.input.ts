import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorizationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
