package com.sportvalue.crs.repositories;

import java.util.Optional;

import com.sportvalue.crs.models.User;

public interface UsersRepository extends GenericRepository<User, Long> {
    // public Optional<User> findByUsername(String username);
    public Optional<User> findByEmail(String email);
}

