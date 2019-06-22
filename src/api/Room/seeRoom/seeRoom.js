import { prisma } from "../../../../prisma/generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const canSee = await prisma.$exists.room({
        id,
        participants_some: { id: user.id }
      });
      if (!canSee) {
        throw Error("Room is not Exist");
      }

      return prisma.room({ id }).$fragment(ROOM_FRAGMENT);
    }
  }
};
