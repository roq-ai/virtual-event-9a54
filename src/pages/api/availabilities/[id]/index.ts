import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { availabilityValidationSchema } from 'validationSchema/availabilities';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.availability
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAvailabilityById();
    case 'PUT':
      return updateAvailabilityById();
    case 'DELETE':
      return deleteAvailabilityById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAvailabilityById() {
    const data = await prisma.availability.findFirst(convertQueryToPrismaUtil(req.query, 'availability'));
    return res.status(200).json(data);
  }

  async function updateAvailabilityById() {
    await availabilityValidationSchema.validate(req.body);
    const data = await prisma.availability.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAvailabilityById() {
    const data = await prisma.availability.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
