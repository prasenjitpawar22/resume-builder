export type Header = {
    'id': string | undefined,
    'fullName': string | undefined,
    'contact': string | undefined,
    'linkedIn': string | undefined,
    'github': string | undefined,
    'websit': string | undefined,
} | undefined

export type Education = {
    'id': string | undefined,
    'university': string | undefined,
    'start': string | undefined,
    'end': string | undefined
}
export type Experience = {
    'id': string | undefined,
    'position': string | undefined,
    'company': string | undefined,
    'start': string | undefined,
    'end': string | undefined,
    "desc": string[] | null
}

export type Data = {
    'header': Header[],
    'education': Education[],
    'experience': Experience[]
}
