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

describe('DocgenModule (e2e)', () => {
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

  it('renders a document and records audit trail', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/docgen/render')
      .set(authHeaders)
      .send({
        templateId: 'contract-basic-fr',
        out: 'pdf',
        locale: 'fr',
        variables: {
          client: { name: 'Acme Corp' },
          org: { name: 'Qanounia' },
          engagement: {
            title: 'Assistance juridique 2024',
            amount: 15000,
            currency: 'MAD',
            date: '2024-07-01',
          },
        },
      })
      .expect(200);

    expect(response.body.data).toMatchObject({
      documentId: expect.any(String),
      storageKey: expect.stringMatching(/\.pdf$/),
      hash: expect.stringMatching(/^[a-f0-9]{64}$/),
      downloadUrl: expect.stringContaining(response.body.data.storageKey),
    });

    const auditResponse = await request(app.getHttpServer())
      .get('/v1/audit')
      .set(authHeaders)
      .expect(200);

    const auditEntry = auditResponse.body.data.find(
      (item: { entityId: string; action: string }) =>
        item.entityId === response.body.data.documentId && item.action === 'DOCUMENT_RENDERED',
    );
    expect(auditEntry).toBeDefined();
  });

  it('rejects invalid variables payload', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/docgen/render')
      .set(authHeaders)
      .send({
        templateId: 'contract-basic-fr',
        out: 'pdf',
        locale: 'fr',
        variables: {},
      });

    expect(response.status).toBe(400);
    expect(response.body.code ?? response.body?.message).toBeDefined();
  });

  it('returns 404 when template does not exist', async () => {
    await request(app.getHttpServer())
      .post('/v1/docgen/render')
      .set(authHeaders)
      .send({
        templateId: 'unknown-template',
        out: 'docx',
        locale: 'ar',
        variables: {
          client: { name: 'Ghost' },
        },
      })
      .expect(404);
  });
});
