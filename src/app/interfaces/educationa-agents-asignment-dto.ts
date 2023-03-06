export interface EducationaAgentsAsignmentDto {
    trainingCenterId: string;
    trainingCenterCode: string;
    trainingCenterName: string;
    campusId: string;
    campusCode: string;
    campusName: string;
    developmentRoomId: string;
    developmentRoomCode: string;
    developmentRoomName: string;
    year: number;
    groupCode: string;
    groupName: string;
    agents: string[];
    agentsId: string[];
    id: string;
    organizationId: string;
    organizationName: string;
    enabled: boolean;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
}
