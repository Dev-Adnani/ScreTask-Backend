import { Request, Response } from "express";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";
import UserInfo from "../../models/userModel/user.model";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';

export class AuthController {

  //Sign Up Method
  static async signUp(req: Request, res: Response) {
    let { useremail, userpassword ,username ,userphoto , secretcode, secretcodeinput} = req.body;
    let isValidated = EmailValidator.validate(useremail);
    let adminSecret = req.headers.authorization as string;
    let jwt_secret = process.env.JWT_SECRET as string;
    

    if (adminSecret === "test") {
      if (!isValidated) {
        return res.send({
          authentication: false,
          emailVerification:false,
          data: "Email Address Badly Formatted",
        });
      } else {
        if (userpassword.length < 6) {
          return res.send({
            authentication: false,
            emailVerification:false,
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
                    emailVerification:false,
                    data: error,
                  });
                } else {

                  if(secretcode === secretcodeinput)
                  {
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
                          emailVerification:true,
                          data: error,
                        });
                      } else {
                        return res.send({
                          authentication: true,
                          emailVerification:true,
                          data: data,
                        });
                      }
                    }
                  );
                  }
                  else
                  {
                    return res.send({
                      authentication: false,
                      emailVerification:false,
                      data: [],
                    });
                  }

                }
              }
            );
          } else {
            return res.send({
              authentication: false,
              emailVerification:false,
              data: "Email Already Exists",
            });
          }
        }
      }
    } else {
      return res.send({
        authentication: false,
        emailVerification:false,
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
                      id : userData["id"] as string,
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
            data: "No Account Found",
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

  
  static async sendEmailVerification(req: Request, res: Response) {
    let {useremail} = req.body;
    var secretkeyword = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    let adminname = process.env.CUSTOM_EMAIL as string;
    let adminpassword = process.env.CUSTOM_PASS as string;

    let transporter = nodemailer.createTransport({
      host: "in-v3.mailjet.com",
      port: 587,
      secure: false,
      auth: {
        user: adminname,
        pass: adminpassword,
      },
    });

    const mailOptions = {
      from: "no-reply@devadnani.com",
      to: useremail,
      html: `${secretkeyword} is your Security Code from creating a new account. Copy and paste ${secretkeyword} in the signup field.`,
      subject: "Scre-Task Account Verification",
      text: `${secretkeyword} is your Security Code from creating a new account. Copy and paste ${secretkeyword} in the signup field.`,
    };

    let isValidated = EmailValidator.validate(useremail);

    if (!isValidated) {
      return res.send({
        data: "Enter valid email",
        secretcode: null,
        received: false,
      });
    }
    else
    {
      const emailCheck = await UserInfo.exists(
        {
          useremail: useremail,
        },
        async (error: any, emailExists: any) => {
          if (error) {
            return res.send({
              data: error,
              secretcode: null,
              received: false,
            });
          }
          if (emailExists) {
            return res.send({
              data: "Email already exists",
              secretcode: null,
              received: false,
            });
          } else {
            transporter.sendMail(mailOptions, (error: any, data: any) => {
              if (error) {
                console.log(error);
                return res.send({
                  data: "Something went wrong",
                  secretcode: null,
                  received: false,
                });
              } else {
                let accepted = data.accepted;
                if (accepted.length != 0) {
                  return res.send({
                    data: useremail,
                    secretcode: secretkeyword,
                    received: true,
                  });
                }
                if (accepted.length == 0) {
                  return res.send({
                    data: useremail,
                    secretcode: null,
                    received: false,
                  });
                }
              }
            });
          }
        }
      );
    }
  }
  

}
