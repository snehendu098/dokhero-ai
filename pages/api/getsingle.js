import prisma from "@/utils/prisma";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

const helper = async (req, res) => {
  const { user } = await getSession(req, res);
  try {
    const docs = await prisma.doc.findFirst({
      where: {
        id: parseInt(req.query.id),
        userId: user.sub,
      },
    });
    return res.status(200).json(docs, { success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error, success: false });
  }
};

export default withApiAuthRequired(helper);
