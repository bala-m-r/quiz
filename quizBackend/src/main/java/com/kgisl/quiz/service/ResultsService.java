package com.kgisl.quiz.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kgisl.quiz.entity.Results;
import com.kgisl.quiz.entity.Student;
import com.kgisl.quiz.entity.Subject;
import com.kgisl.quiz.repository.ResultsRepository;
import com.kgisl.quiz.repository.StudentRepository;
import com.kgisl.quiz.repository.SubjectRepository;

import jakarta.transaction.Transactional;

@Service
public class ResultsService {

    private ResultsRepository resultsRepository;
    private StudentRepository studentRepository;
    private SubjectRepository subjectRepository;

    ResultsService(ResultsRepository resultsRepository,
            StudentRepository studentRepository,
            SubjectRepository subjectRepository) {
        this.resultsRepository = resultsRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
    }

    @Transactional
    public ResponseEntity<List<Results>> getAll() {
        return new ResponseEntity<>(resultsRepository.findAll(), HttpStatus.OK);
    }

    @Transactional
    public void addResult(int studentId, int subjectId, int mark) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        Integer id = resultsRepository.findByStudentIdAndSubjectId(studentId, subjectId);
        if (id != null) {
            editResult(id, studentId, subjectId, mark);
        } else {
            Results result = new Results();
            result.setStudent(student);
            result.setSubject(subject);
            result.setMark(mark);

            resultsRepository.save(result);
        }

    }

    @Transactional
    public Results editResult(int id, int studentId, int subjectId, int mark) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        Results result = new Results();
        result.setId(id);
        result.setStudent(student);
        result.setSubject(subject);
        result.setMark(mark);

        return resultsRepository.save(result);
    }

    public List<Results> getBySubject(int subjectid) {
        Subject subject = subjectRepository.findById(subjectid)
                .orElseThrow(() -> new RuntimeException("Subject Not Found"));
        return resultsRepository.findBySubject(subject);
    }

    public List<Results> getByStudent(int studentid) {
        Student student = studentRepository.findById(studentid)
                .orElseThrow(() -> new RuntimeException("Subject Not Found"));
        return resultsRepository.findByStudent(student);
    }

    @Transactional
    public void deleteById(int id) {
        resultsRepository.deleteById(id);
    }

}
