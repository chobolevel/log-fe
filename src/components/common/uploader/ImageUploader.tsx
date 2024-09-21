import { Input } from "@chakra-ui/react";
import { useCreatePresignedUrl } from "@/apis";

interface ImageUploaderProps {
  inputRef: React.RefObject<HTMLInputElement>;
  onUpload: (url: string, filename: string) => void;
}

const ImageUploader = ({ inputRef, onUpload }: ImageUploaderProps) => {
  const { mutate: createPresignedUrl } = useCreatePresignedUrl();
  return (
    <Input
      type={"file"}
      ref={inputRef}
      accept={"image/*"}
      multiple={false}
      hidden={true}
      onChange={(e) => {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (!file) return;
        const lastDotIdx = file.name.lastIndexOf(".");
        const filename = file.name.substring(0, lastDotIdx);
        const extension = file.name.substring(lastDotIdx + 1);
        createPresignedUrl(
          {
            prefix: "image",
            filename,
            extension,
          },
          {
            onSuccess: (res) => {
              fetch(res.data.url, {
                method: "PUT",
                body: file,
                headers: {
                  "Content-Type": extension,
                },
              }).then(() => {
                onUpload(res.data.url, res.data.filename_with_extension);
              });
            },
          },
        );
      }}
    />
  );
};

export default ImageUploader;
