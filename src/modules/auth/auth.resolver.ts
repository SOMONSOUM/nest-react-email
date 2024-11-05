import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { LoginResponse, RefreshTokenResponse } from "./entities/login.entity";
import { RefreshTokenInput } from "./dto/refresh-token.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args("input") input: LoginInput) {
    return await this.authService.login(input);
  }

  @Mutation(() => RefreshTokenResponse)
  async refreshToken(@Args("input") input: RefreshTokenInput) {
    return await this.authService.refreshToken(input);
  }
}
