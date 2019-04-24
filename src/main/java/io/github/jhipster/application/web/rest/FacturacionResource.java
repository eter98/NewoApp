package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Facturacion;
import io.github.jhipster.application.repository.FacturacionRepository;
import io.github.jhipster.application.repository.search.FacturacionSearchRepository;
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
 * REST controller for managing Facturacion.
 */
@RestController
@RequestMapping("/api")
public class FacturacionResource {

    private final Logger log = LoggerFactory.getLogger(FacturacionResource.class);

    private static final String ENTITY_NAME = "facturacion";

    private final FacturacionRepository facturacionRepository;

    private final FacturacionSearchRepository facturacionSearchRepository;

    public FacturacionResource(FacturacionRepository facturacionRepository, FacturacionSearchRepository facturacionSearchRepository) {
        this.facturacionRepository = facturacionRepository;
        this.facturacionSearchRepository = facturacionSearchRepository;
    }

    /**
     * POST  /facturacions : Create a new facturacion.
     *
     * @param facturacion the facturacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new facturacion, or with status 400 (Bad Request) if the facturacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/facturacions")
    public ResponseEntity<Facturacion> createFacturacion(@RequestBody Facturacion facturacion) throws URISyntaxException {
        log.debug("REST request to save Facturacion : {}", facturacion);
        if (facturacion.getId() != null) {
            throw new BadRequestAlertException("A new facturacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Facturacion result = facturacionRepository.save(facturacion);
        facturacionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/facturacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /facturacions : Updates an existing facturacion.
     *
     * @param facturacion the facturacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated facturacion,
     * or with status 400 (Bad Request) if the facturacion is not valid,
     * or with status 500 (Internal Server Error) if the facturacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/facturacions")
    public ResponseEntity<Facturacion> updateFacturacion(@RequestBody Facturacion facturacion) throws URISyntaxException {
        log.debug("REST request to update Facturacion : {}", facturacion);
        if (facturacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Facturacion result = facturacionRepository.save(facturacion);
        facturacionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, facturacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /facturacions : get all the facturacions.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of facturacions in body
     */
    @GetMapping("/facturacions")
    public List<Facturacion> getAllFacturacions(@RequestParam(required = false) String filter) {
        if ("equipoempresas-is-null".equals(filter)) {
            log.debug("REST request to get all Facturacions where equipoEmpresas is null");
            return StreamSupport
                .stream(facturacionRepository.findAll().spliterator(), false)
                .filter(facturacion -> facturacion.getEquipoEmpresas() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Facturacions");
        return facturacionRepository.findAll();
    }

    /**
     * GET  /facturacions/:id : get the "id" facturacion.
     *
     * @param id the id of the facturacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the facturacion, or with status 404 (Not Found)
     */
    @GetMapping("/facturacions/{id}")
    public ResponseEntity<Facturacion> getFacturacion(@PathVariable Long id) {
        log.debug("REST request to get Facturacion : {}", id);
        Optional<Facturacion> facturacion = facturacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facturacion);
    }

    /**
     * DELETE  /facturacions/:id : delete the "id" facturacion.
     *
     * @param id the id of the facturacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/facturacions/{id}")
    public ResponseEntity<Void> deleteFacturacion(@PathVariable Long id) {
        log.debug("REST request to delete Facturacion : {}", id);
        facturacionRepository.deleteById(id);
        facturacionSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/facturacions?query=:query : search for the facturacion corresponding
     * to the query.
     *
     * @param query the query of the facturacion search
     * @return the result of the search
     */
    @GetMapping("/_search/facturacions")
    public List<Facturacion> searchFacturacions(@RequestParam String query) {
        log.debug("REST request to search Facturacions for query {}", query);
        return StreamSupport
            .stream(facturacionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
