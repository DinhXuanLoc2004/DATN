type status = 200 | 201 | 203 | 401 | 400 | 403 | 404 | 409

export interface Response {
    message: string,
    status: status,
    metadata: any
}