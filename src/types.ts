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
    fullname: string,
    emailaddress: string
    phone: string
    linkedinurl: string
    personalwebsite: string
    country: string
    state: string
    city: string
}

export interface Education {
    degree: string
    university: string
    location: string
    year: Date | undefined
    minor: string
    gpa: string
}

export interface Skills {
    skill: string
}

export interface Certification {
    name: string
    location: string
    year: Date | undefined
    helpful: string
}

export interface Experience {
    role: string
    company: string
    yearStart: Date | undefined
    yearEnd: Date | undefined
    present: Boolean
    location: string
    achivements: string
}

export interface Summary {
    summary: string
}