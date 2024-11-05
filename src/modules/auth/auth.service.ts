import { Injectable, Logger } from "@nestjs/common";
import { GraphQLError } from "graphql";
import { PrismaService } from "src/prisma/prisma.service";
import { verifyPassword } from "src/utils";
import { ConfigService } from "@nestjs/config";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { JwtPayload } from "src/common/interfaces";
import { LoginInput } from "./dto/login.input";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(input: LoginInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new GraphQLError("User not found", {
        extensions: {
          code: "USER_NOT_FOUND",
        },
      });
    }

    const isMatch = await verifyPassword(input.password, user.password);

    if (!isMatch) {
      throw new GraphQLError("Invalid credentials", {
        extensions: {
          code: "INVALID_CREDENTIALS",
        },
      });
    }

    const accessToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        expiresIn: this.configService.getOrThrow<string>(
          "ACCESS_TOKEN_EXPIRATION"
        ),
        secret: this.configService.getOrThrow<string>("ACCESS_TOKEN_SECRET"),
      }
    );
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        expiresIn: this.configService.getOrThrow<string>(
          "REFRESH_TOKEN_EXPIRATION"
        ),
        secret: this.configService.getOrThrow<string>("REFRESH_TOKEN_SECRET"),
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(input: RefreshTokenInput) {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        input.refreshToken,
        {
          secret: this.configService.getOrThrow<string>("REFRESH_TOKEN_SECRET"),
        }
      );
      if (!payload) {
        throw new GraphQLError("Invalid refresh token", {
          extensions: {
            code: "INVALID_REFRESH_TOKEN",
          },
        });
      }

      const accessToken = await this.jwtService.signAsync(
        { sub: payload.sub },
        {
          expiresIn: this.configService.getOrThrow<string>(
            "ACCESS_TOKEN_EXPIRATION"
          ),
          secret: this.configService.getOrThrow<string>("ACCESS_TOKEN_SECRET"),
        }
      );
      const refreshToken = await this.jwtService.signAsync(
        { sub: payload.sub },
        {
          expiresIn: this.configService.getOrThrow<string>(
            "REFRESH_TOKEN_EXPIRATION"
          ),
          secret: this.configService.getOrThrow<string>("REFRESH_TOKEN_SECRET"),
        }
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      this.logger.error(error);
      if (error instanceof GraphQLError) {
        throw error;
      }
      if (error instanceof JsonWebTokenError) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.name,
          },
        });
      } else {
        throw new GraphQLError(`Something went wrong`, {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }
    }
  }
}
