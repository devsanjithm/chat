import { STATUS_CODE } from "../config";
import response from "../helpers/response";
import userService from "../service/userService";
class userController {
  addUsers = async (req, res) => {
    try {
      let payload = req.body;
      userService
        .addUserService(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  UsersLogin = async (req, res) => {
    try {
      console.log("loggedd");
      let payload = req.body;

      userService
        .loginUserService(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  getUsers = async (req, res) => {
    try {
      let payload = {};
      // let payload = req.query.query;
      // if (!payload) {
      //   return res
      //     .status(STATUS_CODE.badRequest)
      //     .json(
      //       response(
      //         "Query Element is requires",
      //         {},
      //         false,
      //         STATUS_CODE.badRequest,
      //         "Query Element is requires"
      //       )
      //     );
      // }
      // try {
      //   payload = {
      //     where: {
      //       id: req.params.id,
      //       status:true
      //     },
      //   };
      //   // payload = JSON.parse(payload);
      // } catch (error) {
      //   return res
      //     .status(STATUS_CODE.badRequest)
      //     .json(
      //       response(
      //         "Error while parsing query",
      //         {},
      //         false,
      //         STATUS_CODE.badRequest,
      //         error
      //       )
      //     );
      // }
      userService
        .getUserService()
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  getThread = async (req, res) => {
    try {
      let payload = {};
      // let payload = req.query.query;
      // if (!payload) {
      //   return res
      //     .status(STATUS_CODE.badRequest)
      //     .json(
      //       response(
      //         "Query Element is requires",
      //         {},
      //         false,
      //         STATUS_CODE.badRequest,
      //         "Query Element is requires"
      //       )
      //     );
      // }
      // try {
      //   payload = {
      //     where: {
      //       id: req.params.id,
      //       status:true
      //     },
      //   };
      //   // payload = JSON.parse(payload);
      // } catch (error) {
      //   return res
      //     .status(STATUS_CODE.badRequest)
      //     .json(
      //       response(
      //         "Error while parsing query",
      //         {},
      //         false,
      //         STATUS_CODE.badRequest,
      //         error
      //       )
      //     );
      // }
      userService
        .getThreadService()
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  addThread = async (req, res) => {
    try {
      let payload = req.body;
      userService
        .addThreadService(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  initiateNewMessage = async (req, res) => {
    try {
      let payload = req.body;
      userService
        .initiateNewMessage(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  addMessage = async (req, res) => {
    try {
      let payload = req.body;
      userService
        .addMessage(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  getMessage = async (req, res) => {
    try {
     let payload = req.body
      userService
        .getMessages(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  addParticipants = async (req, res) => {
    try {
     let payload = req.body
      userService
        .addParticipants(payload)
        .then((result) => {
          return res
            .status(result.code)
            .json(
              response(result.message, result.data, result.status, result.code)
            );
        })
        .catch((error) => {
          return res
            .status(error.code)
            .json(response(error.error, {}, false, error.code, error.error));
        });
    } catch (error) {
      return res
        .status(STATUS_CODE.internalServerError)
        .json(
          response(
            "Unknown error Occurred",
            {},
            false,
            STATUS_CODE.internalServerError,
            { error: error.message }
          )
        );
    }
  };
  // updateUsers = async (req, res) => {
  //   try {
  //     let query = { id: req.params.id };
  //     if (!req.params.id) {
  //       return res
  //         .status(STATUS_CODE.badRequest)
  //         .json(
  //           response(
  //             "Id is required for update",
  //             {},
  //             false,
  //             STATUS_CODE.badRequest,
  //             "Id is required for update"
  //           )
  //         );
  //     }
  //     let payload = req.body;
  //     userService
  //       .updateUsersService(query, payload)
  //       .then((result) => {
  //         return res
  //           .status(result.code)
  //           .json(
  //             response(result.message, result.data, result.status, result.code)
  //           );
  //       })
  //       .catch((error) => {
  //         return res
  //           .status(error.code)
  //           .json(response(error.error, {}, false, error.code, error.error));
  //       });
  //   } catch (error) {
  //     return res
  //       .status(STATUS_CODE.internalServerError)
  //       .json(
  //         response(
  //           "Unknown error Occurred",
  //           {},
  //           false,
  //           STATUS_CODE.internalServerError,
  //           { error: error.message }
  //         )
  //       );
  //   }
  // };
  // deleteUsers = async (req, res) => {
  //   try {
  //     let payload = { id: req.params.id };
  //     if (!req.params.id) {
  //       return res
  //         .status(STATUS_CODE.badRequest)
  //         .json(
  //           response(
  //             "Id is required for Delete",
  //             {},
  //             false,
  //             STATUS_CODE.badRequest,
  //             "Id is required for Delete"
  //           )
  //         );
  //     }
  //     userService
  //       .deleteUsersService(payload)
  //       .then((result) => {
  //         return res
  //           .status(result.code)
  //           .json(
  //             response(result.message, result.data, result.status, result.code)
  //           );
  //       })
  //       .catch((error) => {
  //         return res
  //           .status(error.code)
  //           .json(response(error.error, {}, false, error.code, error.error));
  //       });
  //   } catch (error) {
  //     return res
  //       .status(STATUS_CODE.internalServerError)
  //       .json(
  //         response(
  //           "Unknown error Occurred",
  //           {},
  //           false,
  //           STATUS_CODE.internalServerError,
  //           { error: error.message }
  //         )
  //       );
  //   }
  // };
  // listUsers = async (req, res) => {
  //   try {
  //     let payload = req.payload;
  //     userService
  //       .listUsers(payload)
  //       .then((result) => {
  //         return res
  //           .status(result.code)
  //           .json(
  //             response(result.message, result.data, result.status, result.code)
  //           );
  //       })
  //       .catch((error) => {
  //         return res
  //           .status(error.code)
  //           .json(response(error.error, {}, false, error.code, error.error));
  //       });
  //   } catch (error) {
  //     return res
  //       .status(STATUS_CODE.internalServerError)
  //       .json(
  //         response(
  //           "Unknown error Occurred",
  //           {},
  //           false,
  //           STATUS_CODE.internalServerError,
  //           { error: error.message }
  //         )
  //       );
  //   }
  // };
}
export default new userController();
