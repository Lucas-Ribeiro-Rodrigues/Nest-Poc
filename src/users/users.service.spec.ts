import { Repository } from "typeorm";
import { UserDTO } from "./dtos/user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(() => {
    usersRepository = new Repository<User>();
    usersService = new UsersService(usersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('findall', () => {

    it('should return array of users', async () => {
      let usersDTO = [UserDTO.fromAttributes('Zezinho', 'Silva', true)];
      let users = [User.fromAttributes('Zezinho', 'Silva', true)];

      let find = jest.spyOn(usersRepository, 'find').mockImplementation(async () => users);
  
      expect(await usersService.findAll()).toStrictEqual(usersDTO);
      expect(find).toHaveBeenCalledTimes(1);
    })

  })

})