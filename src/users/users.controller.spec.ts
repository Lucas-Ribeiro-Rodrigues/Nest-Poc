import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDTO } from "./dtos/user.dto";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service";

describe('UsersControllerExample1', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    usersService = new UsersService(new Repository<User>());
    usersController = new UsersController(usersService);
  });

  describe('getAllUsers', () => {
    it('should return array of users', async () => {
        let users = [UserDTO.fromAttributes('Zezinho', 'Silva', true)];
        jest.spyOn(usersService, 'findAll').mockImplementation(async () => users);

        expect(await usersController.getAllUsers()).toBe(users);
      });

  });
});

describe('UsersControllerExample2', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory }
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  describe('getAllUsers', () => {
    it('should return array of users', async () => {
      let users = [UserDTO.fromAttributes('Zezinho', 'Silva', true)];
      jest.spyOn(usersService, 'findAll').mockImplementation(async () => users);

      expect(await usersController.getAllUsers()).toBe(users);
    });
    
  });

  const repositoryMockFactory: () => MockType<any> = jest.fn(() => ({
    find: jest.fn(entity => entity),
  }));

  type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
  };
});

