import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { Container, Typography, Button, Box, Paper, TextField, Input, Grid } from '@mui/material';
import { CloudUpload, TextFields, Mic, ContentCopy } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Adiiototext = () => {
    const [texttocopy, setTextToCopy] = useState('');
    const [isCopied, setCopied] = useClipboard(texttocopy, { successDuration: 2000 });
    const [fileName, setFileName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const speach = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    };

    if (!browserSupportsSpeechRecognition) {
        return <Typography color="error">Browser does not support speech recognition.</Typography>;
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleCopyText = () => {
        setTextToCopy(transcript); // Set the text to be copied
        setCopied(); // Call to copy the text
    };
    const handleupload=()=>{
  
        setShowAlert(true); // Set state to show the alert
    }

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
           
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: 700,
                }}
            >
                  {showAlert && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">
                       Right Now this is not working
                    </Alert>
                </Stack>
            )}
                <Typography variant="h4" gutterBottom>
                    Audio to Text Converter
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Convert your audio files to text effortlessly.
                </Typography>

                {/* Audio Upload Section */}
                <Box sx={{ marginY: 2 }}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item>
                            <label htmlFor="upload-audio">
                                {/* <Input
                                    accept="audio/*"
                                    id="upload-audio"
                                    type="file"
                                    onChange={handleFileUpload}
                                    sx={{ display: 'none' }}
                                /> */}
                                <Button
                                    component="span"
                                    variant="contained"
                                    startIcon={<CloudUpload />}
                                    onClick={handleupload}
                                    sx={{ borderRadius: 25, paddingX: 3 }}
                                    color="primary"
                                >
                                    Upload Audio
                                </Button>
                            </label>
                        </Grid>
                        {fileName && (
                            <Grid item>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{
                                        maxWidth: 200,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {fileName}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>

                <Box sx={{ my: 3 }} />

                {/* Additional Buttons */}
                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ marginY: 2 }}>
                    <Grid item sx={4} >
                        <Button
                            variant="contained"
                            startIcon={<Mic />}
                            onClick={speach}
                            sx={{ borderRadius: 25, paddingX: 3 }}
                            color="success"
                        >
                            Start Listening
                        </Button>
                    </Grid>
                    <Grid item  sx={4}>
                        <Button
                            variant="contained"
                            startIcon={<ContentCopy />}
                            onClick={handleCopyText} // Use the new function
                            sx={{ borderRadius: 25, paddingX: 3 }}
                            color="info"
                        >
                            {isCopied ? "Copied" : "Copy to clipboard"}
                        </Button>
                    </Grid>
                    <Grid item sx={4}>
                        <Button
                            variant="contained"
                            startIcon={<TextFields />}
                            onClick={SpeechRecognition.stopListening}
                            sx={{ borderRadius: 25, paddingX: 3, marginY: 2 }}
                            color="secondary"
                        >
                            Stop Listening
                        </Button>
                    </Grid>
                </Grid>

                {/* Transcribed Text */}
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="body1" gutterBottom>
                        Transcribed Text:
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        variant="outlined"
                        value={transcript}
                        sx={{
                            backgroundColor: '#f9f9f9',
                            borderRadius: 1,
                        }}
                        disabled
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default Adiiototext;
