package com.kgisl.quiz.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.kgisl.quiz.entity.Results;
import com.kgisl.quiz.entity.Student;
import com.kgisl.quiz.entity.Subject;

@Repository
public interface ResultsRepository extends JpaRepository<Results, Integer> {

    List<Results> findBySubject(Subject subject);

    List<Results> findByStudent(Student student);

    @Query(value = "SELECT id FROM results WHERE student_id = :studentId AND subject_id = :subjectId", nativeQuery = true)
    Integer findByStudentIdAndSubjectId(@Param("studentId") int studentId, @Param("subjectId") int subjectId);

   

    
    
}
