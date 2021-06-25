package com.sportvalue.crs.repositories;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
// import org.springframework.stereotype.Repository;
@NoRepositoryBean
// @Repository
public interface GenericRepository<T extends Serializable, ID > extends JpaRepository<T, ID>, JpaSpecificationExecutor<T> {

    // @Query( value = "SELECT * FROM USERS u WHERE u.status = 1",  nativeQuery = true)
    // List<Book> findByAuthor(String author);
    // List<Book> findByTitle(String title);

    // @Async
    // CompletableFuture<T> findAll();
    // Stream<User> findAllByName(String name);
}


