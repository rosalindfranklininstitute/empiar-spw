export type ListItemReferenceProps = {
    id: string,
    stepKey: string,
    stepTitle: string,
    orderNumber: number,
    stepData?: any,
  }


export type PublisedWorkFLowItem = {
  id: number,
  entryid: string,
  title:string,
  imagingmethod: string,
  authorname: string,
  authoremail: string,
  publisheddate: string
}

export type SavedWorkFLowItem = {
  id: number,
  entryid: string,
  title:string,
  imagingmethod: string,
  authorname: string,
  authoremail: string,
  saveddate: string,
  status:string
}

export type ApproveWorkFLowItem = {
  id: number,
  entryid: string,
  title:string,
  authorname: string,
  authoremail: string,
  saveddate: string
}

export type AnnotationWorkFLowItem = {
  id: number,
  entryid: string,
  title:string,
  imagingmethod: string,
  authorname: string,
  authoremail: string,
  saveddate: string
}

export type EntriesToReleaseItem = {
  id: number,
  entryid: string,
  title:string,
  imagingmethod: string,
  authorname: string,
  authoremail: string,
  saveddate: string
}

export type TemplateWorkFlowItem = {
  id: number,
  entryid: string,
  title:string,
  imagingmethod: string,
  authorname: string,
  authoremail: string,
  studydescription: string,
  biologicalentity: string
}