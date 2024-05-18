

import prisma from "../../../shared/prisma";
import * as bcrypt from 'bcrypt' 
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";


const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
          
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelpers.createToken(
      {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
      {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    return {
        
        refreshToken,
        id: userData.id,
        name: userData.name,
        email:userData.email,
        accessToken,
        
    };
};



export const AuthServices = {
    loginUser}
   