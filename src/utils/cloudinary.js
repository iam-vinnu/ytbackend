import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv"
import fs from "fs";
dotenv.config({});


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_SECRET_KEY
});


const uploadOnCloud = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });
        // upload the files to the cloudinary
        console.log("File is Uploaded");

        return res ;
        
    } catch (error) {

        fs.unlinkSync(localFilePath);
        // remove the locally saved temperary files as the upload operation got failed
        return null;

    }
}