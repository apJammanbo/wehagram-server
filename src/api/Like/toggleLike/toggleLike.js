import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../prisma/generated/prisma-client";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOption = {
        AND: [{ user: { id: user.id } }, { post: { id: postId } }]
      };
      try {
        const existingLike = await prisma.$exists.like(filterOption);
        if (existingLike) {
          await prisma.deleteManyLikes(filterOption);
        } else {
          const like = await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
          await prisma.deleteManyLikes({
            AND: [
              { user: { id: user.id } },
              { post: { id: postId } },
              { id_not: like.id }
            ]
          });
        }
        return true;
      } catch (error) {
        return error;
      }
    }
  }
};
