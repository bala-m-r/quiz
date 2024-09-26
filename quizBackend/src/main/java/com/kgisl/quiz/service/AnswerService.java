package com.kgisl.quiz.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kgisl.quiz.entity.Answer;
import com.kgisl.quiz.repository.AnswerRepository;

@Service

public class AnswerService {

    private AnswerRepository answerRepository;

    AnswerService(AnswerRepository answerRepository){
        this.answerRepository = answerRepository;
    }

    public List<Answer> getAll() {
        return answerRepository.findAll();
    }
    
}
