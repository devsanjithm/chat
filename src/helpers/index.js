// import jwt from "jsonwebtoken";
// import { STATUS_CODE } from "../config";
// import response from "./response.js";

// const generateToken = async (props, rememberMe) => {
//   const token = jwt.sign(props, process.env.SECRET_KEY, {
//     expiresIn: '90d',
//   });
//   return token;
// };

// async function checkAuthReq(req, res, next) {
//   try {
//     const user_token = req.header("authorization");
//     if (user_token) {
//       const bearer = user_token.split(' ');
//       const bearerToken = bearer[1]
//       // console.log(bearerToken);
//       const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
//       //
//       req.info = decoded;
//       next();
//     } else {
//       return res.status(STATUS_CODE.Forbidden).json(
//         response("Auth Token not found", {}, false, STATUS_CODE.Forbidden, {
//           error: "Authentication token not found",
//         })
//       );
//     }
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(STATUS_CODE.Unauthorized)
//       .json(
//         response(
//           "Time out session expired",
//           {},
//           false,
//           STATUS_CODE.Unauthorized,
//           { error: err.message }
//         )
//       );
//   }
// }

// export { checkAuthReq };
// export default generateToken;
