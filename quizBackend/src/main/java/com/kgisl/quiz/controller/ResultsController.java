package com.kgisl.quiz.controller;

import java.util.List;

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

import com.kgisl.quiz.entity.Results;
import com.kgisl.quiz.service.ResultsService;

@RestController
@RequestMapping("/results")
@CrossOrigin(origins = "http://localhost:4200") 
public class ResultsController {

    private ResultsService resultsService;

    ResultsController(ResultsService resultsService){
        this.resultsService = resultsService;
    }

    // @PostMapping("/add")
    // public ResponseEntity<Results> addResult(
    //         @RequestParam int studentId, 
    //         @RequestParam int subjectId, 
    //         @RequestParam int mark) {
    //     Results result = resultsService.addResult(studentId, subjectId, mark);
    //     return ResponseEntity.ok(result);
    // }
    @PostMapping("/add")
    public void addResult(
            @RequestParam int studentId, 
            @RequestParam int subjectId, 
            @RequestParam int mark) {

        
        resultsService.addResult(studentId, subjectId, mark);
        
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Results> editResult(
            @PathVariable int id,
            @RequestParam int studentId, 
            @RequestParam int subjectId, 
            @RequestParam int mark) {
        Results result = resultsService.editResult(id, studentId, subjectId, mark);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Results>> getAll(){
        return resultsService.getAll();
    }

    @GetMapping("getBySubject/{subjectid}")
    public ResponseEntity<List<Results>> getBySubject(@PathVariable int subjectid){
        return ResponseEntity.ok(resultsService.getBySubject(subjectid));
    }

    @GetMapping("getByStudent/{studentid}")
    public ResponseEntity<List<Results>> getByStudent(@PathVariable int studentid){
        return ResponseEntity.ok(resultsService.getByStudent(studentid));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable int id){
        resultsService.deleteById(id);
    }

    
    
}
