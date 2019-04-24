package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.TarifaLanding;
import io.github.jhipster.application.repository.TarifaLandingRepository;
import io.github.jhipster.application.repository.search.TarifaLandingSearchRepository;
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
 * REST controller for managing TarifaLanding.
 */
@RestController
@RequestMapping("/api")
public class TarifaLandingResource {

    private final Logger log = LoggerFactory.getLogger(TarifaLandingResource.class);

    private static final String ENTITY_NAME = "tarifaLanding";

    private final TarifaLandingRepository tarifaLandingRepository;

    private final TarifaLandingSearchRepository tarifaLandingSearchRepository;

    public TarifaLandingResource(TarifaLandingRepository tarifaLandingRepository, TarifaLandingSearchRepository tarifaLandingSearchRepository) {
        this.tarifaLandingRepository = tarifaLandingRepository;
        this.tarifaLandingSearchRepository = tarifaLandingSearchRepository;
    }

    /**
     * POST  /tarifa-landings : Create a new tarifaLanding.
     *
     * @param tarifaLanding the tarifaLanding to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tarifaLanding, or with status 400 (Bad Request) if the tarifaLanding has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tarifa-landings")
    public ResponseEntity<TarifaLanding> createTarifaLanding(@RequestBody TarifaLanding tarifaLanding) throws URISyntaxException {
        log.debug("REST request to save TarifaLanding : {}", tarifaLanding);
        if (tarifaLanding.getId() != null) {
            throw new BadRequestAlertException("A new tarifaLanding cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TarifaLanding result = tarifaLandingRepository.save(tarifaLanding);
        tarifaLandingSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/tarifa-landings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tarifa-landings : Updates an existing tarifaLanding.
     *
     * @param tarifaLanding the tarifaLanding to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tarifaLanding,
     * or with status 400 (Bad Request) if the tarifaLanding is not valid,
     * or with status 500 (Internal Server Error) if the tarifaLanding couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tarifa-landings")
    public ResponseEntity<TarifaLanding> updateTarifaLanding(@RequestBody TarifaLanding tarifaLanding) throws URISyntaxException {
        log.debug("REST request to update TarifaLanding : {}", tarifaLanding);
        if (tarifaLanding.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TarifaLanding result = tarifaLandingRepository.save(tarifaLanding);
        tarifaLandingSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tarifaLanding.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tarifa-landings : get all the tarifaLandings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tarifaLandings in body
     */
    @GetMapping("/tarifa-landings")
    public List<TarifaLanding> getAllTarifaLandings() {
        log.debug("REST request to get all TarifaLandings");
        return tarifaLandingRepository.findAll();
    }

    /**
     * GET  /tarifa-landings/:id : get the "id" tarifaLanding.
     *
     * @param id the id of the tarifaLanding to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tarifaLanding, or with status 404 (Not Found)
     */
    @GetMapping("/tarifa-landings/{id}")
    public ResponseEntity<TarifaLanding> getTarifaLanding(@PathVariable Long id) {
        log.debug("REST request to get TarifaLanding : {}", id);
        Optional<TarifaLanding> tarifaLanding = tarifaLandingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tarifaLanding);
    }

    /**
     * DELETE  /tarifa-landings/:id : delete the "id" tarifaLanding.
     *
     * @param id the id of the tarifaLanding to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tarifa-landings/{id}")
    public ResponseEntity<Void> deleteTarifaLanding(@PathVariable Long id) {
        log.debug("REST request to delete TarifaLanding : {}", id);
        tarifaLandingRepository.deleteById(id);
        tarifaLandingSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tarifa-landings?query=:query : search for the tarifaLanding corresponding
     * to the query.
     *
     * @param query the query of the tarifaLanding search
     * @return the result of the search
     */
    @GetMapping("/_search/tarifa-landings")
    public List<TarifaLanding> searchTarifaLandings(@RequestParam String query) {
        log.debug("REST request to search TarifaLandings for query {}", query);
        return StreamSupport
            .stream(tarifaLandingSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
