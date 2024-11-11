export interface CreateRecordDTO {
    company?: string;
    campaign?: string;
    description?: string;
    plannedDate?: string;
    where?: string;
    language?: string;
    languageColor?: string;
    content?: string;
    imageFile?: ImageFile;
    imageContent?: string;
  }

  export interface UpdateRecordDTO {
    company: string;
    campaign?: string;
    description?: string;
    plannedDate?: string;
    where?: string;
    language?: string;
    imageFile?: ImageFile;
    imageContent?: string;
  }

  export interface ImageFile {
    url?: string;
    name?: string;
  }