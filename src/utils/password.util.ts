import * as argon2 from "argon2";
import { GraphQLError } from "graphql";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await argon2.hash(password);
  } catch (error) {
    throw new GraphQLError("Error hashing password", {
      extensions: {
        code: "ERROR_HASHING_PASSWORD",
      },
    });
  }
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    throw new GraphQLError("Error verifying password", {
      extensions: {
        code: "ERROR_VERIFYING_PASSWORD",
      },
    });
  }
};
