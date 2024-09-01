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
    const token = req.cookies.token || null;

    // Define Swagger and public routes that should not require authentication
    const publicRoutes = [
      '/swagger-ui.html',
      '/swagger-ui/',
      '/api/swagger-ui-bundle.js',
      '/api/swagger-ui-standalone-preset.js',
      '/api/swagger-ui.css',
    ];

    // Check if the request path matches any public route
    if (publicRoutes.some((route) => req.path.startsWith(route))) {
      return next();
    }

    // Check for token and verify if it's provided
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
