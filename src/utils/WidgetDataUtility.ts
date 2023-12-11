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
  imagingMethod: string,
  authorName: string,
  authorEmail: string,
  publishedDate: string
}

export type SavedWorkFLowItem = {
  id: number,
  entryid: string,
  title:string,
  imagingMethod: string,
  authorName: string,
  authorEmail: string,
  savedDate: string
}

export type TemplateWorkFLowItem = {
  id: number,
  entryid: string,
  title:string,
  imagingMethod: string,
  authorName: string,
  authorEmail: string,
  studyDescription: string,
  biologicalEntity: string
}