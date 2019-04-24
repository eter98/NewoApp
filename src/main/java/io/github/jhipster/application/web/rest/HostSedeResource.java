package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.HostSede;
import io.github.jhipster.application.repository.HostSedeRepository;
import io.github.jhipster.application.repository.search.HostSedeSearchRepository;
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
 * REST controller for managing HostSede.
 */
@RestController
@RequestMapping("/api")
public class HostSedeResource {

    private final Logger log = LoggerFactory.getLogger(HostSedeResource.class);

    private static final String ENTITY_NAME = "hostSede";

    private final HostSedeRepository hostSedeRepository;

    private final HostSedeSearchRepository hostSedeSearchRepository;

    public HostSedeResource(HostSedeRepository hostSedeRepository, HostSedeSearchRepository hostSedeSearchRepository) {
        this.hostSedeRepository = hostSedeRepository;
        this.hostSedeSearchRepository = hostSedeSearchRepository;
    }

    /**
     * POST  /host-sedes : Create a new hostSede.
     *
     * @param hostSede the hostSede to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hostSede, or with status 400 (Bad Request) if the hostSede has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/host-sedes")
    public ResponseEntity<HostSede> createHostSede(@RequestBody HostSede hostSede) throws URISyntaxException {
        log.debug("REST request to save HostSede : {}", hostSede);
        if (hostSede.getId() != null) {
            throw new BadRequestAlertException("A new hostSede cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HostSede result = hostSedeRepository.save(hostSede);
        hostSedeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/host-sedes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /host-sedes : Updates an existing hostSede.
     *
     * @param hostSede the hostSede to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hostSede,
     * or with status 400 (Bad Request) if the hostSede is not valid,
     * or with status 500 (Internal Server Error) if the hostSede couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/host-sedes")
    public ResponseEntity<HostSede> updateHostSede(@RequestBody HostSede hostSede) throws URISyntaxException {
        log.debug("REST request to update HostSede : {}", hostSede);
        if (hostSede.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HostSede result = hostSedeRepository.save(hostSede);
        hostSedeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hostSede.getId().toString()))
            .body(result);
    }

    /**
     * GET  /host-sedes : get all the hostSedes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of hostSedes in body
     */
    @GetMapping("/host-sedes")
    public List<HostSede> getAllHostSedes(@RequestParam(required = false) String filter) {
        if ("miembros-is-null".equals(filter)) {
            log.debug("REST request to get all HostSedes where miembros is null");
            return StreamSupport
                .stream(hostSedeRepository.findAll().spliterator(), false)
                .filter(hostSede -> hostSede.getMiembros() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all HostSedes");
        return hostSedeRepository.findAll();
    }

    /**
     * GET  /host-sedes/:id : get the "id" hostSede.
     *
     * @param id the id of the hostSede to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hostSede, or with status 404 (Not Found)
     */
    @GetMapping("/host-sedes/{id}")
    public ResponseEntity<HostSede> getHostSede(@PathVariable Long id) {
        log.debug("REST request to get HostSede : {}", id);
        Optional<HostSede> hostSede = hostSedeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hostSede);
    }

    /**
     * DELETE  /host-sedes/:id : delete the "id" hostSede.
     *
     * @param id the id of the hostSede to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/host-sedes/{id}")
    public ResponseEntity<Void> deleteHostSede(@PathVariable Long id) {
        log.debug("REST request to delete HostSede : {}", id);
        hostSedeRepository.deleteById(id);
        hostSedeSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/host-sedes?query=:query : search for the hostSede corresponding
     * to the query.
     *
     * @param query the query of the hostSede search
     * @return the result of the search
     */
    @GetMapping("/_search/host-sedes")
    public List<HostSede> searchHostSedes(@RequestParam String query) {
        log.debug("REST request to search HostSedes for query {}", query);
        return StreamSupport
            .stream(hostSedeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
