package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.RegistroCompra;
import io.github.jhipster.application.repository.RegistroCompraRepository;
import io.github.jhipster.application.repository.search.RegistroCompraSearchRepository;
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
 * REST controller for managing RegistroCompra.
 */
@RestController
@RequestMapping("/api")
public class RegistroCompraResource {

    private final Logger log = LoggerFactory.getLogger(RegistroCompraResource.class);

    private static final String ENTITY_NAME = "registroCompra";

    private final RegistroCompraRepository registroCompraRepository;

    private final RegistroCompraSearchRepository registroCompraSearchRepository;

    public RegistroCompraResource(RegistroCompraRepository registroCompraRepository, RegistroCompraSearchRepository registroCompraSearchRepository) {
        this.registroCompraRepository = registroCompraRepository;
        this.registroCompraSearchRepository = registroCompraSearchRepository;
    }

    /**
     * POST  /registro-compras : Create a new registroCompra.
     *
     * @param registroCompra the registroCompra to create
     * @return the ResponseEntity with status 201 (Created) and with body the new registroCompra, or with status 400 (Bad Request) if the registroCompra has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/registro-compras")
    public ResponseEntity<RegistroCompra> createRegistroCompra(@RequestBody RegistroCompra registroCompra) throws URISyntaxException {
        log.debug("REST request to save RegistroCompra : {}", registroCompra);
        if (registroCompra.getId() != null) {
            throw new BadRequestAlertException("A new registroCompra cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RegistroCompra result = registroCompraRepository.save(registroCompra);
        registroCompraSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/registro-compras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /registro-compras : Updates an existing registroCompra.
     *
     * @param registroCompra the registroCompra to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated registroCompra,
     * or with status 400 (Bad Request) if the registroCompra is not valid,
     * or with status 500 (Internal Server Error) if the registroCompra couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/registro-compras")
    public ResponseEntity<RegistroCompra> updateRegistroCompra(@RequestBody RegistroCompra registroCompra) throws URISyntaxException {
        log.debug("REST request to update RegistroCompra : {}", registroCompra);
        if (registroCompra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RegistroCompra result = registroCompraRepository.save(registroCompra);
        registroCompraSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, registroCompra.getId().toString()))
            .body(result);
    }

    /**
     * GET  /registro-compras : get all the registroCompras.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of registroCompras in body
     */
    @GetMapping("/registro-compras")
    public List<RegistroCompra> getAllRegistroCompras() {
        log.debug("REST request to get all RegistroCompras");
        return registroCompraRepository.findAll();
    }

    /**
     * GET  /registro-compras/:id : get the "id" registroCompra.
     *
     * @param id the id of the registroCompra to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the registroCompra, or with status 404 (Not Found)
     */
    @GetMapping("/registro-compras/{id}")
    public ResponseEntity<RegistroCompra> getRegistroCompra(@PathVariable Long id) {
        log.debug("REST request to get RegistroCompra : {}", id);
        Optional<RegistroCompra> registroCompra = registroCompraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(registroCompra);
    }

    /**
     * DELETE  /registro-compras/:id : delete the "id" registroCompra.
     *
     * @param id the id of the registroCompra to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/registro-compras/{id}")
    public ResponseEntity<Void> deleteRegistroCompra(@PathVariable Long id) {
        log.debug("REST request to delete RegistroCompra : {}", id);
        registroCompraRepository.deleteById(id);
        registroCompraSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/registro-compras?query=:query : search for the registroCompra corresponding
     * to the query.
     *
     * @param query the query of the registroCompra search
     * @return the result of the search
     */
    @GetMapping("/_search/registro-compras")
    public List<RegistroCompra> searchRegistroCompras(@RequestParam String query) {
        log.debug("REST request to search RegistroCompras for query {}", query);
        return StreamSupport
            .stream(registroCompraSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
