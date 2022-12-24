import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineImageSearch } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";

interface UploadImageProps {
  pictures: File[];
  addPicture: (pictures: File[]) => void;
  deletePicture: (url: string) => void;
}

export function UploadImage({
  pictures,
  addPicture,
  deletePicture,
}: UploadImageProps) {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setLoading(true);

    addPicture(acceptedFiles);

    setLoading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "image/*": [] },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="w-full h-44 p-5 bg-slate-200 rounded-md flex flex-col justify-center items-center text-center"
      >
        <input {...getInputProps()} />
        {loading ? (
          <div className="w-8 h-8 rounded-full border-4 border-t-primary animate-spin" />
        ) : (
          <>
            <MdOutlineImageSearch className="w-20 h-20 text-primary" />
            <span className="text-slate-700 font-medium">
              Drag and drop picture here, or click to select picture
            </span>
          </>
        )}
      </div>

      <div className="mt-2 overflow-auto">
        <div
          className="flex gap-4"
          style={{ width: `${pictures.length * 12}rem` }}
        >
          {pictures.length > 0 &&
            pictures.map((picture, index) => (
              <div
                key={index}
                className="relative w-44 h-44 border-2 border-slate-400 rounded-md flex justify-center items-center overflow-hidden"
              >
                <RiCloseCircleFill
                  className="w-9 h-9 md:w-5 md:h-5 hover:opacity-50 cursor-pointer absolute top-2 right-2 text-white"
                  onClick={() => deletePicture(picture.name)}
                />
                <img
                  src={URL.createObjectURL(picture)}
                  className="w-48 h-48 rounded-md object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
