import { Request, Response } from 'express';

export default {
    async hello(request: Request, response: Response) {
        return response.json({ ok: true, user: response.locals.jwtPayload.userId });
    }
};