import { Field, ObjectType, PartialType } from "@nestjs/graphql";

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}

@ObjectType()
export class RefreshTokenResponse extends PartialType(LoginResponse) {}
