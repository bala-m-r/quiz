package com.kgisl.quiz.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kgisl.quiz.entity.Question;
import com.kgisl.quiz.repository.QuestionRepository;

import jakarta.transaction.Transactional;

@Service
public class QuestionService {

    private QuestionRepository questionRepository;

    QuestionService(QuestionRepository questionrRepository){
        this.questionRepository = questionrRepository;
    }

    public ResponseEntity<List<Question>> getAll() {
        List<Question> questions = questionRepository.findAll();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    public Question get(int id){
        return questionRepository.findById(id).orElse(null);
    }

    @Transactional
    public Question addNew(Question question) {
        return questionRepository.save(question);
    }

    @Transactional
    public void deleteAllBySubjectId(int id) {
        questionRepository.deleteAllBySubject_id(id);;
    }

    @Transactional
    public void delete(int id) {
        questionRepository.deleteById(id);
    }

    @Transactional
    public void edit(Question question) {
        questionRepository.save(question);
    }

    public ResponseEntity<List<Question>> getBySubjectId(int id) {
        List<Question> questions = questionRepository.findAll()
                                        .stream()
                                        .filter((question) -> question.getSubject().getId() == id)
                                        .collect(Collectors.toList());
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
    
}
