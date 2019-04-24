package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Ciudad;
import io.github.jhipster.application.repository.CiudadRepository;
import io.github.jhipster.application.repository.search.CiudadSearchRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Ciudad.
 */
@RestController
@RequestMapping("/api")
public class CiudadResource {

    private final Logger log = LoggerFactory.getLogger(CiudadResource.class);

    private static final String ENTITY_NAME = "ciudad";

    private final CiudadRepository ciudadRepository;

    private final CiudadSearchRepository ciudadSearchRepository;

    public CiudadResource(CiudadRepository ciudadRepository, CiudadSearchRepository ciudadSearchRepository) {
        this.ciudadRepository = ciudadRepository;
        this.ciudadSearchRepository = ciudadSearchRepository;
    }

    /**
     * POST  /ciudads : Create a new ciudad.
     *
     * @param ciudad the ciudad to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ciudad, or with status 400 (Bad Request) if the ciudad has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ciudads")
    public ResponseEntity<Ciudad> createCiudad(@RequestBody Ciudad ciudad) throws URISyntaxException {
        log.debug("REST request to save Ciudad : {}", ciudad);
        if (ciudad.getId() != null) {
            throw new BadRequestAlertException("A new ciudad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ciudad result = ciudadRepository.save(ciudad);
        ciudadSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/ciudads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ciudads : Updates an existing ciudad.
     *
     * @param ciudad the ciudad to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ciudad,
     * or with status 400 (Bad Request) if the ciudad is not valid,
     * or with status 500 (Internal Server Error) if the ciudad couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ciudads")
    public ResponseEntity<Ciudad> updateCiudad(@RequestBody Ciudad ciudad) throws URISyntaxException {
        log.debug("REST request to update Ciudad : {}", ciudad);
        if (ciudad.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ciudad result = ciudadRepository.save(ciudad);
        ciudadSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ciudad.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ciudads : get all the ciudads.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of ciudads in body
     */
    @GetMapping("/ciudads")
    public List<Ciudad> getAllCiudads(@RequestParam(required = false) String filter) {
        if ("sedes-is-null".equals(filter)) {
            log.debug("REST request to get all Ciudads where sedes is null");
            return StreamSupport
                .stream(ciudadRepository.findAll().spliterator(), false)
                .filter(ciudad -> ciudad.getSedes() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Ciudads");
        return ciudadRepository.findAll();
    }

    /**
     * GET  /ciudads/:id : get the "id" ciudad.
     *
     * @param id the id of the ciudad to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ciudad, or with status 404 (Not Found)
     */
    @GetMapping("/ciudads/{id}")
    public ResponseEntity<Ciudad> getCiudad(@PathVariable Long id) {
        log.debug("REST request to get Ciudad : {}", id);
        Optional<Ciudad> ciudad = ciudadRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ciudad);
    }

    /**
     * DELETE  /ciudads/:id : delete the "id" ciudad.
     *
     * @param id the id of the ciudad to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ciudads/{id}")
    public ResponseEntity<Void> deleteCiudad(@PathVariable Long id) {
        log.debug("REST request to delete Ciudad : {}", id);
        ciudadRepository.deleteById(id);
        ciudadSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/ciudads?query=:query : search for the ciudad corresponding
     * to the query.
     *
     * @param query the query of the ciudad search
     * @return the result of the search
     */
    @GetMapping("/_search/ciudads")
    public List<Ciudad> searchCiudads(@RequestParam String query) {
        log.debug("REST request to search Ciudads for query {}", query);
        return StreamSupport
            .stream(ciudadSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
