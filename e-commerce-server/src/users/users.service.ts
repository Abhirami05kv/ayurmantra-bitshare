import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/auth/entities/address.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { User } from 'src/auth/entities/auth.entity';


import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
 
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

async create(createUserDto: CreateUserDto): Promise<User> {
  const { address, ...userData } = createUserDto;
  console.log("Received User Data:", userData);  
  console.log("Received Address Data:", address);
  
  const user = this.userRepository.create(userData);

 
  if (address && address.length > 0) {
    const addressEntities = address.map(addr => 
      this.addressRepository.create({ ...addr, user })  
    );
    
    
    user.address = addressEntities; 
  }

  try {
   
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  } catch (error) {
    console.error('Error while creating user:', error);
    throw new InternalServerErrorException('Error creating user');
  }
}

  
async findAll(page?: number, limit?: number): Promise<{ data: User[], total?: number }> {
  if (page && limit) {
    // Pagination applied
    const [users, total] = await this.userRepository.findAndCount({
      relations: ['address'],
      take: limit,
      skip: (page - 1) * limit,
      order: { id: 'DESC' }, // Optional: Order by latest users
    });

    return { data: users, total };
  }

  // Return all users if no pagination parameters provided
  const users = await this.userRepository.find({ relations: ['address'] });
  return { data: users };
}


  
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['address'] });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

 
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
  
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }

    console.log('Existing User:', user);
    console.log('Update Data:', updateUserDto);

   
    if (updateUserDto.phoneNumber) {
      const existingUser = await this.userRepository.findOne({
          where: { phoneNumber: String(updateUserDto.phoneNumber) }, 
      });
  
      if (existingUser && existingUser.id !== id) {
          throw new ConflictException(`Phone number ${updateUserDto.phoneNumber} already exists`);
      }
  }

   
    if (updateUserDto.address && updateUserDto.address.length > 0) {
        await this.addressRepository.delete({ user: { id } }); 

        const addressEntities = updateUserDto.address.map(addr => 
            this.addressRepository.create({ ...addr, user })
        );

        user.address = await this.addressRepository.save(addressEntities); 
    }
    Object.assign(user, updateUserDto);

    try {
        return await this.userRepository.save(user);
    } catch (error) {
        console.error('Error while updating user:', error);
        throw new InternalServerErrorException('Error updating user');
    }
  }

  // Delete a user
  async delete(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    
    try {
     // await this.addressRepository.delete({ user: { id } });
      await this.userRepository.remove(user);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting user');
    }
  }

  async addProfilePicture(id: number, file: Express.Multer.File): Promise<{ message: string; profilePic: string }> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    const filePath = `/uploads/profile-pics/${file.filename}`; 
    user.profile_pic = filePath;

    await this.userRepository.save(user);
    return { message: 'Profile picture updated successfully', profilePic: filePath };
  }

  async deleteProfilePicture(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    if (!user || !user.profile_pic) throw new NotFoundException('No profile picture found');

    const filePath = join(__dirname, '..', '..', user.profile_pic);  
    try {
      await unlink(filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    User.profilePic = null;
    await this.userRepository.save(user);
    return { message: 'Profile picture deleted successfully' };
  }

  async updateProfilePicture(id: number, file: Express.Multer.File): Promise<{ message: string; profilePic: string }> {
    await this.deleteProfilePicture(id);
    return this.addProfilePicture(id, file);
  }

  async activateUser(userId: number): Promise<any> {
    // Fetch the user to be activated
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    if (user.is_active) {
      return {
        statusCode: 200,
        success: true,
        message: 'User is already active.',
      };
    }

    // Activate the user
    user.is_active = true;
    await this.userRepository.save(user);

    return {
      statusCode: 200,
      success: true,
      message: `User with ID ${userId} has been activated successfully.`,
    };
  }

  async saveDeviceToken(userId: number, deviceToken: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
  
    user.deviceToken = deviceToken;
    return await this.userRepository.save(user);
  }
  
  }
  
  
  


