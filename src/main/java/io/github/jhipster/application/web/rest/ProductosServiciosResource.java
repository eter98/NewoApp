package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.ProductosServicios;
import io.github.jhipster.application.repository.ProductosServiciosRepository;
import io.github.jhipster.application.repository.search.ProductosServiciosSearchRepository;
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
 * REST controller for managing ProductosServicios.
 */
@RestController
@RequestMapping("/api")
public class ProductosServiciosResource {

    private final Logger log = LoggerFactory.getLogger(ProductosServiciosResource.class);

    private static final String ENTITY_NAME = "productosServicios";

    private final ProductosServiciosRepository productosServiciosRepository;

    private final ProductosServiciosSearchRepository productosServiciosSearchRepository;

    public ProductosServiciosResource(ProductosServiciosRepository productosServiciosRepository, ProductosServiciosSearchRepository productosServiciosSearchRepository) {
        this.productosServiciosRepository = productosServiciosRepository;
        this.productosServiciosSearchRepository = productosServiciosSearchRepository;
    }

    /**
     * POST  /productos-servicios : Create a new productosServicios.
     *
     * @param productosServicios the productosServicios to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productosServicios, or with status 400 (Bad Request) if the productosServicios has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/productos-servicios")
    public ResponseEntity<ProductosServicios> createProductosServicios(@RequestBody ProductosServicios productosServicios) throws URISyntaxException {
        log.debug("REST request to save ProductosServicios : {}", productosServicios);
        if (productosServicios.getId() != null) {
            throw new BadRequestAlertException("A new productosServicios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductosServicios result = productosServiciosRepository.save(productosServicios);
        productosServiciosSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/productos-servicios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /productos-servicios : Updates an existing productosServicios.
     *
     * @param productosServicios the productosServicios to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productosServicios,
     * or with status 400 (Bad Request) if the productosServicios is not valid,
     * or with status 500 (Internal Server Error) if the productosServicios couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/productos-servicios")
    public ResponseEntity<ProductosServicios> updateProductosServicios(@RequestBody ProductosServicios productosServicios) throws URISyntaxException {
        log.debug("REST request to update ProductosServicios : {}", productosServicios);
        if (productosServicios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductosServicios result = productosServiciosRepository.save(productosServicios);
        productosServiciosSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productosServicios.getId().toString()))
            .body(result);
    }

    /**
     * GET  /productos-servicios : get all the productosServicios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productosServicios in body
     */
    @GetMapping("/productos-servicios")
    public List<ProductosServicios> getAllProductosServicios() {
        log.debug("REST request to get all ProductosServicios");
        return productosServiciosRepository.findAll();
    }

    /**
     * GET  /productos-servicios/:id : get the "id" productosServicios.
     *
     * @param id the id of the productosServicios to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productosServicios, or with status 404 (Not Found)
     */
    @GetMapping("/productos-servicios/{id}")
    public ResponseEntity<ProductosServicios> getProductosServicios(@PathVariable Long id) {
        log.debug("REST request to get ProductosServicios : {}", id);
        Optional<ProductosServicios> productosServicios = productosServiciosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productosServicios);
    }

    /**
     * DELETE  /productos-servicios/:id : delete the "id" productosServicios.
     *
     * @param id the id of the productosServicios to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/productos-servicios/{id}")
    public ResponseEntity<Void> deleteProductosServicios(@PathVariable Long id) {
        log.debug("REST request to delete ProductosServicios : {}", id);
        productosServiciosRepository.deleteById(id);
        productosServiciosSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/productos-servicios?query=:query : search for the productosServicios corresponding
     * to the query.
     *
     * @param query the query of the productosServicios search
     * @return the result of the search
     */
    @GetMapping("/_search/productos-servicios")
    public List<ProductosServicios> searchProductosServicios(@RequestParam String query) {
        log.debug("REST request to search ProductosServicios for query {}", query);
        return StreamSupport
            .stream(productosServiciosSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
