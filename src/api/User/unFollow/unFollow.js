import { prisma } from "../../../../prisma/generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    unFollow: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: {
            id: user.id
          },
          data: {
            following: {
              disconnect: {
                id
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
