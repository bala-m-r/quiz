package com.kgisl.quiz.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kgisl.quiz.entity.Answer;
import com.kgisl.quiz.entity.Question;
import com.kgisl.quiz.entity.Subject;
import com.kgisl.quiz.service.QuestionService;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins = "http://localhost:4200") 
public class QuestionController {

    private QuestionService questionService;

    QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Question>> getAll() {
        return questionService.getAll();
    }

    @GetMapping("/getBySubjectId/{id}")
    public ResponseEntity<List<Question>> getBySubjectId(@PathVariable int id) {
        return questionService.getBySubjectId(id);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Question> get(@PathVariable int id) {
        Question question = questionService.get(id);
        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public void edit(@PathVariable int id,
            @RequestParam String questionText,
            @RequestParam int subjectId,
            @RequestParam List<String> options,
            @RequestParam List<Boolean> isRight) {

        Question question = new Question();
        question.setId(id);
        question.setQuestion(questionText);

        Subject subject = new Subject();
        subject.setId(subjectId);
        question.setSubject(subject);

        List<Answer> answerList = new ArrayList<>();
        for (int i = 0; i < options.size(); i++) {
            Answer answer = new Answer();
            answer.setAnswer(options.get(i));
            answer.setIsright(isRight.get(i));
            answer.setQuestion(question);
            answerList.add(answer);
        }
        question.setOptions(answerList);

        questionService.edit(question);

    }

    @PostMapping("/add")
    public ResponseEntity<Question> addQuestion(
            @RequestParam String questionText,
            @RequestParam int subjectId,
            @RequestParam List<String> options,
            @RequestParam List<Boolean> isRight) {

        Question question = new Question();
        question.setQuestion(questionText);

        Subject subject = new Subject();
        subject.setId(subjectId);
        question.setSubject(subject);

        List<Answer> answerList = new ArrayList<>();
        for (int i = 0; i < options.size(); i++) {
            Answer answer = new Answer();
            answer.setAnswer(options.get(i));
            answer.setIsright(isRight.get(i));
            answer.setQuestion(question);
            answerList.add(answer);
        }
        question.setOptions(answerList);

        Question savedQuestion = questionService.addNew(question);

        return new ResponseEntity<>(savedQuestion, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        questionService.delete(id);
    }

    @DeleteMapping("/deleteAllBySubjectId/{id}")
    public void deleteAllBySubjectId(@PathVariable int id) {
        questionService.deleteAllBySubjectId(id);
    }
}
