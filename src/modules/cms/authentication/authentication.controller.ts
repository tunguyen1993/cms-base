import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthenticationService } from './authentication.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller({
  version: '1',
})
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  /**
   *
   * @param body
   * @param response
   */
  @ApiTags('Login User CMS')
  @ApiOkResponse({ description: 'login success' })
  @Post('login')
  async login(@Body() body: LoginDto, @Res() response) {
    const user = await this.authService.validateUser(body);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: `Welcome back ${user.name}`,
      data: await this.authService.login(user),
    });
  }
}
