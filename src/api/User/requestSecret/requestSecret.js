import { prisma } from "../../../../prisma/generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../util";

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch {
        return false;
      }
    }
  }
};
