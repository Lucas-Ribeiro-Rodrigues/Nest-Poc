import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Logger, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserDTO } from "./dtos/user.dto";
import { UsersService } from "./users.service";

@Controller("/users")
@ApiTags("users")
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) { }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUsers(): Promise<UserDTO[]> {
    this.logger.log('[getAllUsers] called!');

    return await this.usersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: UserDTO): Promise<UserDTO> {
    return this.usersService.create(user);
  }
}