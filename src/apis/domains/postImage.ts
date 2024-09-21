import { Scheme } from "@/apis";

export type PostImageType = "THUMB_NAIL";

export interface PostImage extends Scheme {
  type: PostImageType;
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface CreatePostImageRequest {
  type: PostImageType;
  name: string;
  url: string;
  width?: number;
  height?: number;
}
