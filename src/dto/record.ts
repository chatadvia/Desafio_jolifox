export interface CreateRecordDTO {
    title: string;
    campaign?: string;
    description?: string;
    plannedDate?: string;
    where?: string;
    language?: string;
    imageFile?: any;
    imageContent?: string;
  }

  export interface UpdateRecordDTO {
    title: string;
    campaign?: string;
    description?: string;
    plannedDate?: string;
    where?: string;
    language?: string;
    imageFile?: any;
    imageContent?: string;
  }