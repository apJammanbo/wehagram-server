import { prisma } from "../../../../prisma/generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { userName, email, firstName = "", lastName = "", bio = "" } = args;
      const exist = await prisma.$exists.user({
        OR: [{ userName }, { email }]
      });
      if (exist) {
        throw Error("This username is already taken");
      }
      await prisma.createUser({
        userName,
        email,
        firstName,
        lastName,
        bio
      });
      return true;
    }
  }
};
