// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest<Request>();
//     const authHeader = request.headers['authorization'] as string | undefined;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       throw new UnauthorizedException('Invalid or missing authentication token');
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//       const decoded = this.jwtService.verify(token);
//       console.log('Decoded Token:', decoded); // Debugging log
//       if (!decoded.id) {
//         throw new UnauthorizedException('Invalid token payload: user ID missing');
//       }
//       (request as any).user = decoded;
//       return true;
//     } catch (error) {
//       console.error('JWT Verification Error:', error.message);
//       throw new UnauthorizedException('Invalid or expired token');
//     }
//   }
// }

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'] as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing authentication token');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      console.log('Decoded Token:', decoded); 
      if (!decoded.id) {
        throw new UnauthorizedException('Invalid token payload: user ID missing');
      }

      (request as any).user = { ...decoded, id: Number(decoded.id) }; 
      return true;
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
