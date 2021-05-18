package com.sportvalue.crs.controllers;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.sportvalue.crs.repositories.GenericRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public class SuperController<T extends Serializable, ID> {

    protected final GenericRepository<T, ID> repository;

    public SuperController(GenericRepository<T, ID> repository) {
        this.repository = repository ;
    }

    @GetMapping("/getAll/{startIndex}/{pageSize}/{sortBy}/{sortDir}/{email}")
    public ResponseEntity<?> GetAll(@PathVariable int startIndex, @PathVariable int pageSize,
            @PathVariable String sortBy, @PathVariable String sortDir, @PathVariable String email) {

        Sort sort = Sort.by(sortDir == "desc" ? Sort.Direction.DESC : Sort.Direction.ASC, sortBy);

        Page<T> query = repository.findAll(PageRequest.of(startIndex, pageSize, sort));

        List<T> list = query.getContent();

        Long count = query.getTotalElements();

        return ResponseEntity.ok(Map.of("count", count, "list", list));
    }

    @GetMapping("/get")
    public ResponseEntity<List<T>> get(){
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable ID id){

        Optional<T> model = repository.findById(id);

        if(model.isPresent() == false){
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(model.get());
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<?> put(@PathVariable ID id, @RequestBody T model){

        Optional<T> optional = repository.findById(id);

        if(optional.isPresent() == false){
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }
        
        T o = repository.save(model);

        return ResponseEntity.ok(o);
    }

    @PostMapping("/post")
    public ResponseEntity<?> post(@RequestBody T model){
        try {
            T o = repository.saveAndFlush(model);
            return ResponseEntity.ok(o);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable ID id){
        repository.deleteById(id);
        
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
