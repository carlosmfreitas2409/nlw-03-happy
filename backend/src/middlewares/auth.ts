import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if(!authHeader) return response.status(401).json({ error: "No token provided" });

    const parts = authHeader.split(' ');

    if(parts.length !== 2) return response.status(401).json({ error: 'Token error' });

    const [ scheme, token ] = parts;
    
    if(!/^Bearer$/.test(scheme)) return response.status(401).json({ error: 'Token malformatted' });

    let jwtPayload;
    
    try {
        jwtPayload = <any>jwt.verify(token, authConfig.secret);
        response.locals.jwtPayload = jwtPayload;
    } catch(error) {
        return response.status(401).json({ error: 'Invalid Token' });
    }

    next();

    // jwt.verify(token, authConfig.secret, (err, decoded) => {
    //     if(err) return response.status(401).json({ error: 'Token invalid' });

    //     response.locals.jwtPayload = (<any>decoded).id;
    //     return next();
    // });
}