import { prisma } from "../../../../prisma/generated/prisma-client";

export default {
  Query: {
    allUsers: () => {
      return prisma.users();
    }
  }
};
