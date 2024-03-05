import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UploadApiResponse, v2 } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDto: SignUpDto, imageData): Promise<{ token: string,user:User }> {
        const { name, email, password,role } = signUpDto
console.log(name)
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            role,
            image:imageData.data
        })
        const token = this.jwtService.sign({ id: user._id })

        return { token,user };

    }

    async login(loginDto: LoginDto): Promise<{ token: string,user:User }> {

        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException('Invalid email or passoword')
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or passoword')
        }
        const token = this.jwtService.sign({ id: user._id })

        return { token,user };
    }

    async uploadImage(
        fileName: Express.Multer.File,
      ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
          v2.config({
            cloud_name: 'dyvs1yt5s',
            api_key: '188848741915724',
            api_secret: '3kew-OciRLbFAPCtPtb81KYtu9Y',
          });
          const upload = v2.uploader.upload_stream((error, result) => {
            if (error) return reject(error);
            resolve(result);
          });
          toStream(fileName.buffer).pipe(upload);
        });
      }

}
