package com.kgisl.quiz.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Results {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    int id;

    int mark;

    
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    // Relationship with Subject
    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
    
    
    
}
