import './Field.styles.scss';

interface FileUploadProps {
  file?: File;
  label?: string;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload = ({
  file,
  label = '',
  handleFileChange,
}: FileUploadProps) => {
  return (
    <div>
      <div>
        <label htmlFor="file">{label}</label>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
        />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size / 1000}KB</li>
          </ul>
        </section>
      )}
    </div>
  );
};
