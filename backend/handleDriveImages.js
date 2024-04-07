const fs = require('fs');
const { google } = require('googleapis');

const KEYFILEPATH = 'auth.json';

//define authorization
const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: 'https://www.googleapis.com/auth/drive',
});

const drive = google.drive({ version: 'v3', auth });
const folderId = ['1vf2OJkrwuFni13KfOOR4o_ZdfehqLePF'];

//get file name curently used
function getFileName(data){
    return data.name.toLowerCase() + data.surname.toLowerCase() + data.imgNum + '.jpg';
}

//function to upload to google drive using service account
async function uploadToDrive(data){

    const fileName = getFileName(data)
    //selecting media type and converting to non 64 bit

    if(!data.img) return;

    //create convertable file
    const image = Buffer.from(data.img.split('base64,')[1], 'base64');

    fs.writeFileSync(fileName, image);

    const media = {
        mimeType: 'image/jpeg', // Assuming the image data is in JPEG format
        body: fs.createReadStream(fileName),
        // Decode base64 data
    };
    
    //making sure that a duplicate doesnt exist so we delete from disk before
    await deleteFromDrive(data);
    
    //selecting correct name and folder
    const fileMetaData = {
        'name': fileName,
        'parents': folderId,
    };

    try {

        //creating image in the disk
        const response = await drive.files.create({
            requestBody: fileMetaData,
            media: media,
            fields: 'id'
        });

        //making sure the fle data is correct
        console.log(`File '${fileName}' uploaded successfully with ID: ${response.data.id}`);
        fs.unlinkSync(fileName);
        return response.data.id;
    } catch (err) {
        console.error('Error uploading file:', err);
        return null;
    }
}


//function to delete images from the service account
async function deleteFromDrive(data){
    try {
        //get file id
        const fileId = await retrieveFileId(data);

        if(!fileId) return;

        //delete file from drive
        await drive.files.delete({
            fileId: fileId
        });
        console.log(`succesfully deleted image ${getFileName(data)}`)
    } catch (err) {
        console.error('Error deleting file:', err);
        throw err;
    }
}

//function to retrieve file by picture name
async function retrieveFileId(data){
    try {
        //get the file name
        const fileName = getFileName(data);
        //list of images with that name
        const response = await drive.files.list({
            q: `'${folderId}' in parents and name='${fileName}' and trashed=false`, // Query for files with the specified name and not trashed
            fields: 'files(id, name)' // Specify fields to retrieve only file ID and name
        });

        const files = response.data.files;

        //return the first image
        if (files.length > 0) {
            console.log(`File '${fileName}' found with ID: ${files[0].id}`);
            return files[0].id;
        } else {
            console.log(`File '${fileName}' not found in Google Drive.`);
            return null;
        }
    } catch (err) {
        console.error('Error retrieving files:', err);
        return null;
    }
}

module.exports = {uploadToDrive, deleteFromDrive, retrieveFileId};