'use client'
import { Box, Button, Card, Divider, FormControl, FormLabel, Input, Stack, Textarea, Typography, styled } from '@mui/joy'
import React, { useState } from 'react'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { useForm, Controller, useController } from 'react-hook-form';

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
    const { control, handleSubmit, register } = useForm();
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');

    const onSubmit = data => {
        console.log(data);
    }

    const handleFileChange = (event) => {
        setFileName(event.target.files[0].name);
        setFile(event.target.value);
        setImage(URL.createObjectURL(event.target.files[0]));
        console.log("Image url", URL.createObjectURL(event.target.files[0]))
    }

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
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Name of the Artwork" />}
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
                                    startDecorator={<FileUploadRoundedIcon />}
                                >
                                    Upload a file
                                    <Controller
                                        name="file"
                                        control={control}
                                        defaultValue={null}
                                        render={({ field }) => <VisuallyHiddenInput {...field} value={file} type="file" onChange={(event) => { field.onChange(event.target.files); handleFileChange(event); }} />}
                                    />
                                </Button>
                                <Box
                                // center the contents of the box 
                                sx={{ mt: 2, display: 'flex', justifyContent: 'center',alignItems: 'center', flexDirection: 'column' }}
                                >
                                    {image && <img src={image} alt="uploaded" width="30%" height="30%" />}
                                    {fileName && <Typography variant="body2">{fileName}</Typography>}
                                </Box>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Textarea {...field} color="neutral" minRows={3} size="md" variant="soft" placeholder="Description of the Artwork" />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Category</FormLabel>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Category of the Artwork" />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Tags</FormLabel>
                                <Controller
                                    name="tags"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Tags for the Artwork" />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Controller
                                    name="price"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Price of the Artwork" />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Dimensions</FormLabel>
                                <Controller
                                    name="dimensions"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Dimensions of the Artwork" />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Medium</FormLabel>
                                <Controller
                                    name="medium"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Medium of the Artwork" />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date Created</FormLabel>
                                <Controller
                                    name="dateCreated"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="Date Created of the Artwork" />}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>In Stock</FormLabel>
                                <Controller
                                    name="inStock"
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => <Input {...field} color='neutral' variant='soft' placeholder="In Stock of the Artwork" />}
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
