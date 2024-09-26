package com.kgisl.quiz.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kgisl.quiz.entity.Subject;
import com.kgisl.quiz.service.SubjectService;

@RestController
@RequestMapping("/subject")
@CrossOrigin(origins = "http://localhost:4200")  
public class SubjectContoller {

    private SubjectService subjectService;

    SubjectContoller(SubjectService subjectService){
        this.subjectService = subjectService;
    }

    @PostMapping("/new")
    public void addNewSubject(@RequestBody Subject subject){
        subjectService.addNewSubject(subject);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Subject>> getAllSubjects(){
        return subjectService.gettAllSubjects();
    }

    @GetMapping("get/{id}")
    public ResponseEntity<Subject> getById(@PathVariable int id){
        return subjectService.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable int id){
        subjectService.deleteById(id);
    }

    @PutMapping("/edit/{id}")
    public void edit(@PathVariable int id, @RequestBody Subject subject){
        subjectService.edit(id, subject);
    }
}
