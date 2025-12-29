import { jwtConfig } from 'config/jwt.config';
import jwt, { SignOptions } from 'jsonwebtoken';


export interface JwtPayload {
    [key: string]: any;
    id?: number;
    userId?: string;
    email?: string;
    fullName?: string;
    phone?: string;
    sub?: string;
    iss?: string;
}

const jwtService = {
    generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, jwtConfig.secret as string, {
            expiresIn: jwtConfig.expiresIn,
        } as SignOptions);
    },

    verifyToken(token: string): JwtPayload {
        try {
            const decoded = jwt.verify(token, jwtConfig.secret);
            return decoded as JwtPayload;
        } catch (error) {
            throw error;
        }
    },

    decodeToken(token: string): JwtPayload | null {
        const decoded = jwt.decode(token);
        return decoded as JwtPayload | null;
    }
};

export default jwtService;