package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Invitados;
import io.github.jhipster.application.repository.InvitadosRepository;
import io.github.jhipster.application.repository.search.InvitadosSearchRepository;
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
 * REST controller for managing Invitados.
 */
@RestController
@RequestMapping("/api")
public class InvitadosResource {

    private final Logger log = LoggerFactory.getLogger(InvitadosResource.class);

    private static final String ENTITY_NAME = "invitados";

    private final InvitadosRepository invitadosRepository;

    private final InvitadosSearchRepository invitadosSearchRepository;

    public InvitadosResource(InvitadosRepository invitadosRepository, InvitadosSearchRepository invitadosSearchRepository) {
        this.invitadosRepository = invitadosRepository;
        this.invitadosSearchRepository = invitadosSearchRepository;
    }

    /**
     * POST  /invitados : Create a new invitados.
     *
     * @param invitados the invitados to create
     * @return the ResponseEntity with status 201 (Created) and with body the new invitados, or with status 400 (Bad Request) if the invitados has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/invitados")
    public ResponseEntity<Invitados> createInvitados(@RequestBody Invitados invitados) throws URISyntaxException {
        log.debug("REST request to save Invitados : {}", invitados);
        if (invitados.getId() != null) {
            throw new BadRequestAlertException("A new invitados cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Invitados result = invitadosRepository.save(invitados);
        invitadosSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/invitados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /invitados : Updates an existing invitados.
     *
     * @param invitados the invitados to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated invitados,
     * or with status 400 (Bad Request) if the invitados is not valid,
     * or with status 500 (Internal Server Error) if the invitados couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/invitados")
    public ResponseEntity<Invitados> updateInvitados(@RequestBody Invitados invitados) throws URISyntaxException {
        log.debug("REST request to update Invitados : {}", invitados);
        if (invitados.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Invitados result = invitadosRepository.save(invitados);
        invitadosSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, invitados.getId().toString()))
            .body(result);
    }

    /**
     * GET  /invitados : get all the invitados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of invitados in body
     */
    @GetMapping("/invitados")
    public List<Invitados> getAllInvitados() {
        log.debug("REST request to get all Invitados");
        return invitadosRepository.findAll();
    }

    /**
     * GET  /invitados/:id : get the "id" invitados.
     *
     * @param id the id of the invitados to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the invitados, or with status 404 (Not Found)
     */
    @GetMapping("/invitados/{id}")
    public ResponseEntity<Invitados> getInvitados(@PathVariable Long id) {
        log.debug("REST request to get Invitados : {}", id);
        Optional<Invitados> invitados = invitadosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(invitados);
    }

    /**
     * DELETE  /invitados/:id : delete the "id" invitados.
     *
     * @param id the id of the invitados to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/invitados/{id}")
    public ResponseEntity<Void> deleteInvitados(@PathVariable Long id) {
        log.debug("REST request to delete Invitados : {}", id);
        invitadosRepository.deleteById(id);
        invitadosSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/invitados?query=:query : search for the invitados corresponding
     * to the query.
     *
     * @param query the query of the invitados search
     * @return the result of the search
     */
    @GetMapping("/_search/invitados")
    public List<Invitados> searchInvitados(@RequestParam String query) {
        log.debug("REST request to search Invitados for query {}", query);
        return StreamSupport
            .stream(invitadosSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
