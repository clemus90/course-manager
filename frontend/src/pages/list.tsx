import {
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import SearchBar from '../components/searchBar/searchBar'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteCourse, searchCourses } from '../services/api'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const List = () => {
    const onSearch = (term: string) => {
        setSearchTerm(term)
    }
    const [searchTerm, setSearchTerm] = useState('')
    const foundCourses = useQuery({
        queryKey: ['searchCourses', searchTerm],
        queryFn: searchCourses,
    })

    const courses = foundCourses.data ?? []

    const deleteCourseHandler = (courseId: number) => async () => {
        await deleteCourse(courseId)
        foundCourses.refetch()
    }

    return (
        <Container>
            <Typography variant="h1">Courses Manager</Typography>
            <Button
                component={Link}
                sx={{ marginBottom: '8px' }}
                to="/course/new"
            >
                Create a new course
            </Button>
            <SearchBar onSearch={onSearch} />
            {courses.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Course Number</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell>{course.id}</TableCell>
                                    <TableCell>{course.subject}</TableCell>
                                    <TableCell>{course.courseNumber}</TableCell>
                                    <TableCell>{course.description}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={deleteCourseHandler(
                                                course.id,
                                            )}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            component={Link}
                                            to={`/course/${course.id}`}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    )
}

export default List
