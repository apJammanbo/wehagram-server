import { prisma } from "../../../../prisma/generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;

      let room;
      const { roomId, text, toId } = args;
      if (roomId) {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      } else {
        room = await prisma
          .createRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }]
            }
          })
          .$fragment(ROOM_FRAGMENT);
      }

      if (!room) {
        throw Error("Room Not Found!");
      }
      const getTo = room.participants.find(
        participant => participant.id !== user.id
      );
      return prisma.createMessage({
        text: text,
        from: { connect: { id: user.id } },
        to: { connect: { id: roomId ? getTo.id : toId } },
        room: { connect: { id: room.id } }
      });
    }
  }
};
