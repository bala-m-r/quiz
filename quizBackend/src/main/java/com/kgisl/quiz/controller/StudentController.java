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

import com.kgisl.quiz.entity.Student;
import com.kgisl.quiz.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:4200") 
public class StudentController {

    private StudentService studentService;

    StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PostMapping("/add")
    public void addStudent(@RequestBody Student student){
        studentService.addStudent(student);
    } 

    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> getAll() {
        return studentService.getAll();
    } 

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable int id){
        studentService.deleteById(id);
    }

    @PutMapping("/edit/{id}")
    public void edit(@PathVariable int id, @RequestBody Student student){
        studentService.edit(id, student);
    }
    
}
