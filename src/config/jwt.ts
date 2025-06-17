import jwt from 'jsonwebtoken';

export class JwtAdapter {
    static async generateToken(
        payload: Object,
        duration: string = '2h'
    ): Promise<string | null> {
        //Todo: generación deL SEED
        return new Promise((resolve) => {
            jwt.sign(
                payload,
                'SEED',
                { expiresIn: duration } as jwt.SignOptions,
                (err, token) => {
                    if (err) return resolve(null);
                    resolve(token!);
                }
            );
        });
    }

    static validateToken(token: string){
        return new Promise((resolve) => {
            jwt.verify(token, 'SEED', (err, decoded) => {
                if(err) return resolve(null);
                resolve(decoded);
            })
        });
    }
}