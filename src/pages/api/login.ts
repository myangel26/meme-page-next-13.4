// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import api from '../../../services/api'
import { 
  URL_LOGIN, 
  MES_SERVER_ERROR, 
  MES_WRONG_METHOD, 
  MES_SUCCESS, 
  MES_USER_OR_PASSWORD_INVALID 
} from '../../../constants'

type Data = {
  status: number,
  result?: Record<string, any>,
  messege: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const method = req.method;
  if (method === 'POST') {
    const data = req.body;
    try {
      const resServer = await api.callJson(URL_LOGIN, { data, method })
      if(resServer.status === 200){
        //30min
        const currenttime = new Date();
        const expiresTime = new Date(currenttime.getTime() + 1 * 30*60 * 1000);

        res.setHeader('Set-Cookie', `token=${ resServer.token }; expires= ${ expiresTime.toUTCString() }; path=/`)
        // res.status(200).json({ status: 200, result: resServer, messege: MES_SUCCESS  })

        //Cách 2: Redirect phía Server
        res.setHeader('Location', '/');
        res.status(302).json({ status: 200, result: resServer, messege: MES_SUCCESS })
      } else {
        res.setHeader('Location', '/login?error=Failed');
        res.status(302).json({ status: 200, result: resServer, messege: MES_USER_OR_PASSWORD_INVALID })
      }
      
    } catch (error: any) {
      console.log(error.message);
      res.status(200).json({ status: 500, messege: MES_SERVER_ERROR })
    }
  } else {
    res.status(200).json({ status: 500, messege: MES_WRONG_METHOD })
  }
}
