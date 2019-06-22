import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../prisma/generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
  Query: {
    seeRooms: (_, __, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma
        .rooms({
          where: {
            participants_some: {
              id: user.id
            }
          }
        })
        .$fragment(ROOM_FRAGMENT);
    }
  }
};
