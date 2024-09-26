package com.kgisl.quiz.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kgisl.quiz.entity.Results;
import com.kgisl.quiz.entity.Student;
import com.kgisl.quiz.repository.ResultsRepository;
import com.kgisl.quiz.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
public class StudentService {

    private StudentRepository studentRepository;
    private ResultsRepository resultsRepository;

    StudentService(StudentRepository studentRepository, ResultsRepository resultsRepository){
        this.studentRepository = studentRepository;
        this.resultsRepository = resultsRepository;
    }

    @Transactional
    public void addStudent(Student student) {
       studentRepository.save(student);
    }

    public ResponseEntity<List<Student>> getAll() {
        List<Student> students = studentRepository.findAll();
        return new ResponseEntity<>(students, HttpStatus.OK);

    }

    @Transactional
    public void deleteById(int id) {
        List<Results> results = resultsRepository.findByStudent(studentRepository.findById(id).get());
        for(Results result : results){
            resultsRepository.delete(result);
        }
        studentRepository.deleteById(id);  
    }

    @Transactional
    public void edit(int id, Student student) {
        student.setId(id);
        studentRepository.save(student);
    }

   
    
}
