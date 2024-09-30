package com.civitaslearning.coursemanager.courses;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public List<Course> searchCourses(@RequestParam(required = false) String search) {
        return this.courseService.searchCourses(search);
    }

    @GetMapping("/{id}")
    public Optional<Course> searchCourses(@PathVariable Long id) {
        return this.courseService.getCourse(id);
    }

    @PostMapping
    public Course createCourse(@RequestBody CourseInput course) {
        return this.courseService.addCourse(course);
    }

    @PutMapping
    public Course modifyCourse(@RequestBody CourseInput course) {
        return this.courseService.modifyCourse(course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        this.courseService.deleteCourse(id);

    }
}
