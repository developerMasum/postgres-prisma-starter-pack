
import { UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { hashedPassword } from "./user.utils";
import { Request } from "express";


const createUser = async (req: Request) => {
  const { password, ...rest } = req.body;
    const hashPassword = await hashedPassword(password);
    const result = await prisma.user.create({
      data: {
        ...rest,
        password: hashPassword,
      },
      select:{
        id:true,
        name: true,
        email:true,
        role:true,
        createdAt:true,
        updatedAt:true
      }
    
    });

return result


}

const getAllUser = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getMyProfile = async (authUser: any) => {
  console.log(authUser)
  const userData = await prisma.user.findUnique({
    where: {
      id: authUser.id,
     
    },
    select: {
      email: true,
      role: true,

    },
  });

  let profileData;
  if (userData?.role === UserRole.ADMIN) {
    profileData = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  } else if (userData?.role === UserRole.MANAGER) {
    profileData = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  } else if (userData?.role === UserRole.USER) {
    profileData = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
      select:{
        id : true,
        email : true,
        name : true,
        role : true,
      }
    });
  }
  return { ...profileData, ...userData };
};

export const UserServices = {
  createUser,
  getAllUser,
  getMyProfile
};
