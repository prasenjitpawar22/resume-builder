export type Header = {
    id: string | undefined,
    fullname: string | undefined,
    contact: string | undefined,
    linkedin: string | undefined,
    github: string | undefined,
    websit: string | undefined,
} | undefined

export type Education = {
    id: string | undefined,
    university: string | undefined,
    start: string | undefined,
    end: string | undefined
}
export type Experience = {
    id: string | undefined,
    position: string | undefined,
    company: string | undefined,
    start: string | undefined,
    end: string | undefined,
    "desc": string[] | null
}
export type Skill = {
    id: string | undefined,
    data: string[] | undefined
} | undefined

export type Data = {
    header: Header[],
    education: Education[],
    experience: Experience[],
    skill: Skill[] | undefined,
}
