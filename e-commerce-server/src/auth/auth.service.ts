import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException, NotFoundException, ConflictException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, Admin } from 'typeorm';
import { User } from './entities/auth.entity';
import { Address } from './entities/address.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { RegisterDto, LoginDto, ForgotPasswordDto,SendOtpDto,VerifyOtpDto } from './dto/create-auth.dto'; 
import { UserRole } from './user-role.enum';
import { STATUS_CODES } from 'http';
import { IsPhoneNumber } from 'class-validator';
import { UsersService } from 'src/users/users.service';



@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hexaintechnologies@gmail.com',
      pass: 'rycaswawktlbjuyu',
    },
  });

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}



  // async register(registerDto: RegisterDto): Promise<any> {
  //   try {
  //     const { name, email, password, address, phone, role, googleId, is_active } = registerDto;
  
  //     // Validate email format before proceeding
  //     const validEmail = this.isValidEmailFormat(email);
  //     if (!validEmail) {
  //       throw new BadRequestException('Invalid email format');
  //     }
  
  //     // Check if user with email or phone already exists
  //     const existingUser = await this.userRepository.findOne({
  //       where: [{ email }, { phone }],
  //     });
  //     if (existingUser) throw new ConflictException('Email or Phone is already in use');
  
  //     // Hash password if not using Google login
  //     const hashedPassword = googleId ? null : await bcrypt.hash(password || '', 10);
  
  //     // Create a new user
  //     const newUser = this.userRepository.create({
  //       name,
  //       email,
  //       password: hashedPassword ?? undefined,
  //       phone,
  //       role: role ?? UserRole.USER,  // Default role to 'USER' if not provided
  //       google_id: googleId ?? undefined,
  //       is_active: is_active ?? true, // Use provided value or default to true
  //     });
  
  //     // Save the user
  //     const savedUser = await this.userRepository.save(newUser);
  //     if (!savedUser) throw new InternalServerErrorException('Error saving user');
  
  //     // Handle addresses if provided
  //     if (address?.length && address.length > 0) {
  //       try {
  //         const addressEntities = address.map((addr) =>
  //           this.addressRepository.create({ ...addr, user: savedUser })
  //         );
  //         await this.addressRepository.save(addressEntities);
  //       } catch (error) {
  //         throw new InternalServerErrorException('Error saving address');
  //       }
  //     }
  
  //     // Fetch full user details (including addresses)
  //     const fullUser = await this.userRepository.findOne({
  //       where: { id: savedUser.id },
  //       relations: ['addresses'],
  //     });
  //     if (!fullUser) throw new InternalServerErrorException('Error fetching saved user');
  
  //     // Generate JWT Token
  //     const payload = { id: fullUser.id, email: fullUser.email, role: fullUser.role };
  //     const token = this.jwtService.sign(payload);
  
  //     // Construct response
  //     return {
  //       success: true,
  //       message: 'User registered successfully',
  //       user: {
  //         id: fullUser.id,
  //         name: fullUser.name,
  //         email: fullUser.email,
  //         phone: fullUser.phone,
  //         role: fullUser.role,
  //         is_active: fullUser.is_active, // Include is_active in the response
  //         address: fullUser.addresses?.map(addr => ({
  //           street: addr.street,
  //           city: addr.city,
  //           state: addr.state,
  //           country: addr.country,
  //           zipCode: addr.zipCode,
  //         })),
  //         createdAt: fullUser.created_at,
  //       },
  //       token,
  //     };
  //   } catch (error) {
  //     if (error instanceof BadRequestException || error instanceof ConflictException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException(error.message || 'Error registering user');
  //   }
  // }

  // async register(registerDto: RegisterDto): Promise<any> {
  //   try {
  //     const { name, email, password, address, phone, role, googleId, is_active } = registerDto;
  //     console.log('Extracted Password:', password);
  // console.log(registerDto,"-----------------");
  
  //     // Validate email format before proceeding
  //     // const validEmail = this.isValidEmailFormat(email);
  //     // if (!validEmail) {
  //     //   throw new BadRequestException('Invalid email format');
  //     // }

  //     if (!this.isValidEmailFormat(email)) {
  //       throw new BadRequestException('Invalid email format');
  //     }
  
  //     // Check if user with email or phone already exists
  //     const existingUser = await this.userRepository.findOne({
  //       where: [{ email }, { phone }],
  //     });
  //     if (existingUser) throw new ConflictException('Email or Phone is already in use');
  
  //     // Hash password if not using Google login
  //     //const hashedPassword = googleId ? null : await bcrypt.hash(password || '', 10);
      

  //     //const hashedPassword = googleId ? undefined : await bcrypt.hash(password, 10);
  //     let hashedPassword: string | undefined = undefined;
  //   if (!googleId) {
  //     if (!password ) {
  //       throw new BadRequestException('Password is required for non-Google users');
  //     }
  //     hashedPassword = await bcrypt.hash(password, 10);
  //     console.log('Hashed Password:', hashedPassword); // Debugging hashed password
  //   }

  //     // Create a new user
  //     const newUser = this.userRepository.create({
  //       name,
  //       email,
  //       password: hashedPassword ?? undefined,
  //       // password: hashedPassword,
  //       phone,
  //       role: role ?? UserRole.USER,  // Default role to 'USER' if not provided
  //       google_id: googleId ?? undefined,
  //       is_active: is_active ?? true, // Use provided value or default to true
  //     });
  
  //     // Save the user
  //     const savedUser = await this.userRepository.save(newUser);
  //     if (!savedUser) throw new InternalServerErrorException('Error saving user');
  
  //     // Log user details
  //     console.log('Saved User:', savedUser);
  
  //     // Handle addresses if provided
  //     if (address?.length && address.length > 0) {
  //       console.log('Address provided:', address);  // Check the address provided
  //       try {
  //         const addressEntities = address.map((addr) => {
  //           const newAddress = new Address();
  //           newAddress.street = addr.street;
  //           newAddress.city = addr.city;
  //           newAddress.state = addr.state;
  //           newAddress.country = addr.country;
  //           newAddress.zipCode = addr.zipCode;
  //           newAddress.user = savedUser; // Explicitly set the user relation
  //           return newAddress;
  //         });
          
  //         const savedAddress = await this.addressRepository.save(addressEntities);
  //         console.log('Saved Address:', savedAddress); // Log saved addresses
  //       } catch (error) {
  //         throw new InternalServerErrorException('Error saving address');
  //       }
  //     }
  
  //     // Fetch full user details (including addresses)
  //     const fullUser = await this.userRepository.findOne({
  //       where: { id: savedUser.id },
  //       relations: ['address'],
  //     });
  //     if (!fullUser) throw new InternalServerErrorException('Error fetching saved user');
  
  //     // Log full user with addresses
  //     console.log('Full User:', fullUser);
  
  //     // Generate JWT Token
  //     const payload = { id: fullUser.id, email: fullUser.email, role: fullUser.role };
  //     const token = this.jwtService.sign(payload);
  
      
  //     return {
  //       success: true,
  //       message: 'User registered successfully',
  //       user: {
  //         id: fullUser.id,
  //         name: fullUser.name,
  //         email: fullUser.email,
  //         phone: fullUser.phone,
  //         role: fullUser.role,
  //         is_active: fullUser.is_active, 
  //         // address: fullUser.address?.map(addr => ({
  //         //   street: addr.street,
  //         //   city: addr.city,
  //         //   state: addr.state,
  //         //   country: addr.country,
  //         //   zipCode: addr.zipCode,
  //         // })),
  //         createdAt: fullUser.created_at,
  //       },
  //       token,
  //     };
  //   } catch (error) {
  //     if (error instanceof BadRequestException || error instanceof ConflictException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException(error.message || 'Error registering user');
  //   }
  // }

  async register(registerDto: RegisterDto): Promise<any> {
    try {
        const { name, email, password, address, phoneNumber, role, googleId, is_active } = registerDto;

        // Validate email format before proceeding
        console.log('Received Registration Data:', registerDto);

        if (!email || typeof email !== 'string') {
            throw new BadRequestException('Email is required and must be a string');
        }

        const trimmedEmail = email.trim();

        console.log('Validating email:', trimmedEmail);
        if (!this.isValidEmailFormat(trimmedEmail)) {
            throw new BadRequestException('Invalid email format');
        }

        // Check if user with email or phone already exists
        const existingUser = await this.userRepository.findOne({
            where: [{ email }, { phoneNumber }],
        });
        if (existingUser) throw new ConflictException('Email or Phone is already in use');

        // Hash password if not using Google login
        const hashedPassword = googleId ? null : await bcrypt.hash(password || '', 10);

        // Create a new user
        const newUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword ?? undefined,
            phoneNumber,
            role: role ?? UserRole.USER,
            google_id: googleId ?? undefined,
            is_active: is_active ?? true,
        });

        // Save the user
        const savedUser = await this.userRepository.save(newUser);
        if (!savedUser) throw new InternalServerErrorException('Error saving user');

        console.log('Saved User:', savedUser);

        // Handle addresses if provided
        if (address?.length && address.length > 0) {
            console.log('Address provided:', address);
            try {
                const addressEntities = address.map((addr) => {
                    const newAddress = new Address();
                    newAddress.street = addr.street;
                    newAddress.city = addr.city;
                    newAddress.state = addr.state;
                    newAddress.country = addr.country;
                    newAddress.zipCode = addr.zipCode;
                    newAddress.user = savedUser;
                    return newAddress;
                });

                const savedAddress = await this.addressRepository.save(addressEntities);
                console.log('Saved Address:', savedAddress);
            } catch (error) {
                throw new InternalServerErrorException('Error saving address');
            }
        }

        // Fetch full user details (including addresses)
        const fullUser = await this.userRepository.findOne({
            where: { id: savedUser.id },
            relations: ['address'],
        });
        if (!fullUser) throw new InternalServerErrorException('Error fetching saved user');

        console.log('Full User:', fullUser);

        // Generate JWT Token
        const payload = { id: fullUser.id, email: fullUser.email, role: fullUser.role };
        const token = this.jwtService.sign(payload);

        return {
            statusCode: 201, 
            success: true,
            message: 'User registered successfully',
            user: {
                id: fullUser.id,
                name: fullUser.name,
                email: fullUser.email,
                phoneNumber: fullUser.phoneNumber,
                role: fullUser.role,
                is_active: fullUser.is_active,
                createdAt: fullUser.created_at,
            },
            token,
        };
    } catch (error) {
        if (error instanceof BadRequestException || error instanceof ConflictException) {
            throw error;
        }

        throw new InternalServerErrorException({
            statusCode: STATUS_CODES,
            success: false,
            message: error.message || 'Error registering user',
        });
    }
}

  


