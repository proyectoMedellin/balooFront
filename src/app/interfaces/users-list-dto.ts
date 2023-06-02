export interface UsersListDto {
    id: string;
    organizationId: string;
    documentTypeId: string;
    documentNo: string;
    userName: string;
    email: string;
    firstName: string;
    otherNames: string;
    lastName: string;
    otherLastName: string;
    createdBy: string;
    trainingCenterId: string;
    campusId: string[];
    globalUser: boolean;
}
