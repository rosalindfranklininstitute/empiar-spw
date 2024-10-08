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

export interface IAnnotation extends mongoose.Document {
  user: userDetails;
  metadata: metaDataDetails;
  data:any,
  entryid:string,
  is_curated:{type: Number, required: false},
  is_approved:{type: Number, required: false},
  is_approval_requested:{type: Number, required: false},
  status:{type: string, required: false},
}

export const AnnotationSchema = new mongoose.Schema({
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
  entryid:{type: String, required: true},
  is_curated:{type: Number, required: false},
  is_approved:{type: Number, required: false},
  is_approval_requested:{type: Number, required: false},
  status:{type: String, required: false},
});

const Annotation = mongoose.model<IAnnotation>("Annotation", AnnotationSchema);
export default Annotation;