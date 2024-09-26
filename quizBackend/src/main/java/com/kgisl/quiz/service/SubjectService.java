package com.kgisl.quiz.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.kgisl.quiz.entity.Subject;
import com.kgisl.quiz.repository.SubjectRepository;

import jakarta.transaction.Transactional;

@Service
@CrossOrigin(origins = "http://localhost:4200")
public class SubjectService {

    private SubjectRepository subjectRepository;
    private QuestionService questionService;
    

    SubjectService(SubjectRepository subjectRepository, QuestionService questionService){
        this.subjectRepository = subjectRepository;
        this.questionService = questionService;
    }

    @Transactional
    public void addNewSubject(Subject subject) {
        subjectRepository.save(subject);
    }

    public ResponseEntity<List<Subject>> gettAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

    @Transactional
    public void deleteById(int id) {
        subjectRepository.deleteById(id);
        questionService.deleteAllBySubjectId(id);
    }

    @Transactional
    public void edit(int id, Subject subject) {
        subjectRepository.save(subject);
    }

    public ResponseEntity<Subject> getById(int id) {
        Subject subject = subjectRepository.findById(id).orElse(null);
        return new ResponseEntity<>(subject, HttpStatus.OK);
    }


    
}
