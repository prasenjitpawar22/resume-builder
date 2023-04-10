export interface IHeader {
    id: string | undefined;
    fullname: string | undefined;
    contact: string | undefined;
    bio: string | undefined
    website: string | undefined;
    github: string | undefined;
    linkedin: string | undefined;
}

export interface IResumeHeader extends IHeader {
    featureHeaderId: string | undefined
}

export interface IEducation {
    id: string | undefined;
    end: string | undefined
    location: string | undefined
    start: string | undefined
    university: string | undefined
    current: boolean | undefined
}

export interface IResumeEducation extends IEducation {
    featureEducationId: string | undefined
}

export interface ISkill {
    id: string | undefined;
    data: string[] | undefined;
}

export interface IResumeSkill extends ISkill {
    featureSkillId: string | undefined
}

export interface IExperience {
    id: string | undefined
    end: string | undefined,
    company: string | undefined,
    start: string | undefined,
    description: string[] | undefined,
    position: string | undefined,
    current: boolean | undefined
}

export interface IResumeExperience extends IExperience {
    featureExperienceId: string | undefined
}



//------------------------------------
export enum FormsTypes {
    contact = 'contact',
    experience = 'experience',
    education = 'education',
    skill = 'skill',
    certifications = 'certifications',
    buildup = 'buildup',
    summary = 'summary',
    project = 'project',
}

export interface Contact {
    id: String
    show: Boolean
    userId: String
    fullname: string,
    email: string
    phone: string
    linkedin: string
    website: string
    country: string
    state: string
    city: string
}

export interface Education {
    id: String
    show: Boolean
    userId: String
    degree: string
    university: string
    location: string
    year: Date | undefined
    minor: string
    gpa: string
}

export interface Skills {
    id: String
    show: Boolean
    skill: string
    userId: String
}

export interface Certification {
    id: String
    show: Boolean
    userId: String
    name: string
    location: string
    year: Date | undefined
    helpful: string
}

export interface Experience {
    id: String
    show: Boolean
    userId: String
    role: string
    company: string
    startYear: Date | undefined
    endYear: Date | undefined
    present: Boolean
    location: string
    achivements: string
}

export interface Summary {
    summary: string
    id: String
    userId: String
    show: Boolean
}