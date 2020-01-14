package com.tacme.car.web.rest;

import com.tacme.car.domain.CarOwnwer;
import com.tacme.car.repository.CarOwnwerRepository;
import com.tacme.car.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.tacme.car.domain.CarOwnwer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CarOwnwerResource {

    private final Logger log = LoggerFactory.getLogger(CarOwnwerResource.class);

    private static final String ENTITY_NAME = "carOwnwer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarOwnwerRepository carOwnwerRepository;

    public CarOwnwerResource(CarOwnwerRepository carOwnwerRepository) {
        this.carOwnwerRepository = carOwnwerRepository;
    }

    /**
     * {@code POST  /car-ownwers} : Create a new carOwnwer.
     *
     * @param carOwnwer the carOwnwer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carOwnwer, or with status {@code 400 (Bad Request)} if the carOwnwer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/car-ownwers")
    public ResponseEntity<CarOwnwer> createCarOwnwer(@Valid @RequestBody CarOwnwer carOwnwer) throws URISyntaxException {
        log.debug("REST request to save CarOwnwer : {}", carOwnwer);
        if (carOwnwer.getId() != null) {
            throw new BadRequestAlertException("A new carOwnwer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarOwnwer result = carOwnwerRepository.save(carOwnwer);
        return ResponseEntity.created(new URI("/api/car-ownwers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /car-ownwers} : Updates an existing carOwnwer.
     *
     * @param carOwnwer the carOwnwer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carOwnwer,
     * or with status {@code 400 (Bad Request)} if the carOwnwer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carOwnwer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/car-ownwers")
    public ResponseEntity<CarOwnwer> updateCarOwnwer(@Valid @RequestBody CarOwnwer carOwnwer) throws URISyntaxException {
        log.debug("REST request to update CarOwnwer : {}", carOwnwer);
        if (carOwnwer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CarOwnwer result = carOwnwerRepository.save(carOwnwer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carOwnwer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /car-ownwers} : get all the carOwnwers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carOwnwers in body.
     */
    @GetMapping("/car-ownwers")
    public List<CarOwnwer> getAllCarOwnwers() {
        log.debug("REST request to get all CarOwnwers");
        return carOwnwerRepository.findAll();
    }

    /**
     * {@code GET  /car-ownwers/:id} : get the "id" carOwnwer.
     *
     * @param id the id of the carOwnwer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carOwnwer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/car-ownwers/{id}")
    public ResponseEntity<CarOwnwer> getCarOwnwer(@PathVariable Long id) {
        log.debug("REST request to get CarOwnwer : {}", id);
        Optional<CarOwnwer> carOwnwer = carOwnwerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(carOwnwer);
    }

    /**
     * {@code DELETE  /car-ownwers/:id} : delete the "id" carOwnwer.
     *
     * @param id the id of the carOwnwer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/car-ownwers/{id}")
    public ResponseEntity<Void> deleteCarOwnwer(@PathVariable Long id) {
        log.debug("REST request to delete CarOwnwer : {}", id);
        carOwnwerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
