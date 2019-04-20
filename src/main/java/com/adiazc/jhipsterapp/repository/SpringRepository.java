package com.adiazc.jhipsterapp.repository;

import com.adiazc.jhipsterapp.domain.Spring;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Spring entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpringRepository extends JpaRepository<Spring, Long> {

}
