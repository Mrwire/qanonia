import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Role } from '../src/common/constants/roles';

const authHeaders = {
  'x-user-id': '00000000-0000-0000-0000-000000000001',
  'x-user-email': 'admin@qanounia.test',
  'x-user-role': Role.ADMIN,
  'x-org-id': '11111111-1111-1111-1111-111111111111',
};

describe('CasesModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates a case when payload is valid', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/cases')
      .set(authHeaders)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Contrat Acme',
        clientId: '22222222-2222-2222-2222-222222222222',
        assignees: ['33333333-3333-3333-3333-333333333333'],
      })
      .expect(201);

    expect(response.body.data).toMatchObject({
      title: 'Contrat Acme',
      status: 'DRAFT',
      clientId: '22222222-2222-2222-2222-222222222222',
      assigneeIds: ['33333333-3333-3333-3333-333333333333'],
    });
  });

  it('rejects invalid payload', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/cases')
      .set(authHeaders)
      .send({ title: 'AB', clientId: 'invalid' });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe('VALIDATION_FAILED');
  });

  it('enforces RBAC', async () => {
    await request(app.getHttpServer())
      .post('/v1/cases')
      .set({
        ...authHeaders,
        'x-user-role': Role.CLIENT,
      })
      .send({
        title: 'Test dossier',
        clientId: '22222222-2222-2222-2222-222222222222',
      })
      .expect(403);
  });

  it('fetches created case', async () => {
    const creation = await request(app.getHttpServer())
      .post('/v1/cases')
      .set(authHeaders)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Procédure de signature',
        clientId: '44444444-4444-4444-4444-444444444444',
      })
      .expect(201);

    const caseId = creation.body.data.id;

    const getResponse = await request(app.getHttpServer())
      .get(`/v1/cases/${caseId}`)
      .set(authHeaders)
      .expect(200);

    expect(getResponse.body.data.id).toBe(caseId);
    expect(getResponse.body.data.timeline[0].type).toBe('CASE_CREATED');
  });
});
