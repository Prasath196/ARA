
export class UserWithRole {
    userID: any;
    roleID: any;
    userName: string;
    displayName: string;
    plant: string;
    email: string;
    password: string;
    contactNumber: string;
    isActive: boolean;
    createdOn: Date;
    createdBy: string;
    modifiedOn?: Date;
    modifiedBy: string;
}
export class UserWithRP {
    userID: any;
    roleID: any;
    plants:string[];
    permission:string;
    userName: string;
    email: string;
    password: string;
    contactNumber: string;
    isActive: boolean;
    createdOn: Date;
    createdBy: string;
    modifiedOn?: Date;
    modifiedBy: string;
    displayName: string;
}
export class UserPreference {
    iD: number;
    userID: any;
    navbarPrimaryBackground: string;
    navbarSecondaryBackground: string;
    toolbarBackground: string;
    isActive: boolean;
    createdOn: Date;
    createdBy: string;
    modifiedOn?: Date;
    modifiedBy: string;
}
export class UserView {
    userID: any;
    userName: string;
}
export class RoleWithApp {
    roleID: any;
    roleName: string;
    appIDList: number[];
    isActive: boolean;
    createdOn: Date;
    createdBy: string;
    modifiedOn?: Date;
    modifiedBy: string;
}
export class MenuApp {
    appID: number;
    appName: string;
    isActive: boolean;
    createdOn: Date;
    createdBy: string;
    modifiedOn?: Date;
    modifiedBy: string;
}
export class Plant{
    PlantID:string;
    PlantText:string;
    AddressLine1:string;
    AddressLine2:string;
    City:string;
    State:string;
    Country:string;
    PinCode:string;
    IsActive: boolean;
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string | null;
    ModifiedBy: string;
}
export class AppUsage {
    ID: number;
    UserID: any;
    // AppID: number;
    AppName: string;
    UsageCount: number;
    LastUsedOn: Date | string;
    IsActive: boolean;
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string | null;
    ModifiedBy: string;
}
export class AppUsageView {
    ID: number;
    UserID: any;
    UserName: string;
    UserRole: string;
    AppName: string;
    UsageCount: number;
    LastUsedOn: Date | string;
    IsActive: boolean;
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string | null;
    ModifiedBy: string;
}
export class Reason {
    ReasonID: number;
    Description: string;
    IsActive: boolean;
    CreatedOn: Date;
    CreatedBy: string;
    ModifiedOn?: Date;
    ModifiedBy: string;
}
export class AuthenticationDetails {
    isAuth: boolean;
    userID: any;
    userName: string;
    displayName: string;
    emailAddress: string;
    userRole: string;
    token: string;
    menuItemNames: string;
    profile: string;
    refreahToken: string;
    expires: string;
    issued: string;
    expiresin: string;
    tourStatus: boolean;
    plants:string[];
    permission:string;
}
export class ChangePassword {
    UserID: any;
    UserName: string;
    CurrentPassword: string;
    NewPassword: string;
}
export class LoginModel {
    userName: string;
    password: string;
    clientId: string;
}
export class EMailModel {
    emailAddress: string;
    siteURL: string;
}
export class ForgotPassword {
    UserID: any;
    EmailAddress: string;
    NewPassword: string;
    Token: string;
}
export class UserNotification {
    ID: number;
    UserID: string;
    Message: string;
    HasSeen: boolean;
    CreatedOn: Date;
    ModifiedOn?: Date;
}
export class VendorUser {
    UserName:string;
    Email: string;
    Phone: string;
    DisplayName:string;
    IsBlocked:boolean;
}
export class SessionMaster {
    ID: number;
    ProjectName: string;
    SessionTimeOut: number;
    IsActive: boolean;
    CreatedOn: Date | string;
    CreatedBy: string;
    ModifiedOn: Date | string | null;
    ModifiedBy: string;
}
export class UserLoginHistory {
    iD: number;
    userID: string;
    userName: string;
    loginTime: Date | string;
    logoutTime: Date | string | null;
    // IP: string;
}
export class LoginHistoryFilter {
    fromDate: string;
    toDate: string;
    userName: string;
}

