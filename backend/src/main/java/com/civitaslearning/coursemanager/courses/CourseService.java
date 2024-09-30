package com.civitaslearning.coursemanager.courses;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class CourseService {

    private CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> searchCourses(String search) {
        if (search == null || search.isEmpty()) {
            return this.courseRepository.findAll();
        } else {
            return this.courseRepository.findByDescriptionContaining(search);
        }

    }

    public Optional<Course> getCourse(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID parameter is required");
        }
        return this.courseRepository.findById(id);
    }

    public Course addCourse(CourseInput courseInput) {
        if (courseInput.id() != null) {
            throw new IllegalArgumentException("A Course ID cannot be specified at creation time");
        }
        Course courseToCreate = courseInput.toCourse();
        return this.courseRepository.save(courseToCreate);
    }

    public Course modifyCourse(CourseInput courseInput) {
        Course courseToMofify = courseInput.toCourse();
        if (courseInput.id() == null) {
            throw new IllegalArgumentException("ID is required for course modifications");
        }
        Optional<Course> existingCourse = this.courseRepository.findById(courseInput.id());
        if (existingCourse.isEmpty()) {
            throw new IllegalArgumentException("there is not an existing course with the provided ID");
        } else {
            return this.courseRepository.save(courseToMofify);
        }
    }

    public void deleteCourse(Long id) {
        if (id != null) {
            this.courseRepository.deleteById(id);
        }
    }

}
