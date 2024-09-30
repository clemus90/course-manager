import { useEffect, useState } from 'react'
import { Course } from '../services/schemas'
import { useParams } from 'react-router-dom'
import { getCourse, modifyCourse } from '../services/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { isCourseNumberValid } from '../services/validation'

const Detail = () => {
    const { id } = useParams()

    const idNumber = id !== undefined ? parseInt(id) : undefined

    const foundCourse = useQuery({
        queryKey: ['getCourse', idNumber],
        queryFn: getCourse,
    })

    const [modifyData, setModifyData] = useState<Course>({
        id: 0,
        subject: '',
        courseNumber: '',
        description: '',
    })

    useEffect(() => {
        if (idNumber && foundCourse.data) {
            setModifyData({
                id: idNumber,
                subject: foundCourse.data.subject,
                courseNumber: foundCourse.data.courseNumber,
                description: foundCourse.data.description,
            })
        }
    }, [foundCourse.data, idNumber])

    const courseSubmission = useMutation({
        mutationFn: modifyCourse,
    })

    const [validCourseNumber, setValidCourseNumber] = useState(true)

    if (foundCourse.isPending) {
        return <CircularProgress />
    } else if (foundCourse.isError) {
        return (
            <Typography>Error while fetching course with ID ${id}</Typography>
        )
    } else {
        return (
            <Container>
                <Button component={Link} to="/" sx={{ marginBottom: '8px' }}>
                    Back to Search Courses
                </Button>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        courseSubmission.mutate(modifyData)
                    }}
                >
                    <TextField label="ID" disabled={true} value={id} />
                    <TextField
                        label="Subject"
                        value={modifyData.subject}
                        onChange={(e) =>
                            setModifyData({
                                ...modifyData,
                                subject: e.target.value,
                            })
                        }
                    />
                    <TextField
                        label="Course Number"
                        value={modifyData.courseNumber}
                        onChange={(e) => {
                            setValidCourseNumber(
                                isCourseNumberValid(e.target.value),
                            )
                            setModifyData({
                                ...modifyData,
                                courseNumber: e.target.value,
                            })
                        }}
                        error={!validCourseNumber}
                        helperText={
                            validCourseNumber
                                ? ''
                                : 'Please enter a valid course number'
                        }
                    />
                    <TextField
                        label="Description"
                        value={modifyData.description}
                        onChange={(e) =>
                            setModifyData({
                                ...modifyData,
                                description: e.target.value,
                            })
                        }
                    />
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </form>
                {courseSubmission.isPending && (
                    <Typography>Saving Course ...</Typography>
                )}
                {courseSubmission.isSuccess && (
                    <Typography>Course saved</Typography>
                )}
                {courseSubmission.isError && (
                    <Typography>
                        There was an error when saving the course
                    </Typography>
                )}
            </Container>
        )
    }
}

export default Detail
