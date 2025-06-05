// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post()
//   create(@Body() createAuthDto: CreateAuthDto) {
//     return this.authService.create(createAuthDto);
//   }

//   @Get()
//   findAll() {
//     return this.authService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.authService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
// }
// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/create-auth.dto';
// import { AddressDto } from './dto/address.dto';

// @Controller('api/auth/users')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   // Register endpoint
//   @Post('register')
//   async register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }

//   // Login endpoint
//   @Post('login')
//   async login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }

//   // Forgot password endpoint
//   @Post('forgot-password')
//   async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
//     return this.authService.forgotPassword(forgotPasswordDto);
//   }

//   // Reset password endpoint
//   @Post('reset-password')
//   async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
//     return this.authService.resetPassword(resetPasswordDto);
//   }
// }


import { Controller, Post, Body, Request, Session, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ForgotPasswordDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth/users')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // Register endpoint
  // @Post('register')
  // async register(@Body() registerDto: RegisterDto) {
  //   return this.authService.register(registerDto);
  // }

  @Post('register')
async register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
}

  // Login endpoint (returns JWT & stores session)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>) {
    const authResult = await this.authService.login(loginDto);
    
    // Store user in session
    session.user = authResult.user;

    return authResult;
  }

  // Check session
  @Post('session')
  async getSession(@Session() session: Record<string, any>) {
    return session.user ? session.user : { message: 'No active session' };
  }

  // Logout endpoint (destroys session)
  @Post('logout')
  async logout(@Session() session: Record<string, any>) {
    session.destroy((err) => {
      if (err) {
        console.error(err);
        return { message: 'Logout failed' };
      }
    });
    return { message: 'Logged out successfully' };
  }


  @Post('send-otp')
  async sendOtp(@Body() sendOtpDto: { email: string }) {
    return this.authService.sendOtp(sendOtpDto);
  }

  // Verify OTP endpoint
  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: { email: string; otp: string }) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  // Forgot password endpoint
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: { email: string; newPassword: string; confirmPassword: string }) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

 
}



