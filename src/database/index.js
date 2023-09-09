import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dbService = {
  prisma: undefined,
  connect: (callback) => {
    prisma
      .$connect()
      .then((result) => {
        dbService.prisma = prisma;
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  },
};
export default dbService;
