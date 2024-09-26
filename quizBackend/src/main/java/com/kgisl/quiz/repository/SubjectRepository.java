package com.kgisl.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kgisl.quiz.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer>{
    
}
