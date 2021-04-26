import axios from 'axios';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  CircularProgress,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: '1rem',
  },
  input: {
    display: 'none',
  },
  pdf: {
    margin: '2rem auto',
  },
}));

const DocumentUpload = ({ file, setFile }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [numPages, setNumPages] = useState(null);
  // eslint-disable-next-line
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onChange = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('document', e.target.files[0]);
    const { data } = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setLoading(false);
    setFile(data.file);
  };

  return (
    <>
      <Grid item lg={12} sm={12} xs={12} className={classes.text}>
        <Typography variant="h4">Document Upload</Typography>
        <Typography variant="h7" gutterBottom color="secondary">
          Upload document for identification like Aadhar card, Passport or Pan
          card. Only PDF files allowed.
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xs={12}>
        <input
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={onChange}
          accept=".pdf"
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Required Document
          </Button>
        </label>
        {file && (
          <Document
            className={classes.pdf}
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        )}
      </Grid>
      {loading && (
        <div style={{ height: '50px', width: '50px', margin: '2rem auto' }}>
          <CircularProgress
            style={{ height: '100%', width: '100%' }}
            color="secondary"
          />
        </div>
      )}
    </>
  );
};

export default DocumentUpload;
