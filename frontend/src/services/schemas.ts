import { Schema } from '@effect/schema'

export const Course = Schema.Struct({
    id: Schema.Number,
    subject: Schema.String,
    courseNumber: Schema.String,
    description: Schema.String,
})

export interface Course extends Schema.Schema.Type<typeof Course> {}

export interface CourseCreation {
    subject: string
    courseNumber: string
    description: string
}
