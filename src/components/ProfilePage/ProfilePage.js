'use client'
import { Box, Button, Card, Divider, FormControl, FormLabel, Input, Stack, Textarea, Typography, styled } from '@mui/joy'
import React, { useState } from 'react'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useForm, Controller, useController } from 'react-hook-form';
import { convertToWebP, uploadToFireBase } from '@/utils/utilFunctions';
import CircularProgress from '@mui/joy/CircularProgress';
import Image from 'next/image';
import { toast } from 'sonner';

// npm install -S react-advanced-cropper

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

function ProfilePage({ user }) {
    const { control, handleSubmit, register, reset } = useForm();
    const [fileNames, setFileNames] = useState([]);
    const [images, setImages] = useState([]);
    const [totalFiles, setTotalFiles] = useState(0);
    const [completedFiles, setCompletedFiles] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fileDimensions, setFileDimensions] = useState([{ height: 0, width: 0 }]);

    const onSubmit = async (data) => {
        if (data.file) {
            const files = Object.values(data.file); // Convert data.file object into an array
            await Promise.all(files.map(async (file, index) => {
                const url = await uploadToFireBase(file);
                data.firebaseUrls = data.firebaseUrls || [];
                data.firebaseUrls.push({url: url, name: fileNames[index], width: fileDimensions[index].width, height: fileDimensions[index].height});
            }));

            // delete file key:value pair from data
            delete data.file;
            console.log(data);
            try {
                const response = await fetch('/api/artUpload', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    console.log('Artwork has been created. ');
                    toast.success('Artwork has been created. ');
                    // Clear the form
                    reset();
                }
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong. Please try again. ');
            }
        }
        console.log(data);


    }

    const handleFileChange = async (event) => {
        const rawFiles = Array.from(event.target.files);
        const totalFiles = rawFiles.length;
        setTotalFiles(totalFiles);
        let completedFiles = 0;
      
        const handleProgress = () => {
          setTotalFiles(totalFiles);
          setCompletedFiles(completedFiles);
          const progress = Math.floor((completedFiles / totalFiles) * 100);
          setProgress(progress);
        };
      
        // Convert each file to webP and update progress after each conversion
        const convertedFiles = await Promise.all(rawFiles.map(async (file) => {
          const { width, height, blob } = await convertToWebP(file);
          completedFiles++;
          handleProgress();
          return { width, height, blob, name: file.name };
        }));
      
        console.log("files ", convertedFiles);
        setFileNames(convertedFiles.map(file => file.name));
        setImages(convertedFiles.map(file => URL.createObjectURL(file.blob))); // Create URLs for all files
      
        // Store the height and width of each file in the fileDimensions state
        const dimensions = convertedFiles.map(file => ({ name: file.name, width: file.width, height: file.height }));
        setFileDimensions(dimensions);
      };

      console.log("fileDimensions ", fileDimensions);

    // const handleFileChange = async (event) => {
    //     const rawFiles = Array.from(event.target.files);
    //     const totalFiles = rawFiles.length;
    //     setTotalFiles(totalFiles);
    //     let completedFiles = 0;

    //     const handleProgress = () => {
    //         setTotalFiles(totalFiles);
    //         setCompletedFiles(completedFiles);
    //         const progress = Math.floor((completedFiles / totalFiles) * 100);
    //         setProgress(progress);
    //     };

    //     // Convert each file to webP and update progress after each conversion
    //     const files = await Promise.all(rawFiles.map(async (file) => {
    //         const convertedFile = await convertToWebP(file);
    //         completedFiles++;
    //         handleProgress();
    //         return convertedFile;
    //     }));

    //     console.log("files ", files);
    //     setFileNames(files.map(file => file.name));
    //     setImages(files.map(file => URL.createObjectURL(file))); // Create URLs for all files
    // };

    return (
        <div>
            <Typography level='title-lg' >Hey, {user.name}</Typography>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Card>
                    <Typography level='title-md'>
                        Upload Artwork
                    </Typography>
                    <Divider />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Name of the Artwork" value={field.value || ""} />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Upload your Artwork</FormLabel>
                                <Button
                                    component="label"
                                    role={undefined}
                                    tabIndex={-1}
                                    variant="outlined"
                                    color="neutral"
                                    startDecorator={
                                        totalFiles > 0
                                            ? <CircularProgress
                                                sx={{ "--CircularProgress-trackThickness": "6px", "--CircularProgress-progressThickness": "4px" }}
                                                size="md"
                                                determinate
                                                value={progress}
                                            >
                                                {completedFiles} / {totalFiles}
                                            </CircularProgress>
                                            : <FileUploadRoundedIcon />}

                                >
                                    Upload a file
                                    <Controller
                                        name="file"
                                        control={control}
                                        defaultValue={null}
                                        render={({ field: { value, ...field } }) => <VisuallyHiddenInput {...field} type="file" multiple accept="image/*" onChange={(event) => { field.onChange(event.target.files); handleFileChange(event); }} />}
                                    />
                                </Button>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                                    {images.map((url, index) => (
                                        <span key={`${fileNames[index]}-${index}`}>
                                            <Image src={url} width={100} height={100 * fileDimensions[index].height / fileDimensions[index].width} style={{  width: 'auto' }} sizes="(max-width: 768px) 100vw" alt={fileNames[index]} />
                                            <Typography level="body-xs">{fileNames[index].length > 20 ? `${fileNames[index].substring(0, 17)}...` : fileNames[index]}</Typography>
                                        </span>
                                    ))}
                                </div>

                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Textarea {...field} color="neutral" minRows={3} size="md" variant="soft" placeholder="Description of the Artwork" value={field.value || ""} />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Category of the Artwork" value={field.value || ""} />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Tags</FormLabel>
                                <Controller
                                    name="tags"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Tags for the Artwork" value={field.value || ""} />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Controller
                                    name="price"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Price of the Artwork" value={field.value || ""} />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Dimensions</FormLabel>
                                <Controller
                                    name="dimensions"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Dimensions of the Artwork" value={field.value || ""} />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Medium</FormLabel>
                                <Controller
                                    name="medium"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Medium of the Artwork" value={field.value || ""} />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date Created</FormLabel>
                                <Controller
                                    name="dateCreated"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Date Created of the Artwork" value={field.value || ""} />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>In Stock</FormLabel>
                                <Controller
                                    name="inStock"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="In Stock of the Artwork" value={field.value || ""} />}
                                />
                            </FormControl>
                            <Button type="submit">Submit</Button>
                        </Stack>
                    </form>
                </Card>
            </Box>
        </div >
    )
}

export default ProfilePage