async login(loginDto: LoginDto): Promise<any> {
  const { email, password } = loginDto;

  console.log('Received email:', email);
  console.log('Received password:', password);

  if (!email || !password) {
      throw new BadRequestException('Email and password are required for login');
  }

 

  // Find user
  const user = await this.userRepository.findOne({
      where: { email },
      relations: ['address'], 
  });

  if (!user) {
      throw new UnauthorizedException('User does not exist');
  }


  if (!user.is_active) {
    return {
      statusCode: 201, 
      success: false,
      message: 'Your account is inactive. Please contact the administrator to activate your account.',
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
      throw new UnauthorizedException('Password does not match');
  }

  // if (deviceToken) {
  //   await this.usersService.saveDeviceToken(user.id, deviceToken);
  // }

  

  const payload = {
    id: user.id,
    role: user.role, // ✅ Make sure role is included
  };
  
  const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  const accessToken = this.jwtService.sign(payload);
  // const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

 
  return {
      statusCode: 201,
      success: true,
      message: 'Login successful',  
      user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          createdAt: user.created_at,
          address: user.address,
      },
      token: accessToken,
  };
}


async sendOtp(sendOtpDto: SendOtpDto): Promise<{ message: string }> {
  const { email } = sendOtpDto;

  if (!email) throw new BadRequestException('Email is required');

  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) throw new NotFoundException('No user found with this email');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiration = new Date(Date.now() + 10 * 60 * 1000);

  user.reset_token = otp;
  user.reset_token_expires = expiration;
  await this.userRepository.save(user);

  // Send OTP via email
  await this.transporter.sendMail({
    from: 'your-email@example.com',
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
  });

  return { message: 'OTP sent to email' };
}

