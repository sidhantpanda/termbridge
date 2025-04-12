import { Entity } from "typeorm"

@Entity()
export class ReomteHost {
    id: number
    name: string
    description: string
    filename: string
    views: number
    isPublished: boolean
};
