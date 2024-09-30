package com.civitaslearning.coursemanager.courses;

public record CourseInput(
        Long id,
        String subject,
        String courseNumber,
        String description) {
    public Course toCourse() {
        return new Course(
                id(),
                subject(),
                courseNumber(),
                description());
    }
}
