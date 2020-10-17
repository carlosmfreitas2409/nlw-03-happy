import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../config/auth';

import User from '../models/User';

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

export default {
    async register(request: Request, response: Response) {
        const {
            name,
            email,
            password,
        } = request.body;

        const usersRepository = getRepository(User);

        if(await usersRepository.findOne({ email })) return response.status(400).json({ error: 'User already exists' });

        const data = {
            name,
            email,
            password,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false
        });
    
        const user = usersRepository.create(data);
    
        await usersRepository.save(user);

        user.password = undefined!;
        
        return response.status(201).json({
            user,
            token: generateToken({ userId: user.id }),
        });
    },

    async authenticate(request: Request, response: Response) {
        const { email, password } = request.body;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ email }, {
            select: ['id', 'name', 'email', 'password']
        });

        if(!user) return response.status(404).send({ error: 'User not found' });

        if(!await bcrypt.compare(password, user.password)) return response.status(400).json({ error: 'Invalid password' });

        user.password = undefined!;

        return response.status(201).json({
            user,
            token: generateToken({ userId: user.id }),
        });
    }
};