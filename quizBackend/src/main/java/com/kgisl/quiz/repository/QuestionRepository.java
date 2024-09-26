package com.kgisl.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kgisl.quiz.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer>{

    void deleteAllBySubject_id(int id);
    
}
