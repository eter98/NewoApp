package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.EspaciosReserva;
import io.github.jhipster.application.repository.EspaciosReservaRepository;
import io.github.jhipster.application.repository.search.EspaciosReservaSearchRepository;
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
 * REST controller for managing EspaciosReserva.
 */
@RestController
@RequestMapping("/api")
public class EspaciosReservaResource {

    private final Logger log = LoggerFactory.getLogger(EspaciosReservaResource.class);

    private static final String ENTITY_NAME = "espaciosReserva";

    private final EspaciosReservaRepository espaciosReservaRepository;

    private final EspaciosReservaSearchRepository espaciosReservaSearchRepository;

    public EspaciosReservaResource(EspaciosReservaRepository espaciosReservaRepository, EspaciosReservaSearchRepository espaciosReservaSearchRepository) {
        this.espaciosReservaRepository = espaciosReservaRepository;
        this.espaciosReservaSearchRepository = espaciosReservaSearchRepository;
    }

    /**
     * POST  /espacios-reservas : Create a new espaciosReserva.
     *
     * @param espaciosReserva the espaciosReserva to create
     * @return the ResponseEntity with status 201 (Created) and with body the new espaciosReserva, or with status 400 (Bad Request) if the espaciosReserva has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/espacios-reservas")
    public ResponseEntity<EspaciosReserva> createEspaciosReserva(@RequestBody EspaciosReserva espaciosReserva) throws URISyntaxException {
        log.debug("REST request to save EspaciosReserva : {}", espaciosReserva);
        if (espaciosReserva.getId() != null) {
            throw new BadRequestAlertException("A new espaciosReserva cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EspaciosReserva result = espaciosReservaRepository.save(espaciosReserva);
        espaciosReservaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/espacios-reservas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /espacios-reservas : Updates an existing espaciosReserva.
     *
     * @param espaciosReserva the espaciosReserva to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated espaciosReserva,
     * or with status 400 (Bad Request) if the espaciosReserva is not valid,
     * or with status 500 (Internal Server Error) if the espaciosReserva couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/espacios-reservas")
    public ResponseEntity<EspaciosReserva> updateEspaciosReserva(@RequestBody EspaciosReserva espaciosReserva) throws URISyntaxException {
        log.debug("REST request to update EspaciosReserva : {}", espaciosReserva);
        if (espaciosReserva.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EspaciosReserva result = espaciosReservaRepository.save(espaciosReserva);
        espaciosReservaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, espaciosReserva.getId().toString()))
            .body(result);
    }

    /**
     * GET  /espacios-reservas : get all the espaciosReservas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of espaciosReservas in body
     */
    @GetMapping("/espacios-reservas")
    public List<EspaciosReserva> getAllEspaciosReservas(@RequestParam(required = false) String filter) {
        if ("sedes-is-null".equals(filter)) {
            log.debug("REST request to get all EspaciosReservas where sedes is null");
            return StreamSupport
                .stream(espaciosReservaRepository.findAll().spliterator(), false)
                .filter(espaciosReserva -> espaciosReserva.getSedes() == null)
                .collect(Collectors.toList());
        }
        if ("reservas-is-null".equals(filter)) {
            log.debug("REST request to get all EspaciosReservas where reservas is null");
            return StreamSupport
                .stream(espaciosReservaRepository.findAll().spliterator(), false)
                .filter(espaciosReserva -> espaciosReserva.getReservas() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all EspaciosReservas");
        return espaciosReservaRepository.findAll();
    }

    /**
     * GET  /espacios-reservas/:id : get the "id" espaciosReserva.
     *
     * @param id the id of the espaciosReserva to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the espaciosReserva, or with status 404 (Not Found)
     */
    @GetMapping("/espacios-reservas/{id}")
    public ResponseEntity<EspaciosReserva> getEspaciosReserva(@PathVariable Long id) {
        log.debug("REST request to get EspaciosReserva : {}", id);
        Optional<EspaciosReserva> espaciosReserva = espaciosReservaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(espaciosReserva);
    }

    /**
     * DELETE  /espacios-reservas/:id : delete the "id" espaciosReserva.
     *
     * @param id the id of the espaciosReserva to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/espacios-reservas/{id}")
    public ResponseEntity<Void> deleteEspaciosReserva(@PathVariable Long id) {
        log.debug("REST request to delete EspaciosReserva : {}", id);
        espaciosReservaRepository.deleteById(id);
        espaciosReservaSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/espacios-reservas?query=:query : search for the espaciosReserva corresponding
     * to the query.
     *
     * @param query the query of the espaciosReserva search
     * @return the result of the search
     */
    @GetMapping("/_search/espacios-reservas")
    public List<EspaciosReserva> searchEspaciosReservas(@RequestParam String query) {
        log.debug("REST request to search EspaciosReservas for query {}", query);
        return StreamSupport
            .stream(espaciosReservaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
