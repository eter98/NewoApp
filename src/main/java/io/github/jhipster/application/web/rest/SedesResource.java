package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Sedes;
import io.github.jhipster.application.repository.SedesRepository;
import io.github.jhipster.application.repository.search.SedesSearchRepository;
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
 * REST controller for managing Sedes.
 */
@RestController
@RequestMapping("/api")
public class SedesResource {

    private final Logger log = LoggerFactory.getLogger(SedesResource.class);

    private static final String ENTITY_NAME = "sedes";

    private final SedesRepository sedesRepository;

    private final SedesSearchRepository sedesSearchRepository;

    public SedesResource(SedesRepository sedesRepository, SedesSearchRepository sedesSearchRepository) {
        this.sedesRepository = sedesRepository;
        this.sedesSearchRepository = sedesSearchRepository;
    }

    /**
     * POST  /sedes : Create a new sedes.
     *
     * @param sedes the sedes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sedes, or with status 400 (Bad Request) if the sedes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sedes")
    public ResponseEntity<Sedes> createSedes(@RequestBody Sedes sedes) throws URISyntaxException {
        log.debug("REST request to save Sedes : {}", sedes);
        if (sedes.getId() != null) {
            throw new BadRequestAlertException("A new sedes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sedes result = sedesRepository.save(sedes);
        sedesSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sedes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sedes : Updates an existing sedes.
     *
     * @param sedes the sedes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sedes,
     * or with status 400 (Bad Request) if the sedes is not valid,
     * or with status 500 (Internal Server Error) if the sedes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sedes")
    public ResponseEntity<Sedes> updateSedes(@RequestBody Sedes sedes) throws URISyntaxException {
        log.debug("REST request to update Sedes : {}", sedes);
        if (sedes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sedes result = sedesRepository.save(sedes);
        sedesSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sedes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sedes : get all the sedes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of sedes in body
     */
    @GetMapping("/sedes")
    public List<Sedes> getAllSedes(@RequestParam(required = false) String filter) {
        if ("entradamiembros-is-null".equals(filter)) {
            log.debug("REST request to get all Sedess where entradaMiembros is null");
            return StreamSupport
                .stream(sedesRepository.findAll().spliterator(), false)
                .filter(sedes -> sedes.getEntradaMiembros() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Sedes");
        return sedesRepository.findAll();
    }

    /**
     * GET  /sedes/:id : get the "id" sedes.
     *
     * @param id the id of the sedes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sedes, or with status 404 (Not Found)
     */
    @GetMapping("/sedes/{id}")
    public ResponseEntity<Sedes> getSedes(@PathVariable Long id) {
        log.debug("REST request to get Sedes : {}", id);
        Optional<Sedes> sedes = sedesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sedes);
    }

    /**
     * DELETE  /sedes/:id : delete the "id" sedes.
     *
     * @param id the id of the sedes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sedes/{id}")
    public ResponseEntity<Void> deleteSedes(@PathVariable Long id) {
        log.debug("REST request to delete Sedes : {}", id);
        sedesRepository.deleteById(id);
        sedesSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sedes?query=:query : search for the sedes corresponding
     * to the query.
     *
     * @param query the query of the sedes search
     * @return the result of the search
     */
    @GetMapping("/_search/sedes")
    public List<Sedes> searchSedes(@RequestParam String query) {
        log.debug("REST request to search Sedes for query {}", query);
        return StreamSupport
            .stream(sedesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
