import { prisma } from "../../../../prisma/generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { userName, email, firstName, lastName, bio, avatar } = args;
      return prisma.updateUser({
        where: { id: user.id },
        data: {
          userName,
          email,
          firstName,
          lastName,
          bio,
          avatar
        }
      });
    }
  }
};
