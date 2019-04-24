package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.EntradaInvitados;
import io.github.jhipster.application.repository.EntradaInvitadosRepository;
import io.github.jhipster.application.repository.search.EntradaInvitadosSearchRepository;
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
 * REST controller for managing EntradaInvitados.
 */
@RestController
@RequestMapping("/api")
public class EntradaInvitadosResource {

    private final Logger log = LoggerFactory.getLogger(EntradaInvitadosResource.class);

    private static final String ENTITY_NAME = "entradaInvitados";

    private final EntradaInvitadosRepository entradaInvitadosRepository;

    private final EntradaInvitadosSearchRepository entradaInvitadosSearchRepository;

    public EntradaInvitadosResource(EntradaInvitadosRepository entradaInvitadosRepository, EntradaInvitadosSearchRepository entradaInvitadosSearchRepository) {
        this.entradaInvitadosRepository = entradaInvitadosRepository;
        this.entradaInvitadosSearchRepository = entradaInvitadosSearchRepository;
    }

    /**
     * POST  /entrada-invitados : Create a new entradaInvitados.
     *
     * @param entradaInvitados the entradaInvitados to create
     * @return the ResponseEntity with status 201 (Created) and with body the new entradaInvitados, or with status 400 (Bad Request) if the entradaInvitados has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/entrada-invitados")
    public ResponseEntity<EntradaInvitados> createEntradaInvitados(@RequestBody EntradaInvitados entradaInvitados) throws URISyntaxException {
        log.debug("REST request to save EntradaInvitados : {}", entradaInvitados);
        if (entradaInvitados.getId() != null) {
            throw new BadRequestAlertException("A new entradaInvitados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntradaInvitados result = entradaInvitadosRepository.save(entradaInvitados);
        entradaInvitadosSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/entrada-invitados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /entrada-invitados : Updates an existing entradaInvitados.
     *
     * @param entradaInvitados the entradaInvitados to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated entradaInvitados,
     * or with status 400 (Bad Request) if the entradaInvitados is not valid,
     * or with status 500 (Internal Server Error) if the entradaInvitados couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/entrada-invitados")
    public ResponseEntity<EntradaInvitados> updateEntradaInvitados(@RequestBody EntradaInvitados entradaInvitados) throws URISyntaxException {
        log.debug("REST request to update EntradaInvitados : {}", entradaInvitados);
        if (entradaInvitados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EntradaInvitados result = entradaInvitadosRepository.save(entradaInvitados);
        entradaInvitadosSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, entradaInvitados.getId().toString()))
            .body(result);
    }

    /**
     * GET  /entrada-invitados : get all the entradaInvitados.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of entradaInvitados in body
     */
    @GetMapping("/entrada-invitados")
    public List<EntradaInvitados> getAllEntradaInvitados(@RequestParam(required = false) String filter) {
        if ("registrocompra-is-null".equals(filter)) {
            log.debug("REST request to get all EntradaInvitadoss where registroCompra is null");
            return StreamSupport
                .stream(entradaInvitadosRepository.findAll().spliterator(), false)
                .filter(entradaInvitados -> entradaInvitados.getRegistroCompra() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all EntradaInvitados");
        return entradaInvitadosRepository.findAll();
    }

    /**
     * GET  /entrada-invitados/:id : get the "id" entradaInvitados.
     *
     * @param id the id of the entradaInvitados to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the entradaInvitados, or with status 404 (Not Found)
     */
    @GetMapping("/entrada-invitados/{id}")
    public ResponseEntity<EntradaInvitados> getEntradaInvitados(@PathVariable Long id) {
        log.debug("REST request to get EntradaInvitados : {}", id);
        Optional<EntradaInvitados> entradaInvitados = entradaInvitadosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entradaInvitados);
    }

    /**
     * DELETE  /entrada-invitados/:id : delete the "id" entradaInvitados.
     *
     * @param id the id of the entradaInvitados to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/entrada-invitados/{id}")
    public ResponseEntity<Void> deleteEntradaInvitados(@PathVariable Long id) {
        log.debug("REST request to delete EntradaInvitados : {}", id);
        entradaInvitadosRepository.deleteById(id);
        entradaInvitadosSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/entrada-invitados?query=:query : search for the entradaInvitados corresponding
     * to the query.
     *
     * @param query the query of the entradaInvitados search
     * @return the result of the search
     */
    @GetMapping("/_search/entrada-invitados")
    public List<EntradaInvitados> searchEntradaInvitados(@RequestParam String query) {
        log.debug("REST request to search EntradaInvitados for query {}", query);
        return StreamSupport
            .stream(entradaInvitadosSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
