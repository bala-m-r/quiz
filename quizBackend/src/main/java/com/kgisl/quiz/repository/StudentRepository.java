package com.kgisl.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kgisl.quiz.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer>{
    
}
