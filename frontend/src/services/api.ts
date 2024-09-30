import { Schema } from '@effect/schema'
import { List } from 'effect'
import { Course, CourseCreation } from './schemas'

const API_BASE_URL = 'http://localhost:8080'

const API_ROUTES = {
    courses: '/courses',
}

const courseDecode = Schema.decodeUnknownPromise(Course)
const courseListDecode = Schema.decodeUnknownPromise(Schema.List(Course))

export interface SearchCoursesQuery {
    queryKey: [string, string]
}
export const searchCourses = async ({
    queryKey,
}: SearchCoursesQuery): Promise<Course[]> => {
    const [_cacheKey, query] = queryKey
    const path =
        `${API_BASE_URL}${API_ROUTES.courses}` +
        (query ? `?${new URLSearchParams({ search: query })}` : '')
    const res = await fetch(path)
    return List.toArray(await courseListDecode(await res.json()))
}

export interface GetCoursesQuery {
    queryKey: [string, number | undefined]
}
export const getCourse = async ({
    queryKey,
}: GetCoursesQuery): Promise<Course> => {
    const [_cacheKey, id] = queryKey
    if (!id) {
        throw new Error(`Course ${id} doesn't exist`)
    }
    const res = await fetch(`${API_BASE_URL}${API_ROUTES.courses}/${id}`)
    try {
        return await courseDecode(await res.json())
    } catch (_e) {
        throw new Error(`Course ${id} doesn't exist`)
    }
}

export const createCourse = async (course: CourseCreation): Promise<Course> => {
    const path = `${API_BASE_URL}${API_ROUTES.courses}`
    const res = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return courseDecode(await res.json())
}

export const modifyCourse = async (course: Course): Promise<Course> => {
    const path = `${API_BASE_URL}${API_ROUTES.courses}`
    const res = await fetch(path, {
        method: 'PUT',
        body: JSON.stringify(course),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return courseDecode(await res.json())
}

export const deleteCourse = async (id: number): Promise<void> => {
    const path = `${API_BASE_URL}${API_ROUTES.courses}/${id}`
    return fetch(path, {
        method: 'DELETE',
    }).then(() => {
        return
    })
}
