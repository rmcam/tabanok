import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(`JwtAuthGuard - URL: ${request.url}, Method: ${request.method}`); // Añadir este log

        // Solución alternativa: omitir autenticación para la ruta /lesson/featured
        // Usar startsWith para manejar posibles parámetros de consulta
        if (request.url.startsWith('/lesson/featured') && request.method === 'GET') {
            console.log('Acceso público permitido para /lesson/featured');
            return true;
        }

        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            console.log('Acceso público permitido por decorador @Public');
            return true;
        }

        console.log('Token en JwtAuthGuard:', request.headers.authorization);

        // console.log('Llamando a super.canActivate(context)');
        return super.canActivate(context);
    }
}
