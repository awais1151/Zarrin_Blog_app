import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    @UseInterceptors(FileInterceptor('file'))
    async signUp(@Body() signUpDto: SignUpDto,
    @UploadedFile() file: Express.Multer.File    
    
    ): Promise<{ token: string }> {

        const imageData= await this.authService
        .uploadImage(file)
        .then((data) => {
          return {
            statusCode: 200,
            data: data.secure_url,
          };
        })
        .catch((err) => {
          return {
            statusCode: 400,
            message: err.message,
          };
        });

        return this.authService.signUp(signUpDto,imageData)
    }
    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
      console.log(loginDto)
        return this.authService.login(loginDto)
    }


    @Post('online')
  @UseInterceptors(FileInterceptor('file'))
  async online(@UploadedFile() file: Express.Multer.File) {
    return await this.authService
      .uploadImage(file)
      .then((data) => {
        return {
          statusCode: 200,
          data: data.secure_url,
        };
      })
      .catch((err) => {
        return {
          statusCode: 400,
          message: err.message,
        };
      });
  }

}
