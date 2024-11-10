import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      const secretKey = this.configService.get<String>('JWT_SECRET').toString()
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: secretKey
          }
        );

        request.user = payload;
      } catch (error){
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const authHeader = request.headers.authorization;
        
      if (authHeader && authHeader.startsWith('Bearer ')) {
          return authHeader.split(' ')[1];
      }
      
      return undefined;    
    }
  }
  