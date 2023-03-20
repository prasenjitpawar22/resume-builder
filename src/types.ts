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