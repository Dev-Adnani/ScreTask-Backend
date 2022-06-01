import { Request, Response } from "express";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";
import UserInfo from "../../models/userModel/user.model";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

export class AuthController {

  //Sign Up Method
  static async signUp(req: Request, res: Response) {
    let { useremail, userpassword ,username ,userphoto} = req.body;
    let isValidated = EmailValidator.validate(useremail);
    let adminSecret = req.headers.authorization as string;
    let jwt_secret = process.env.JWT_SECRET as string;

    if (adminSecret === "test") {
      if (!isValidated) {
        return res.send({
          authentication: false,
          data: "Email Address Badly Formatted",
        });
      } else {
        if (userpassword.length < 6) {
          return res.send({
            authentication: false,
            data: "Password Length Should Be Greather Than 6",
          });
        } else {
          const emailCheck = await UserInfo.exists({ email: useremail });

          if (!emailCheck) {
            const salt = await bcrypt.genSalt(10);
            
            await bcrypt.hash(
              userpassword,
              salt,
              async (error: any, hashedPassword: any) => {
                if (error) {
                  return res.send({
                    authentication: false,
                    data: error,
                  });
                } else {

                  var userxid = uuidv4();

                  const newUser = await UserInfo.create({
                    id:userxid,
                    email: useremail,
                    name: username,
                    photo: userphoto,
                    password: hashedPassword,
                  });

                  jwt.sign(
                    {
                      email: useremail,
                      name: username,
                      id : userxid,
                      photo : userphoto,
                    },
                    jwt_secret,
                    {
                      expiresIn: "2h",
                    },
                    async (error: any, data: any) => {
                      if (error) {
                        return res.send({
                          authentication: false,
                          data: error,
                        });
                      } else {
                        return res.send({
                          authentication: true,
                          data: data,
                        });
                      }
                    }
                  );

                }
              }
            );
          } else {
            return res.send({
              authentication: false,
              data: "Email Already Exists",
            });
          }
        }
      }
    } else {
      return res.send({
        authentication: false,
        data: "Wrong API Key",
      });
    }
  }

  // Login Method
  static async login(req: Request, res: Response) {
    let { useremail, userpassword } = req.body;
    let isValidated = EmailValidator.validate(useremail);
    let adminSecret = req.headers.authorization as string;
    let jwt_secret = process.env.JWT_SECRET as string;

    if (adminSecret === "test") {
      if (!isValidated) {
        return res.send({
          authentication: false,
          data: "Email Address Badly Formatted",
        });
      } else {
        const emailCheck = await UserInfo.exists({ email: useremail });
        const userData = await UserInfo.findOne({ email: useremail }).lean();

        if (emailCheck) {
          if (userData !== null) {
            if (userpassword.length < 6) {
              return res.send({
                authentication: false,
                data: "Password Length Should Be Greather Than 6",
              });
            } else {
              bcrypt.compare(
                userpassword,
                userData["password"] as string,
                (error: any, isPasswordMatched: any) => {
                  if (error) {
                    return res.send({
                      authentication: false,
                      data: error,
                    });
                  }
                  if (!isPasswordMatched) {
                    return res.send({
                      authentication: false,
                      data: "Incorrect Password",
                    });
                  }
                  if (isPasswordMatched) {
                   jwt.sign(
                    {
                      email: useremail,
                      name: userData["name"] as string,
                      id : userData["id"] as number,
                      photo : userData["photo"] as string,
                    },
                    jwt_secret,
                    {
                      expiresIn: "2h",
                    },
                    async (error: any, data: any) => {
                      if (error) {
                        return res.send({
                          authentication: false,
                          data: error,
                        });
                      } else {
                        return res.send({
                          authentication: true,
                          data: data,
                        });
                      }
                    }
                  );
                  }
                }
              );
            }
          }
        } else {
          return res.send({
            authentication: false,
            data: "Email Doesn't Already Exists",
          });
        }
      }
    } else {
      return res.send({
        authentication: false,
        data: "Wrong API Key",
      });
    }
  }

   //Decoding JWT 👍
  static async decodeUseData(req: Request, res: Response) {
    let tokenData = req.headers.authorization as string;
    let jwt_secret = process.env.JWT_SECRET as string;

    jwt.verify(tokenData, jwt_secret, async (error: any, userData: any) => {
      if (error) {
        return res.send({
          received: false,
          data: error,
        });
      } else {
        return res.send({
          received: true,
          data: userData,
        });
      }
    });
  }


}
