package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.PerfilMiembro;
import io.github.jhipster.application.repository.PerfilMiembroRepository;
import io.github.jhipster.application.repository.search.PerfilMiembroSearchRepository;
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
 * REST controller for managing PerfilMiembro.
 */
@RestController
@RequestMapping("/api")
public class PerfilMiembroResource {

    private final Logger log = LoggerFactory.getLogger(PerfilMiembroResource.class);

    private static final String ENTITY_NAME = "perfilMiembro";

    private final PerfilMiembroRepository perfilMiembroRepository;

    private final PerfilMiembroSearchRepository perfilMiembroSearchRepository;

    public PerfilMiembroResource(PerfilMiembroRepository perfilMiembroRepository, PerfilMiembroSearchRepository perfilMiembroSearchRepository) {
        this.perfilMiembroRepository = perfilMiembroRepository;
        this.perfilMiembroSearchRepository = perfilMiembroSearchRepository;
    }

    /**
     * POST  /perfil-miembros : Create a new perfilMiembro.
     *
     * @param perfilMiembro the perfilMiembro to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perfilMiembro, or with status 400 (Bad Request) if the perfilMiembro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/perfil-miembros")
    public ResponseEntity<PerfilMiembro> createPerfilMiembro(@RequestBody PerfilMiembro perfilMiembro) throws URISyntaxException {
        log.debug("REST request to save PerfilMiembro : {}", perfilMiembro);
        if (perfilMiembro.getId() != null) {
            throw new BadRequestAlertException("A new perfilMiembro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PerfilMiembro result = perfilMiembroRepository.save(perfilMiembro);
        perfilMiembroSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/perfil-miembros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /perfil-miembros : Updates an existing perfilMiembro.
     *
     * @param perfilMiembro the perfilMiembro to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perfilMiembro,
     * or with status 400 (Bad Request) if the perfilMiembro is not valid,
     * or with status 500 (Internal Server Error) if the perfilMiembro couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/perfil-miembros")
    public ResponseEntity<PerfilMiembro> updatePerfilMiembro(@RequestBody PerfilMiembro perfilMiembro) throws URISyntaxException {
        log.debug("REST request to update PerfilMiembro : {}", perfilMiembro);
        if (perfilMiembro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PerfilMiembro result = perfilMiembroRepository.save(perfilMiembro);
        perfilMiembroSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perfilMiembro.getId().toString()))
            .body(result);
    }

    /**
     * GET  /perfil-miembros : get all the perfilMiembros.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of perfilMiembros in body
     */
    @GetMapping("/perfil-miembros")
    public List<PerfilMiembro> getAllPerfilMiembros(@RequestParam(required = false) String filter) {
        if ("miembros-is-null".equals(filter)) {
            log.debug("REST request to get all PerfilMiembros where miembros is null");
            return StreamSupport
                .stream(perfilMiembroRepository.findAll().spliterator(), false)
                .filter(perfilMiembro -> perfilMiembro.getMiembros() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all PerfilMiembros");
        return perfilMiembroRepository.findAll();
    }

    /**
     * GET  /perfil-miembros/:id : get the "id" perfilMiembro.
     *
     * @param id the id of the perfilMiembro to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perfilMiembro, or with status 404 (Not Found)
     */
    @GetMapping("/perfil-miembros/{id}")
    public ResponseEntity<PerfilMiembro> getPerfilMiembro(@PathVariable Long id) {
        log.debug("REST request to get PerfilMiembro : {}", id);
        Optional<PerfilMiembro> perfilMiembro = perfilMiembroRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(perfilMiembro);
    }

    /**
     * DELETE  /perfil-miembros/:id : delete the "id" perfilMiembro.
     *
     * @param id the id of the perfilMiembro to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/perfil-miembros/{id}")
    public ResponseEntity<Void> deletePerfilMiembro(@PathVariable Long id) {
        log.debug("REST request to delete PerfilMiembro : {}", id);
        perfilMiembroRepository.deleteById(id);
        perfilMiembroSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/perfil-miembros?query=:query : search for the perfilMiembro corresponding
     * to the query.
     *
     * @param query the query of the perfilMiembro search
     * @return the result of the search
     */
    @GetMapping("/_search/perfil-miembros")
    public List<PerfilMiembro> searchPerfilMiembros(@RequestParam String query) {
        log.debug("REST request to search PerfilMiembros for query {}", query);
        return StreamSupport
            .stream(perfilMiembroSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
