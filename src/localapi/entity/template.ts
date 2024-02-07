import * as mongoose from "mongoose";

const uri: string = "mongodb://127.0.0.1:27017/admin"

mongoose.connect(uri);

type userDetails = {
    name: string,
    email: string
}

type metaDataDetails = {
    name: string,
    imagingmethod: string,
    studydescription: string,
    biologicalentity: string
}

export interface ITemplate extends mongoose.Document {
    user: userDetails;
    metadata: metaDataDetails;
    data: any,
    entryid: string
}

export const TemplateSchema = new mongoose.Schema({
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true }
    },
    metadata: {
        name: { type: String, required: true },
        imagingmethod: { type: String },
        studydescription: { type: String },
        biologicalentity: { type: String }
    },
    data: { type: mongoose.Schema.Types.Mixed },
    entryid: { type: String, required: true }
});

const Template = mongoose.model<ITemplate>("Template", TemplateSchema);
export default Template;