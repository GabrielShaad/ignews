import { NextApiRequest, NextApiResponse } from 'next';

const webhooks = (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Ouvindo Webhook');

  res.status(200);
};

export default webhooks;
