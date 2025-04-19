import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from '../../src/dashboard/dashboard.service';
import { FileStorageService } from '../../src/file-storage/file-storage.service';

describe('DashboardService', () => {
    let dashboardService: DashboardService;
    let fileStorageService: FileStorageService;

    const mockKpis = [{ id: '1', name: 'KPI 1' }, { id: '2', name: 'KPI 2' }];
    const mockNews = [{ id: '1', title: 'News 1' }, { id: '2', title: 'News 2' }];
    const mockNotifications = [{ id: '1', message: 'Notification 1' }, { id: '2', message: 'Notification 2' }];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DashboardService,
                {
                    provide: FileStorageService,
                    useValue: {
                        readFile: jest.fn(),
                        findById: jest.fn(),
                    },
                },
            ],
        }).compile();

        dashboardService = module.get<DashboardService>(DashboardService);
        fileStorageService = module.get<FileStorageService>(FileStorageService);
        
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(dashboardService).toBeDefined();
    });

    describe('getKpis', () => {
        it('should call fileStorageService.readFile with the correct file and return KPIs', async () => {
            (fileStorageService.readFile as jest.Mock).mockResolvedValue(mockKpis);

            const result = await dashboardService.getKpis();

            expect(fileStorageService.readFile).toHaveBeenCalledWith(dashboardService['KpiFile']);
            expect(result).toEqual(mockKpis);
        });
    });

    describe('getKpi', () => {
        it('should call fileStorageService.findById with the correct file and ID and return the KPI', async () => {
            const kpiId = '1';
            const expectedKpi = mockKpis.find(kpi => kpi.id === kpiId);
            (fileStorageService.findById as jest.Mock).mockResolvedValue(expectedKpi);

            const result = await dashboardService.getKpi(kpiId);

            expect(fileStorageService.findById).toHaveBeenCalledWith(dashboardService['KpiFile'], kpiId);
            expect(result).toEqual(expectedKpi);
        });

        it('should return undefined if KPI is not found', async () => {
            const kpiId = '3';
            (fileStorageService.findById as jest.Mock).mockResolvedValue(undefined);

            const result = await dashboardService.getKpi(kpiId);

            expect(fileStorageService.findById).toHaveBeenCalledWith(dashboardService['KpiFile'], kpiId);
            expect(result).toBeUndefined();
        });
    });

    describe('getNews', () => {
        it('should call fileStorageService.readFile with the correct file and return news', async () => {
            (fileStorageService.readFile as jest.Mock).mockResolvedValue(mockNews);

            const result = await dashboardService.getNews();

            expect(fileStorageService.readFile).toHaveBeenCalledWith(dashboardService['NewsFile']);
            expect(result).toEqual(mockNews);
        });
    });

    describe('getNotifications', () => {
        it('should call fileStorageService.readFile with the correct file and return notifications', async () => {
            (fileStorageService.readFile as jest.Mock).mockResolvedValue(mockNotifications);

            const result = await dashboardService.getNotifications();

            expect(fileStorageService.readFile).toHaveBeenCalledWith(dashboardService['NotificationsFile']);
            expect(result).toEqual(mockNotifications);
        });
    });
});