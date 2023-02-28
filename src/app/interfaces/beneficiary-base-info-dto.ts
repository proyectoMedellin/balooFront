export interface BeneficiaryBaseInfoDto {
    id: string,
    documentTypeId: string,
    documentTypeName: string,
    documentNumber: string,
    firstName: string,
    otherNames: string,
    lastName: string,
    otherLastName: string,
    birthDate: Date,
    emergencyPhoneNumber: string,
    photoUrl: string
}
