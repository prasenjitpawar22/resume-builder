export type Header = {
    _id: string | undefined,
    fullname: string | undefined,
    contact: string | undefined,
    linkedin: string | undefined,
    github: string | undefined,
    websit: string | undefined,
} | undefined

export type Education = {
    _id: string | undefined,
    university: string | undefined,
    location: string|undefined,
    start: string | undefined,
    end: string | undefined
}
export type Experience = {
    _id: string | undefined,
    position: string | undefined,
    company: string | undefined,
    start: string | undefined,
    end: string | undefined,
    "desc": string[] | null
}
export type Skill = {
    _id: string | undefined,
    data: string[] | undefined
} | undefined

export type Data = {
    header: Header[],
    education: Education[],
    experience: Experience[],
    skill: Skill[] | undefined,
}
