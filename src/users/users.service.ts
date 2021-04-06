import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDTO } from "./dtos/user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    
  private readonly logger = new Logger(UsersService.name);

  constructor (
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
    ) {}
    
    async findAll(): Promise<UserDTO[]> {
      this.logger.log('[findAll] Starting to find all users');

      let users = await this.usersRepo.find();

      this.logger.log(`[findAll] Found ${users.length} users`);
      this.logger.debug(`[findAll] Found users: ${users}`);

      return users.map(user => UserDTO.from(user));
    }
    
    create(user: UserDTO): Promise<UserDTO> {
      let userEntity = this.usersRepo.create({ firstName: user.firstName, lastName: user.lastName, isActive: user.isActive });

      return this.usersRepo.save(userEntity);
    }

}