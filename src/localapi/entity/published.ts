import * as mongoose from "mongoose";
import configData from "../../static/config.json"  assert { type: "json" };

const uri: string = configData.MONGO.CONNECTION_STRING + configData.MONGO.DB_NAME;

mongoose.connect(uri);

type userDetails = {
    name:string,
    email:string
}

type metaDataDetails = {
    name:string,
    imagingmethod:string,
    studydescription:string,
    biologicalentity:string
}

export interface IPublished extends mongoose.Document {
  user: userDetails;
  metadata: metaDataDetails;
  data:any,
  entryid:string
}

export const PublishedSchema = new mongoose.Schema({
  user:{
    name:{type: String, required: true},
    email:{type: String, required: true}
  },
  metadata:{
    name:{type: String, required: true},
    imagingmethod:{type: String},
    studydescription:{type: String},
    biologicalentity:{type: String}
  },
  data: {type:mongoose.Schema.Types.Mixed},
  entryid:{type: String, required: true}
});

const Published = mongoose.model<IPublished>("Published", PublishedSchema);
export default Published;