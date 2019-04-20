package com.adiazc.jhipsterapp.web.rest;
import com.adiazc.jhipsterapp.domain.Spring;
import com.adiazc.jhipsterapp.repository.SpringRepository;
import com.adiazc.jhipsterapp.web.rest.errors.BadRequestAlertException;
import com.adiazc.jhipsterapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Spring.
 */
@RestController
@RequestMapping("/api")
public class SpringResource {

    private final Logger log = LoggerFactory.getLogger(SpringResource.class);

    private static final String ENTITY_NAME = "spring";

    private final SpringRepository springRepository;

    public SpringResource(SpringRepository springRepository) {
        this.springRepository = springRepository;
    }

    /**
     * POST  /springs : Create a new spring.
     *
     * @param spring the spring to create
     * @return the ResponseEntity with status 201 (Created) and with body the new spring, or with status 400 (Bad Request) if the spring has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/springs")
    public ResponseEntity<Spring> createSpring(@RequestBody Spring spring) throws URISyntaxException {
        log.debug("REST request to save Spring : {}", spring);
        if (spring.getId() != null) {
            throw new BadRequestAlertException("A new spring cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Spring result = springRepository.save(spring);
        return ResponseEntity.created(new URI("/api/springs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /springs : Updates an existing spring.
     *
     * @param spring the spring to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated spring,
     * or with status 400 (Bad Request) if the spring is not valid,
     * or with status 500 (Internal Server Error) if the spring couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/springs")
    public ResponseEntity<Spring> updateSpring(@RequestBody Spring spring) throws URISyntaxException {
        log.debug("REST request to update Spring : {}", spring);
        if (spring.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Spring result = springRepository.save(spring);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, spring.getId().toString()))
            .body(result);
    }

    /**
     * GET  /springs : get all the springs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of springs in body
     */
    @GetMapping("/springs")
    public List<Spring> getAllSprings() {
        log.debug("REST request to get all Springs");
        return springRepository.findAll();
    }

    /**
     * GET  /springs/:id : get the "id" spring.
     *
     * @param id the id of the spring to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the spring, or with status 404 (Not Found)
     */
    @GetMapping("/springs/{id}")
    public ResponseEntity<Spring> getSpring(@PathVariable Long id) {
        log.debug("REST request to get Spring : {}", id);
        Optional<Spring> spring = springRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(spring);
    }

    /**
     * DELETE  /springs/:id : delete the "id" spring.
     *
     * @param id the id of the spring to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/springs/{id}")
    public ResponseEntity<Void> deleteSpring(@PathVariable Long id) {
        log.debug("REST request to delete Spring : {}", id);
        springRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
