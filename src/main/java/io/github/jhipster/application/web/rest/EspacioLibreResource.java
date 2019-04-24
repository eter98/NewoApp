package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.EspacioLibre;
import io.github.jhipster.application.repository.EspacioLibreRepository;
import io.github.jhipster.application.repository.search.EspacioLibreSearchRepository;
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
 * REST controller for managing EspacioLibre.
 */
@RestController
@RequestMapping("/api")
public class EspacioLibreResource {

    private final Logger log = LoggerFactory.getLogger(EspacioLibreResource.class);

    private static final String ENTITY_NAME = "espacioLibre";

    private final EspacioLibreRepository espacioLibreRepository;

    private final EspacioLibreSearchRepository espacioLibreSearchRepository;

    public EspacioLibreResource(EspacioLibreRepository espacioLibreRepository, EspacioLibreSearchRepository espacioLibreSearchRepository) {
        this.espacioLibreRepository = espacioLibreRepository;
        this.espacioLibreSearchRepository = espacioLibreSearchRepository;
    }

    /**
     * POST  /espacio-libres : Create a new espacioLibre.
     *
     * @param espacioLibre the espacioLibre to create
     * @return the ResponseEntity with status 201 (Created) and with body the new espacioLibre, or with status 400 (Bad Request) if the espacioLibre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/espacio-libres")
    public ResponseEntity<EspacioLibre> createEspacioLibre(@RequestBody EspacioLibre espacioLibre) throws URISyntaxException {
        log.debug("REST request to save EspacioLibre : {}", espacioLibre);
        if (espacioLibre.getId() != null) {
            throw new BadRequestAlertException("A new espacioLibre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EspacioLibre result = espacioLibreRepository.save(espacioLibre);
        espacioLibreSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/espacio-libres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /espacio-libres : Updates an existing espacioLibre.
     *
     * @param espacioLibre the espacioLibre to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated espacioLibre,
     * or with status 400 (Bad Request) if the espacioLibre is not valid,
     * or with status 500 (Internal Server Error) if the espacioLibre couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/espacio-libres")
    public ResponseEntity<EspacioLibre> updateEspacioLibre(@RequestBody EspacioLibre espacioLibre) throws URISyntaxException {
        log.debug("REST request to update EspacioLibre : {}", espacioLibre);
        if (espacioLibre.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EspacioLibre result = espacioLibreRepository.save(espacioLibre);
        espacioLibreSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, espacioLibre.getId().toString()))
            .body(result);
    }

    /**
     * GET  /espacio-libres : get all the espacioLibres.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of espacioLibres in body
     */
    @GetMapping("/espacio-libres")
    public List<EspacioLibre> getAllEspacioLibres(@RequestParam(required = false) String filter) {
        if ("sedes-is-null".equals(filter)) {
            log.debug("REST request to get all EspacioLibres where sedes is null");
            return StreamSupport
                .stream(espacioLibreRepository.findAll().spliterator(), false)
                .filter(espacioLibre -> espacioLibre.getSedes() == null)
                .collect(Collectors.toList());
        }
        if ("miembros-is-null".equals(filter)) {
            log.debug("REST request to get all EspacioLibres where miembros is null");
            return StreamSupport
                .stream(espacioLibreRepository.findAll().spliterator(), false)
                .filter(espacioLibre -> espacioLibre.getMiembros() == null)
                .collect(Collectors.toList());
        }
        if ("entradainvitados-is-null".equals(filter)) {
            log.debug("REST request to get all EspacioLibres where entradaInvitados is null");
            return StreamSupport
                .stream(espacioLibreRepository.findAll().spliterator(), false)
                .filter(espacioLibre -> espacioLibre.getEntradaInvitados() == null)
                .collect(Collectors.toList());
        }
        if ("registrocompra-is-null".equals(filter)) {
            log.debug("REST request to get all EspacioLibres where registroCompra is null");
            return StreamSupport
                .stream(espacioLibreRepository.findAll().spliterator(), false)
                .filter(espacioLibre -> espacioLibre.getRegistroCompra() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all EspacioLibres");
        return espacioLibreRepository.findAll();
    }

    /**
     * GET  /espacio-libres/:id : get the "id" espacioLibre.
     *
     * @param id the id of the espacioLibre to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the espacioLibre, or with status 404 (Not Found)
     */
    @GetMapping("/espacio-libres/{id}")
    public ResponseEntity<EspacioLibre> getEspacioLibre(@PathVariable Long id) {
        log.debug("REST request to get EspacioLibre : {}", id);
        Optional<EspacioLibre> espacioLibre = espacioLibreRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(espacioLibre);
    }

    /**
     * DELETE  /espacio-libres/:id : delete the "id" espacioLibre.
     *
     * @param id the id of the espacioLibre to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/espacio-libres/{id}")
    public ResponseEntity<Void> deleteEspacioLibre(@PathVariable Long id) {
        log.debug("REST request to delete EspacioLibre : {}", id);
        espacioLibreRepository.deleteById(id);
        espacioLibreSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/espacio-libres?query=:query : search for the espacioLibre corresponding
     * to the query.
     *
     * @param query the query of the espacioLibre search
     * @return the result of the search
     */
    @GetMapping("/_search/espacio-libres")
    public List<EspacioLibre> searchEspacioLibres(@RequestParam String query) {
        log.debug("REST request to search EspacioLibres for query {}", query);
        return StreamSupport
            .stream(espacioLibreSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
