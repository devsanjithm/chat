import bcrypt from "bcrypt";
import { STATUS_CODE } from "../config";
import dbService from "../database";
import generateToken from "../helpers";
import response from "../helpers/response";
import hashGenerator from "../helpers/hashGenerator";
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 12;
class userervice {
  addUserService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let prevUser = await prisma.user.count({
          where: { name: payload.name },
        });
        if (prevUser > 0) {
          return reject(
            response("User Already exists", {}, false, STATUS_CODE.badRequest, {
              error: `user with name ${payload.name} already exists`,
            })
          );
        }

        let createUser = await prisma.user.create({ data: payload });

        if (createUser.count <= 0) {
          return reject(
            response(
              "Error While Inserting",
              {},
              false,
              STATUS_CODE.badRequest,
              { error: error.message }
            )
          );
        }
        return resolve(
          response(
            "User Added Sucessfully",
            { user: createUser },
            true,
            STATUS_CODE.success
          )
        );
      } catch (error) {
        console.log(error);
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  getThreadService = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let thread = await prisma.threads.findMany({ where: {} });
        if (!thread) {
          return reject(
            response(
              "Error While Retriving",
              {},
              false,
              STATUS_CODE.badRequest,
              { error: error.message }
            )
          );
        }
        return resolve(
          response(
            "Thread Retrived Sucessfully",
            { thread },
            true,
            STATUS_CODE.success
          )
        );
      } catch (error) {
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  getUserService = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let user = await prisma.user.findMany({ where: {} });
        if (!user) {
          return reject(
            response(
              "Error While Retriving",
              {},
              false,
              STATUS_CODE.badRequest,
              { error: error.message }
            )
          );
        }
        return resolve(
          response(
            "User Retrived Sucessfully",
            { user },
            true,
            STATUS_CODE.success
          )
        );
      } catch (error) {
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  addThreadService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let prevUser = await prisma.threads.count({
          where: { name: payload.name },
        });
        if (prevUser > 0) {
          return reject(
            response(
              "Group Already exists",
              {},
              false,
              STATUS_CODE.badRequest,
              {
                error: `Group with name ${payload.name} already exists`,
              }
            )
          );
        }

        let user = await prisma.user.findFirst({
          where: {
            user_id: payload.user_id,
          },
        });
        if (!user) {
          return reject(
            response("user doesn't exists", {}, false, STATUS_CODE.badRequest, {
              error: `user with name ${payload.name} doesn't exists`,
            })
          );
        }

        let createUser = await prisma.threads.create({ data: payload });

        if (createUser.count <= 0) {
          return reject(
            response(
              "Error While Inserting",
              {},
              false,
              STATUS_CODE.badRequest,
              { error: error.message }
            )
          );
        }
        return resolve(
          response(
            "Thread Added Sucessfully",
            { user: createUser },
            true,
            STATUS_CODE.success
          )
        );
      } catch (error) {
        console.log(error);
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  initiateNewMessage = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let threadName = `${payload.to_id}-${payload.from_id}`;
        let threadHash = hashGenerator(threadName);
        let prisma = dbService.prisma;
        let prevUser = await prisma.threads.findFirst({
          where: {
            name: threadHash,
          },
        });
        if (prevUser) {
          let Messagepayload = {
            body: payload.message,
            user_id: payload.from_id,
            thread_id: prevUser.thread_id,
          };
          await prisma.message.create({ data: Messagepayload });
          return resolve(
            response("Message Added Sucessfully", {}, true, STATUS_CODE.success)
          );
        }

        let threadPayload = {
          name: threadHash,
          is_group: false,
          createdBy:payload.from_id,
          participants: {
            create: [
              {
                user_id: payload.to_id,
              },
              {
                user_id: payload.from_id,
              },
            ],
          },
        };

        let createThread = await prisma.threads.create({ data: threadPayload });

        let createMessage = await prisma.message.create({
          data: {
            body: payload.message,
            user_id: payload.from_id,
            thread_id: createThread.thread_id,
          },
        });

        return resolve(
          response("New Message Thread Sucessfully", {},true, STATUS_CODE.success)
        );
      } catch (error) {
        console.log(error);
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  addMessage = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let Messagepayload = {
          body: payload.message,
          user_id: payload.user_id,
          thread_id: payload.thread_id,
        };
        await prisma.message.create({ data: Messagepayload });
        return resolve(
          response("Message Added Sucessfully", {}, true, STATUS_CODE.success)
        );
      } catch (error) {
        console.log(error);
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  getMessages = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let count = await prisma.message.count({ where: payload?.where });
        let messages = await prisma.message.findMany(payload);
        return resolve(
          response(
            "Fetch Messages",
            {
              messages,
              total: count,
              hasNext: count > payload?.skip + payload?.limit,
            },
            true,
            STATUS_CODE.success
          )
        );
      } catch (error) {
        console.log(error);
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  addParticipants = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let prevUser = await prisma.threads.findFirst({
          where: {
            thread_id: payload.thread_id,
          },
          include: {
            participants: true,
          },
        });
        if (!prevUser) {
          return reject(
            response(
              "Group Doesn't exists",
              {},
              false,
              STATUS_CODE.badRequest,
              {
                error: `Group with name ${payload.name} Doesn't exists`,
              }
            )
          );
        }
        if (!prevUser.is_group) {
          return reject(
            response(
              "Group Doesn't exists",
              {},
              false,
              STATUS_CODE.badRequest,
              {
                error: `Group with name ${payload.name} Doesn't exists`,
              }
            )
          );
        }

        for (let i = 0; i < prevUser.participants; i++) {
          const element = prevUser.participants[i];
          if (element === payload.user_id) {
            return reject(
              response("Already a member", {}, false, STATUS_CODE.badRequest, {
                error: `Already a member of the group`,
              })
            );
          }
        }

        let createUser = await prisma.participants.create({ data: payload });

        if (createUser.count <= 0) {
          return reject(
            response(
              "Error While Inserting",
              {},
              false,
              STATUS_CODE.badRequest,
              { error: error.message }
            )
          );
        }
        return resolve(
          response(
            "Participant Added Sucessfully",
            { user: createUser },
            true,
            STATUS_CODE.success
          )
        );
      } catch (error) {
        console.log(error);
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
  // updateUserService = (query, payload) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let prisma = dbService.prisma;
  //       let user = await prisma.user.update({
  //         where: query,
  //         data: payload,
  //       });
  //       if (user.count <= 0) {
  //         return reject(
  //           response(
  //             "Error While Updating",
  //             {},
  //             false,
  //             STATUS_CODE.badRequest,
  //             { error: error.message }
  //           )
  //         );
  //       }
  //       return resolve(
  //         response(
  //           "User Updated Sucessfully",
  //           { user },
  //           true,
  //           STATUS_CODE.success
  //         )
  //       );
  //     } catch (error) {
  //       return reject(
  //         response(
  //           "Unknown Error Occurred",
  //           {},
  //           false,
  //           STATUS_CODE.badRequest,
  //           { error: error.message }
  //         )
  //       );
  //     }
  //   });
  // };
  // deleteUserService = (payload) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let prisma = dbService.prisma;
  //       let data = {
  //         status: false,
  //         deleted_at: new Date().toISOString(),
  //       };
  //       console.log(payload);
  //       let user = await prisma.user.update({
  //         where: payload,
  //         data,
  //       });
  //       if (!user) {
  //         return reject(
  //           response(
  //             "Error While Deleting",
  //             {},
  //             false,
  //             STATUS_CODE.badRequest,
  //             { error: error.message }
  //           )
  //         );
  //       }
  //       return resolve(
  //         response("User Deleted Sucessfully", {}, true, STATUS_CODE.success)
  //       );
  //     } catch (error) {
  //       return reject(
  //         response(
  //           "Unknown Error Occurred",
  //           {},
  //           false,
  //           STATUS_CODE.badRequest,
  //           { error: error.message }
  //         )
  //       );
  //     }
  //   });
  // };
  // listUser = (payload) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let prisma = dbService.prisma;
  //       let count = await prisma.user.count({ where: payload?.where });
  //       let user = await prisma.user.findMany(payload);
  //       return resolve(
  //         response(
  //           "Fetch User",
  //           {
  //             user,
  //             total: count,
  //             hasNext: count > payload?.skip + payload?.limit,
  //           },
  //           true,
  //           STATUS_CODE.success
  //         )
  //       );
  //     } catch (error) {
  //       return reject(
  //         response(
  //           "Unknown Error Occurred",
  //           {},
  //           false,
  //           STATUS_CODE.badRequest,
  //           { error: error.message }
  //         )
  //       );
  //     }
  //   });
  // };
  loginUserService = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let prisma = dbService.prisma;
        let {
          name,
          //  password, rememberMe = true
        } = payload;
        // payload[`password`] = bcrypt.hashSync(payload.password, 10);
        let prevUser = await prisma.user.findMany({
          where: { name },
        });

        if (prevUser.length <= 0) {
          return reject(
            response(
              "User Does not exists",
              {},
              false,
              STATUS_CODE.badRequest,
              {
                error: `user with mailid ${name} does not exists`,
              }
            )
          );
        }
        // const passwordVerified = await bcrypt.compare(
        //   password,
        //   prevUser[0].password
        // );
        // delete prevUser[0].password;
        // if (!passwordVerified) {
        //   return reject(
        //     response(
        //       "Password Does not exists",
        //       {},
        //       false,
        //       STATUS_CODE.badRequest,
        //       {
        //         error: `Password Does not exists`,
        //       }
        //     )
        //   );
        // }
        // const authToken = await generateToken(prevUser[0], true);
        return resolve(
          response(
            "login success",
            {
              user: prevUser[0],
              // , token: authToken
            },
            true,
            200
          )
        );
      } catch (error) {
        return reject(
          response(
            "Unknown Error Occurred",
            {},
            false,
            STATUS_CODE.badRequest,
            { error: error.message }
          )
        );
      }
    });
  };
}

export default new userervice();
