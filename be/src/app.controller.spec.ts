import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataDao } from './data.dao';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

describe('AppController', () => {
  let appController: AppController;
  let mockDao: DeepMocked<DataDao>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    })
      .useMocker((token) => {
        if (token === DataDao) {
          return createMock<DataDao>();
        }
      })
      .compile();

    appController = app.get<AppController>(AppController);
    mockDao = app.get(DataDao);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /data', () => {
    it('should return all data', async () => {
      const result = [
        { _id: '123', data: 'test data', _v: 0, created: Date.now() },
      ];
      mockDao.getAll.mockResolvedValue(result);

      expect(await appController.getAll()).toBe(result);
    });
  });

  describe('GET /data/:id', () => {
    it('should return a data record', async () => {
      const result = {
        _id: '123',
        data: 'test data',
        _v: 0,
        created: Date.now(),
      };
      mockDao.get.mockResolvedValue(result);

      expect(await appController.get('123')).toBe(result);
    });
  });

  describe('POST /data', () => {
    it('should create a data record', async () => {
      const input = {
        data: 'test data',
      };

      await appController.create(input);

      expect(mockDao.create.mock.calls).toHaveLength(1);
      expect(mockDao.create.mock.calls[0][0]).toBe(input.data);
    });
  });

  describe('PUT /data/:id', () => {
    it('should update a data record', async () => {
      const id = '123';
      const input = {
        data: 'test data',
      };

      await appController.update(id, input);

      expect(mockDao.update.mock.calls).toHaveLength(1);
      expect(mockDao.update.mock.calls[0][0]).toBe(id);
      expect(mockDao.update.mock.calls[0][1]).toBe(input.data);
    });
  });

  describe('DELETE /data/:id', () => {
    it('should delete a data record', async () => {
      const id = '123';

      await appController.delete(id);

      expect(mockDao.delete.mock.calls).toHaveLength(1);
      expect(mockDao.delete.mock.calls[0][0]).toBe(id);
    });
  });
});
