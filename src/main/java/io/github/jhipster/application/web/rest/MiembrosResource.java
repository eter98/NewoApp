package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Miembros;
import io.github.jhipster.application.repository.MiembrosRepository;
import io.github.jhipster.application.repository.search.MiembrosSearchRepository;
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
 * REST controller for managing Miembros.
 */
@RestController
@RequestMapping("/api")
public class MiembrosResource {

    private final Logger log = LoggerFactory.getLogger(MiembrosResource.class);

    private static final String ENTITY_NAME = "miembros";

    private final MiembrosRepository miembrosRepository;

    private final MiembrosSearchRepository miembrosSearchRepository;

    public MiembrosResource(MiembrosRepository miembrosRepository, MiembrosSearchRepository miembrosSearchRepository) {
        this.miembrosRepository = miembrosRepository;
        this.miembrosSearchRepository = miembrosSearchRepository;
    }

    /**
     * POST  /miembros : Create a new miembros.
     *
     * @param miembros the miembros to create
     * @return the ResponseEntity with status 201 (Created) and with body the new miembros, or with status 400 (Bad Request) if the miembros has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/miembros")
    public ResponseEntity<Miembros> createMiembros(@RequestBody Miembros miembros) throws URISyntaxException {
        log.debug("REST request to save Miembros : {}", miembros);
        if (miembros.getId() != null) {
            throw new BadRequestAlertException("A new miembros cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Miembros result = miembrosRepository.save(miembros);
        miembrosSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/miembros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /miembros : Updates an existing miembros.
     *
     * @param miembros the miembros to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated miembros,
     * or with status 400 (Bad Request) if the miembros is not valid,
     * or with status 500 (Internal Server Error) if the miembros couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/miembros")
    public ResponseEntity<Miembros> updateMiembros(@RequestBody Miembros miembros) throws URISyntaxException {
        log.debug("REST request to update Miembros : {}", miembros);
        if (miembros.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Miembros result = miembrosRepository.save(miembros);
        miembrosSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, miembros.getId().toString()))
            .body(result);
    }

    /**
     * GET  /miembros : get all the miembros.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of miembros in body
     */
    @GetMapping("/miembros")
    public List<Miembros> getAllMiembros(@RequestParam(required = false) String filter) {
        if ("registrocompra-is-null".equals(filter)) {
            log.debug("REST request to get all Miembross where registroCompra is null");
            return StreamSupport
                .stream(miembrosRepository.findAll().spliterator(), false)
                .filter(miembros -> miembros.getRegistroCompra() == null)
                .collect(Collectors.toList());
        }
        if ("equipoempresas-is-null".equals(filter)) {
            log.debug("REST request to get all Miembross where equipoEmpresas is null");
            return StreamSupport
                .stream(miembrosRepository.findAll().spliterator(), false)
                .filter(miembros -> miembros.getEquipoEmpresas() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Miembros");
        return miembrosRepository.findAll();
    }

    /**
     * GET  /miembros/:id : get the "id" miembros.
     *
     * @param id the id of the miembros to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the miembros, or with status 404 (Not Found)
     */
    @GetMapping("/miembros/{id}")
    public ResponseEntity<Miembros> getMiembros(@PathVariable Long id) {
        log.debug("REST request to get Miembros : {}", id);
        Optional<Miembros> miembros = miembrosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(miembros);
    }

    /**
     * DELETE  /miembros/:id : delete the "id" miembros.
     *
     * @param id the id of the miembros to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/miembros/{id}")
    public ResponseEntity<Void> deleteMiembros(@PathVariable Long id) {
        log.debug("REST request to delete Miembros : {}", id);
        miembrosRepository.deleteById(id);
        miembrosSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/miembros?query=:query : search for the miembros corresponding
     * to the query.
     *
     * @param query the query of the miembros search
     * @return the result of the search
     */
    @GetMapping("/_search/miembros")
    public List<Miembros> searchMiembros(@RequestParam String query) {
        log.debug("REST request to search Miembros for query {}", query);
        return StreamSupport
            .stream(miembrosSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
