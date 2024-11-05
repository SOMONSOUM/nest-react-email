import { CreateAuthorizationInput } from './create-authorization.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorizationInput extends PartialType(CreateAuthorizationInput) {
  @Field(() => Int)
  id: number;
}
