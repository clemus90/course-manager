package com.civitaslearning.coursemanager.courses;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subject;
    private String courseNumber;
    private String description;

    public Course(Long id, String subject, String courseNumber, String description) {
        this.id = id;
        this.subject = subject;
        this.courseNumber = courseNumber;
        this.description = description;
    }

    public Course() {
    }

    public Long getId() {
        return id;
    }

    public String getSubject() {
        return subject;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public String getDescription() {
        return description;
    }
}
