import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}
  use(req: any, res: any, next: () => void) {
    const token = req.cookies.token ? req.cookies.token : null;
    console.log(req.path);
    if (!token) {
      return res
        .status(401)
        .json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = this.jwt.verify(token, {
        secret: this.configService.get('TOKEN'),
      });
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token verification failed', error);
      res.status(401).json({ message: 'Token is not valid' });
    }
  }
}
