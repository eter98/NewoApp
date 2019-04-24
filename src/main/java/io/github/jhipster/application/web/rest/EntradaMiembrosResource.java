package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.EntradaMiembros;
import io.github.jhipster.application.repository.EntradaMiembrosRepository;
import io.github.jhipster.application.repository.search.EntradaMiembrosSearchRepository;
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
 * REST controller for managing EntradaMiembros.
 */
@RestController
@RequestMapping("/api")
public class EntradaMiembrosResource {

    private final Logger log = LoggerFactory.getLogger(EntradaMiembrosResource.class);

    private static final String ENTITY_NAME = "entradaMiembros";

    private final EntradaMiembrosRepository entradaMiembrosRepository;

    private final EntradaMiembrosSearchRepository entradaMiembrosSearchRepository;

    public EntradaMiembrosResource(EntradaMiembrosRepository entradaMiembrosRepository, EntradaMiembrosSearchRepository entradaMiembrosSearchRepository) {
        this.entradaMiembrosRepository = entradaMiembrosRepository;
        this.entradaMiembrosSearchRepository = entradaMiembrosSearchRepository;
    }

    /**
     * POST  /entrada-miembros : Create a new entradaMiembros.
     *
     * @param entradaMiembros the entradaMiembros to create
     * @return the ResponseEntity with status 201 (Created) and with body the new entradaMiembros, or with status 400 (Bad Request) if the entradaMiembros has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/entrada-miembros")
    public ResponseEntity<EntradaMiembros> createEntradaMiembros(@RequestBody EntradaMiembros entradaMiembros) throws URISyntaxException {
        log.debug("REST request to save EntradaMiembros : {}", entradaMiembros);
        if (entradaMiembros.getId() != null) {
            throw new BadRequestAlertException("A new entradaMiembros cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntradaMiembros result = entradaMiembrosRepository.save(entradaMiembros);
        entradaMiembrosSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/entrada-miembros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /entrada-miembros : Updates an existing entradaMiembros.
     *
     * @param entradaMiembros the entradaMiembros to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated entradaMiembros,
     * or with status 400 (Bad Request) if the entradaMiembros is not valid,
     * or with status 500 (Internal Server Error) if the entradaMiembros couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/entrada-miembros")
    public ResponseEntity<EntradaMiembros> updateEntradaMiembros(@RequestBody EntradaMiembros entradaMiembros) throws URISyntaxException {
        log.debug("REST request to update EntradaMiembros : {}", entradaMiembros);
        if (entradaMiembros.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EntradaMiembros result = entradaMiembrosRepository.save(entradaMiembros);
        entradaMiembrosSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, entradaMiembros.getId().toString()))
            .body(result);
    }

    /**
     * GET  /entrada-miembros : get all the entradaMiembros.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of entradaMiembros in body
     */
    @GetMapping("/entrada-miembros")
    public List<EntradaMiembros> getAllEntradaMiembros() {
        log.debug("REST request to get all EntradaMiembros");
        return entradaMiembrosRepository.findAll();
    }

    /**
     * GET  /entrada-miembros/:id : get the "id" entradaMiembros.
     *
     * @param id the id of the entradaMiembros to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the entradaMiembros, or with status 404 (Not Found)
     */
    @GetMapping("/entrada-miembros/{id}")
    public ResponseEntity<EntradaMiembros> getEntradaMiembros(@PathVariable Long id) {
        log.debug("REST request to get EntradaMiembros : {}", id);
        Optional<EntradaMiembros> entradaMiembros = entradaMiembrosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entradaMiembros);
    }

    /**
     * DELETE  /entrada-miembros/:id : delete the "id" entradaMiembros.
     *
     * @param id the id of the entradaMiembros to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/entrada-miembros/{id}")
    public ResponseEntity<Void> deleteEntradaMiembros(@PathVariable Long id) {
        log.debug("REST request to delete EntradaMiembros : {}", id);
        entradaMiembrosRepository.deleteById(id);
        entradaMiembrosSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/entrada-miembros?query=:query : search for the entradaMiembros corresponding
     * to the query.
     *
     * @param query the query of the entradaMiembros search
     * @return the result of the search
     */
    @GetMapping("/_search/entrada-miembros")
    public List<EntradaMiembros> searchEntradaMiembros(@RequestParam String query) {
        log.debug("REST request to search EntradaMiembros for query {}", query);
        return StreamSupport
            .stream(entradaMiembrosSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
