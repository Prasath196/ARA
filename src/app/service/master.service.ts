import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError, Subject } from "rxjs";
import { AuthService } from "./auth.service";
import { catchError } from "rxjs/operators";
import { MenuApp, AppUsage, AppUsageView, Reason, RoleWithApp, Plant, UserWithRole, VendorUser, UserView, UserNotification, UserPreference, SessionMaster, UserLoginHistory } from "../Model/master";

@Injectable({
    providedIn: "root",
})
export class MasterService {
    baseAddress: string;
    NotificationEvent: Subject<any>;

    GetNotification(): Observable<any> {
        return this.NotificationEvent.asObservable();
    }

    TriggerNotification(eventName: string): void {
        this.NotificationEvent.next(eventName);
    }

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this.baseAddress = _authService.baseAddress;
        this.NotificationEvent = new Subject();
    }

    // Error Handler
    errorHandler(error: HttpErrorResponse): Observable<string> {
        return throwError(error.error || error.message || "Server Error");
    }

    // App
    CreateMenuApp(menuApp: MenuApp): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/CreateApp`,
                menuApp,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllMenuApp(): Observable<MenuApp[] | string> {
        return this._httpClient
            .get<MenuApp[]>(
                `${this.baseAddress}api/Master/GetAllApps`
            )
            .pipe(catchError(this.errorHandler));
    }
    GetRFQRoleWithUsers(role:string): Observable<any> {
        return this._httpClient
            .get<string[]>(
                `${this.baseAddress}api/Master/GetRFQRoleWithUsers?RoleName=${role}`
            )
            .pipe(catchError(this.errorHandler));
    }

    UpdateMenuApp(menuApp: MenuApp): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/UpdateApp`,
                menuApp,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    DeleteMenuApp(menuApp: MenuApp): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/DeleteApp`,
                menuApp,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    // AppUsage
    CreateAppUsage(appUsage: AppUsage): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/CreateAppUsage`,
                appUsage,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllAppUsage(): Observable<AppUsageView[] | string> {
        return this._httpClient
            .get<AppUsageView[]>(
                `${this.baseAddress}api/Master/GetAllAppUsages`
            )
            .pipe(catchError(this.errorHandler));
    }

    GetBuyerPlant(UserID: any): Observable<any> {
        return this._httpClient
            .get(
                `${this.baseAddress}api/Master/GetBuyerPlant?UserID=${UserID}`, {
                responseType: 'text'
            }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAppUsagesByUser(UserID: any): Observable<AppUsageView[] | string> {
        return this._httpClient
            .get<AppUsageView[]>(
                `${this.baseAddress}api/Master/GetAppUsagesByUser?UserID=${UserID}`
            )
            .pipe(catchError(this.errorHandler));
    }

    // Reason
    CreateReason(reason: Reason): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/CreateReason`,
                reason,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllReasons(): Observable<Reason[] | string> {
        return this._httpClient
            .get<Reason[]>(
                `${this.baseAddress}api/Master/GetAllReasons`
            )
            .pipe(catchError(this.errorHandler));
    }

    UpdateReason(reason: Reason): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/UpdateReason`,
                reason,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    DeleteReason(reason: Reason): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/DeleteReason`,
                reason,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    // Role
    CreateRole(role: RoleWithApp): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/CreateRole`,
                role,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllRoles(): Observable<RoleWithApp[] | string> {
        return this._httpClient
            .get<RoleWithApp[]>(
                `${this.baseAddress}api/Master/GetAllRoles`
            )
            .pipe(catchError(this.errorHandler));
    }
    GetAllPlants(): Observable<Plant[] | string> {
        return this._httpClient
            .get<Plant[]>(
                `${this.baseAddress}api/Master/GetAllPlants`
            )
            .pipe(catchError(this.errorHandler));
    }

    UpdateRole(role: RoleWithApp): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/UpdateRole`,
                role,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    DeleteRole(role: RoleWithApp): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/DeleteRole`,
                role,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    // Users

    CreateUser1(user: UserWithRole, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append("uploadFile", file, file.name);
        formData.append("userName", user.userName);

        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/CreateUser1`,
                formData
                // {
                //   headers: new HttpHeaders({
                //     'Content-Type': 'application/json'
                //   })
                // }
            )
            .pipe(catchError(this.errorHandler));
    }

    CreateUser(user: UserWithRole): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/CreateUser`,
                user
                // {
                //   headers: new HttpHeaders({
                //     'Content-Type': 'application/json'
                //   })
                // }
            )
            .pipe(catchError(this.errorHandler));
    }
    CreateVendorUser(vendorUser: VendorUser): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/CreateVendorUser`,
                vendorUser
                // {
                //   headers: new HttpHeaders({
                //     'Content-Type': 'application/json'
                //   })
                // }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllUsers(): Observable<UserWithRole[] | string> {
        return this._httpClient
            .get<UserWithRole[]>(
                `${this.baseAddress}api/Master/GetAllUsers`
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllDevelopers(): Observable<UserView[] | string> {
        return this._httpClient
            .get<UserView[]>(
                `${this.baseAddress}api/Master/GetAllDevelopers`
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllDevelopersAndTLs(): Observable<UserView[] | string> {
        return this._httpClient
            .get<UserView[]>(
                `${this.baseAddress}api/Master/GetAllDevelopersAndTLs`
            )
            .pipe(catchError(this.errorHandler));
    }

    UpdateUser(user: UserWithRole): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/UpdateUser`,
                user
                // {
                //   headers: new HttpHeaders({
                //     'Content-Type': 'application/json'
                //   })
                // }
            )
            .pipe(catchError(this.errorHandler));
    }

    DeleteUser(user: any): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/DeleteUser`,
                user,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllNotificationByUserID(
        UserID: string
    ): Observable<UserNotification[] | string> {
        return this._httpClient
            .get<UserNotification[]>(
                `${this.baseAddress}api/Notification/GetAllNotificationByUserID?UserID=${UserID}`
            )
            .pipe(catchError(this.errorHandler));
    }

    UpdateNotification(
        SelectedNotification: UserNotification
    ): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Notification/UpdateNotification`,
                SelectedNotification,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetSupportDeskUsersByRoleName(
        RoleName: string
    ): Observable<UserWithRole[] | string> {
        return this._httpClient
            .get<UserWithRole[]>(
                `${this.baseAddress}api/Master/GetSupportDeskUsersByRoleName?RoleName=${RoleName}`
            )
            .pipe(catchError(this.errorHandler));
    }
    // UserPreferences
    CreateUserPreference(role: UserPreference): Observable<any> {
        return this._httpClient.post<any>(
            `${this.baseAddress}api/Master/SetUserPreference`,
            role,
            {
                headers: new HttpHeaders({
                    "Content-Type": "application/json",
                }),
            }
        );
    }

    GetUserPreferenceByUserID(
        UserID: any
    ): Observable<UserPreference | string> {
        return this._httpClient
            .get<UserPreference>(
                `${this.baseAddress}api/Master/GetUserPreferenceByUserID?UserID=${UserID}`
            )
            .pipe(catchError(this.errorHandler));
    }

    UpdateUserPreference(role: UserPreference): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/SetUserPreference`,
                role,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetSessionMasterByProject(
        ProjectName: string
    ): Observable<SessionMaster | string> {
        return this._httpClient
            .get<SessionMaster>(
                `${this.baseAddress}api/Master/GetSessionMasterByProject?ProjectName=${ProjectName}`
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllSessionMasters(): Observable<SessionMaster[] | string> {
        return this._httpClient
            .get<SessionMaster[]>(
                `${this.baseAddress}api/Master/GetAllSessionMasters`
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllSessionMastersByProject(
        ProjectName: string
    ): Observable<SessionMaster[] | string> {
        return this._httpClient
            .get<SessionMaster[]>(
                `${this.baseAddress}api/Master/GetAllSessionMastersByProject?ProjectName=${ProjectName}`
            )
            .pipe(catchError(this.errorHandler));
    }

    CreateSessionMaster(sessionMaster: SessionMaster): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/CreateSessionMaster`,
                sessionMaster,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    UpdateSessionMaster(sessionMaster: SessionMaster): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/UpdateSessionMaster`,
                sessionMaster,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    DeleteSessionMaster(sessionMaster: SessionMaster): Observable<any> {
        return this._httpClient
            .post<any>(
                `${this.baseAddress}api/Master/DeleteSessionMaster`,
                sessionMaster,
                {
                    headers: new HttpHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            )
            .pipe(catchError(this.errorHandler));
    }

    GetAllUsersLoginHistory(): Observable<UserLoginHistory[] | string> {
        return this._httpClient
            .get<UserLoginHistory[]>(
                `${this.baseAddress}api/Master/GetAllUsersLoginHistory`
            )
            .pipe(catchError(this.errorHandler));
    }

    FilterLoginHistory(
        UserName: string,
        FromDate: string,
        ToDate: string
    ): Observable<UserLoginHistory[] | string> {
        return this._httpClient
            .get<UserLoginHistory[]>(
                `${this.baseAddress}api/Master/FilterLoginHistory?UserName=${UserName}&FromDate=${FromDate}&ToDate=${ToDate}`
            )
            .pipe(catchError(this.errorHandler));
    }

    GetCurrentUserLoginHistory(
        UserID: any
    ): Observable<UserLoginHistory[] | string> {
        return this._httpClient
            .get<UserLoginHistory[]>(
                `${this.baseAddress}api/Master/GetCurrentUserLoginHistory?UserID=${UserID}`
            )
            .pipe(catchError(this.errorHandler));
    }

    FilterLoginHistoryByUser(
        UserName: string,
        FromDate: string,
        ToDate: string
    ): Observable<UserLoginHistory[] | string> {
        return this._httpClient
            .get<UserLoginHistory[]>(
                `${this.baseAddress}api/Master/FilterLoginHistory?UserName=${UserName}&FromDate=${FromDate}&ToDate=${ToDate}`
            )
            .pipe(catchError(this.errorHandler));
    }
}
