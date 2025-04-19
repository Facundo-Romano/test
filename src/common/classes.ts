export class BaseResponse<T> {
    success: true | false;
    data: T;
} 