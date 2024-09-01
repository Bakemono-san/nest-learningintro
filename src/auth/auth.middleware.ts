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

    // Liste des chemins à exclure de la vérification d'authentification
    const excludedPaths = [
      '/swagger-ui.html',
      '/swagger-ui/',
      '/v3/api-docs',
      '/swagger-resources',
      '/api/swagger-ui-bundle.js',
      '/api/swagger-ui-standalone-preset.js',
      '/',
    ];

    // Vérifiez si le chemin de la requête doit être exclu
    const isExcluded = excludedPaths.some((path) => req.path === path);
    console.log(req.path);

    if (isExcluded) {
      return next();
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: 'No token, authorization denied', path: req.path });
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
