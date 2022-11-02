/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication system (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {
    const sentEmail = 'abc4@cde.com';
  
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: sentEmail, password: '123' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;

        expect(id).toBeDefined();
        expect(email).toEqual(sentEmail);
      })
  });

  it('signup as a new user and then get the currently logged in user', async () => {
    const sentEmail = 'abc4d@cde.com';

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: sentEmail, password: '123' })
      .expect(201)

    const cookie = response.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)

    expect(body.email).toEqual(sentEmail);
  });
});
