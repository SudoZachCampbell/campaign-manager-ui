import { Button } from 'components/Button/Button';
import { FileUpload } from 'components/inputs/FileUpload';
import { useState } from 'react';
import './MapAdder.styles.scss';

export const MapAdder = () => {
  const [file, setFile] = useState<File | undefined>();

  const handleUpload = async () => {};

  return (
    <div className="mapadder__container">
      <FileUpload
        file={file}
        label="Upload Map"
        handleFileChange={(event) => setFile(event.target.files?.[0])}
      />
      <Button onClick={handleUpload}>Upload a file</Button>
    </div>
  );
};
