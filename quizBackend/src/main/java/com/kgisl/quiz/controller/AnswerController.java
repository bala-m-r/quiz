package com.kgisl.quiz.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kgisl.quiz.entity.Answer;
import com.kgisl.quiz.service.AnswerService;

@RestController
@RequestMapping("/answer")
public class AnswerController {

    private AnswerService answerService;

    AnswerController(AnswerService answerService){
        this.answerService = answerService;
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Answer>> getAll(){
        List<Answer> answers = answerService.getAll();
        return new ResponseEntity<>(answers, HttpStatus.OK);
    }
}
