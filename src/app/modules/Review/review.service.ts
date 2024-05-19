
import prisma from "../../../shared/prisma";

const createReview = async (payload: any) => {

  const result = await prisma.review.create({
    data:payload
  })

  return result;
};

const getAllReviews = async () => {
  const result = await prisma.review.findMany();
  return result;
};



export const ReviewServices = {
  createReview,
  getAllReviews,
 
};
