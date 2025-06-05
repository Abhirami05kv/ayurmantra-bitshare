import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './user-role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
   
  constructor(  @InjectRepository(User)
  private userRepository: Repository<User> ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false, 
      secretOrKey: process.env.JWT_SECRET || 'root', 
    });
  }
// async validate(payload: any) {
//   console.log('JWT Payload:', payload);
async validate(payload: any) {
  // const user = await this.userRepository.findOne({ where: { id: payload.id } });
  const userId = payload.id;   

  //  if (!user || ![UserRole.USER, UserRole.ADMIN].includes(user.role)) {
  //   throw new UnauthorizedException('Unauthorized role');
  // }         

  if (!userId) {
    throw new UnauthorizedException('Invalid token');
  }
  if (!payload.id) {
    throw new UnauthorizedException('Invalid token');
  }

  const user = await this.userRepository.findOne({ where: { id: Number(payload.id) } });

  if ((!user || ![UserRole.USER, UserRole.ADMIN].includes(user.role))) {
    throw new UnauthorizedException('User not found');
  }

  return user; 

  }
}
