import { Controller, Get, Param, Put, Body, Delete, Post, UploadedFile, UseInterceptors, ParseIntPipe, Req, UseGuards, ForbiddenException, Query, Patch, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { User } from 'src/auth/entities/auth.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types/request.type';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { NotificationService } from 'src/notification/notification.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
  private readonly notificationService: NotificationService
  ) {}

  @Get() // Ensure it's a GET request
  async getUsers(
    @Query('page') page?: number, 
    @Query('limit') limit?: number
  ) {
    return this.usersService.findAll(
      page ? Number(page) : undefined, 
      limit ? Number(limit) : undefined
    );
  }
  

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

//   @Get(':id')
// async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
//   return this.usersService.findOne(id);
// }


  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ success: boolean; message: string; user: User }> {
  const user = await this.usersService.create(createUserDto);
  return { success: true, message: 'User registered successfully', user };
}

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.usersService.delete(id);
  }

  @Post('profile-pic/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/profile-pics',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
  async addProfilePicture(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    return await this.usersService.addProfilePicture(id, file);
  }

  @Delete('profile-pic/:id')
  async deleteProfilePicture(@Param('id') id: number) {
    return await this.usersService.deleteProfilePicture(id);
  }

  @Post('profile-pic/update/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/profile-pics',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
  async updateProfilePicture(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    return await this.usersService.updateProfilePicture(id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/activate/:userId')
  async activateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: AuthenticatedRequest
  ) {
    if (!req.user || req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can activate users.');
    }

    return this.usersService.activateUser(userId);
  }

  @Post('save-device-token')
 @UseGuards(JwtAuthGuard)
async saveDeviceToken(@Req() req, @Body('deviceToken') deviceToken: string) {
  console.log('User:', req.user); // Debug log
  return this.usersService.saveDeviceToken(req.user.id, deviceToken);
}
}
