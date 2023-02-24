export interface BeneficiariesListDto {
    Id: string;
    DocumentType: string;
    DocumentNumber: string;
    Names: string;
    LastNames: string;
}
export interface ViewGridOptions {
    year?: number;
    TrainingCenterId?: string;
    CampusId?: string;
    DevelopmentRoomId?: string;
    documentNumber?: number;
    name?: string;
    fEnabled?: boolean;
    page: number;
    pageSize: number;
  }

