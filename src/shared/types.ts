export interface PhotosRequest {
    page: number;
}

export interface PhotoInfo {
    url: string;
}

export interface PhotosResponse {
    photos: PhotoInfo[];
}
