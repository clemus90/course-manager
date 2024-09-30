import { Button, Container, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { createCourse } from '../services/api'
import { useState } from 'react'
import { CourseCreation } from '../services/schemas'
import { useMutation } from '@tanstack/react-query'
import { isCourseNumberValid } from '../services/validation'

const Create = () => {
    const [createData, setCreateData] = useState<CourseCreation>({
        subject: '',
        courseNumber: '',
        description: '',
    })

    const [validCourseNumber, setValidCourseNumber] = useState(true)

    const courseSubmission = useMutation({
        mutationFn: createCourse,
    })

    return (
        <Container>
            <Button component={Link} to="/" sx={{ marginBottom: '8px' }}>
                Back to Search Courses
            </Button>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    courseSubmission.mutate(createData)
                }}
            >
                <TextField
                    label="Subject"
                    onChange={(e) =>
                        setCreateData({
                            ...createData,
                            subject: e.target.value,
                        })
                    }
                />
                <TextField
                    label="Course Number"
                    onChange={(e) => {
                        setValidCourseNumber(
                            isCourseNumberValid(e.target.value),
                        )
                        setCreateData({
                            ...createData,
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
                    onChange={(e) =>
                        setCreateData({
                            ...createData,
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

export default Create
