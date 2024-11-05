import { Module } from "@nestjs/common";
import { AuthorizationService } from "./authorization.service";
import { AuthorizationResolver } from "./authorization.resolver";
import { ResourceService } from "./services/resource.service";
import { PermissionService } from "./services/permission.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [
    AuthorizationResolver,
    AuthorizationService,
    ResourceService,
    PermissionService,
    PrismaService,
  ],
})
export class AuthorizationModule {}
