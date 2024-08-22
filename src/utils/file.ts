import {ImageScheme, ImageType, Presigned, Scheme} from "@/apis";

export const presignedToImageParams = (
  presigned: Presigned,
  imageType: ImageType,
  order: number,
  width: number,
  height: number,
): Omit<ImageScheme, keyof Scheme> => {
  return {
    key: `${presigned.key}/${presigned.filename}`,
    origin_url: `${presigned.cf_host}/${presigned.key}/${presigned.filename}`,
    image_type: imageType,
    order,
    width,
    height,
  };
};

export const encodeFileToBase64 = (image: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event: ProgressEvent<FileReader>) =>
      resolve(event.target?.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const encodeJsonToBase64 = (json: any) => {
  return btoa(encodeURIComponent(JSON.stringify(json)));
};

export const decodeBase64ToJson = (base64: string) => {
  return JSON.parse(decodeURIComponent(atob(base64)));
};
