export type TypeInfo = {
    id: string | undefined,
    name: string,
    description: string,
    author: string
}

export type TypeLayout = {

}

export type TypeMap = {
    info: TypeInfo, 
    layout: TypeLayout
}[]