async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string }> {
  const { email, otp } = verifyOtpDto;

  if (!email || !otp) {
    throw new BadRequestException('Email and OTP are required');
  }

  const validEmail = await this.isValidEmailFormat(email);
  if (!validEmail) {
    throw new BadRequestException('Invalid email format');
  }

  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundException('No user found with this email');
  }

  if (user.reset_token !== otp) {
    throw new BadRequestException('Invalid OTP');
  }

  if (!user.reset_token_expires || new Date(user.reset_token_expires) < new Date()) {
    throw new BadRequestException('OTP has expired');
  }

  return { message: 'OTP verified successfully' };
}

// Function to validate email format
// private async isValidEmailFormat(email: string): Promise<boolean> {
//   const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   return emailRegex.test(email);
// }

isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



// Import the ForgotPasswordDto class
// async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
//   const { email, newPassword, confirmPassword } = forgotPasswordDto;

//   // Validate input fields
//   if (!email || !newPassword || !confirmPassword) throw new BadRequestException('All fields are required');
  
//   // Validate email format
//   const validEmail = await this.isValidEmailFormat(email);
//   if (!validEmail) throw new BadRequestException('Invalid email format');

//   // Validate password format
//   const passwordValid = this.isValidPassword(newPassword);
//   if (!passwordValid) {
//     throw new BadRequestException('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
//   }

//   // Check if passwords match
//   if (newPassword !== confirmPassword) throw new BadRequestException('Passwords do not match');

//   const user = await this.userRepository.findOne({ where: { email } });
//   if (!user) throw new NotFoundException('No user found with this email');

//   // Hash the new password
//   user.password = await bcrypt.hash(newPassword, 10);
//   user.reset_token = null;
//   user.reset_token_expires = null;
//   await this.userRepository.save(user);

//   return { message: 'Password successfully updated' };
// }

async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ success: boolean; statusCode: number; message: string }> {
  const { email, newPassword, confirmPassword } = forgotPasswordDto;

  // Validate input fields
  if (!email || !newPassword || !confirmPassword) {
    throw new BadRequestException('All fields are required');
  }
  
  // Validate email format
  if (!this.isValidEmailFormat(email)) {
    throw new BadRequestException('Invalid email format');
  }

  // Validate password format
  if (!this.isValidPassword(newPassword)) {
    throw new BadRequestException('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  }

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    throw new BadRequestException('Passwords do not match');
  }

  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundException('No user found with this email');
  }

  // Hash the new password and update user
  user.password = await bcrypt.hash(newPassword, 10);
  user.reset_token = null;
  user.reset_token_expires = null;
  await this.userRepository.save(user);

  return { 
    statusCode: 201,
    success: true, 
    message: 'Password successfully updated'
  };
}


private isValidPassword(password: string): boolean {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
}

 


}