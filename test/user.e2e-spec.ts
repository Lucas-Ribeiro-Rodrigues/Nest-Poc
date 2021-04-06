import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from 'supertest';
import { UsersModule } from "../src/users/users.module";

// Test not working
describe('UsersController e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
    console.log(moduleFixture);

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('GET /', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
  })
})