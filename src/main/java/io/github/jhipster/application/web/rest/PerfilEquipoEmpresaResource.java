package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.PerfilEquipoEmpresa;
import io.github.jhipster.application.repository.PerfilEquipoEmpresaRepository;
import io.github.jhipster.application.repository.search.PerfilEquipoEmpresaSearchRepository;
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
 * REST controller for managing PerfilEquipoEmpresa.
 */
@RestController
@RequestMapping("/api")
public class PerfilEquipoEmpresaResource {

    private final Logger log = LoggerFactory.getLogger(PerfilEquipoEmpresaResource.class);

    private static final String ENTITY_NAME = "perfilEquipoEmpresa";

    private final PerfilEquipoEmpresaRepository perfilEquipoEmpresaRepository;

    private final PerfilEquipoEmpresaSearchRepository perfilEquipoEmpresaSearchRepository;

    public PerfilEquipoEmpresaResource(PerfilEquipoEmpresaRepository perfilEquipoEmpresaRepository, PerfilEquipoEmpresaSearchRepository perfilEquipoEmpresaSearchRepository) {
        this.perfilEquipoEmpresaRepository = perfilEquipoEmpresaRepository;
        this.perfilEquipoEmpresaSearchRepository = perfilEquipoEmpresaSearchRepository;
    }

    /**
     * POST  /perfil-equipo-empresas : Create a new perfilEquipoEmpresa.
     *
     * @param perfilEquipoEmpresa the perfilEquipoEmpresa to create
     * @return the ResponseEntity with status 201 (Created) and with body the new perfilEquipoEmpresa, or with status 400 (Bad Request) if the perfilEquipoEmpresa has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/perfil-equipo-empresas")
    public ResponseEntity<PerfilEquipoEmpresa> createPerfilEquipoEmpresa(@RequestBody PerfilEquipoEmpresa perfilEquipoEmpresa) throws URISyntaxException {
        log.debug("REST request to save PerfilEquipoEmpresa : {}", perfilEquipoEmpresa);
        if (perfilEquipoEmpresa.getId() != null) {
            throw new BadRequestAlertException("A new perfilEquipoEmpresa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PerfilEquipoEmpresa result = perfilEquipoEmpresaRepository.save(perfilEquipoEmpresa);
        perfilEquipoEmpresaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/perfil-equipo-empresas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /perfil-equipo-empresas : Updates an existing perfilEquipoEmpresa.
     *
     * @param perfilEquipoEmpresa the perfilEquipoEmpresa to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated perfilEquipoEmpresa,
     * or with status 400 (Bad Request) if the perfilEquipoEmpresa is not valid,
     * or with status 500 (Internal Server Error) if the perfilEquipoEmpresa couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/perfil-equipo-empresas")
    public ResponseEntity<PerfilEquipoEmpresa> updatePerfilEquipoEmpresa(@RequestBody PerfilEquipoEmpresa perfilEquipoEmpresa) throws URISyntaxException {
        log.debug("REST request to update PerfilEquipoEmpresa : {}", perfilEquipoEmpresa);
        if (perfilEquipoEmpresa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PerfilEquipoEmpresa result = perfilEquipoEmpresaRepository.save(perfilEquipoEmpresa);
        perfilEquipoEmpresaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, perfilEquipoEmpresa.getId().toString()))
            .body(result);
    }

    /**
     * GET  /perfil-equipo-empresas : get all the perfilEquipoEmpresas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of perfilEquipoEmpresas in body
     */
    @GetMapping("/perfil-equipo-empresas")
    public List<PerfilEquipoEmpresa> getAllPerfilEquipoEmpresas(@RequestParam(required = false) String filter) {
        if ("equipoempresas-is-null".equals(filter)) {
            log.debug("REST request to get all PerfilEquipoEmpresas where equipoEmpresas is null");
            return StreamSupport
                .stream(perfilEquipoEmpresaRepository.findAll().spliterator(), false)
                .filter(perfilEquipoEmpresa -> perfilEquipoEmpresa.getEquipoEmpresas() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all PerfilEquipoEmpresas");
        return perfilEquipoEmpresaRepository.findAll();
    }

    /**
     * GET  /perfil-equipo-empresas/:id : get the "id" perfilEquipoEmpresa.
     *
     * @param id the id of the perfilEquipoEmpresa to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the perfilEquipoEmpresa, or with status 404 (Not Found)
     */
    @GetMapping("/perfil-equipo-empresas/{id}")
    public ResponseEntity<PerfilEquipoEmpresa> getPerfilEquipoEmpresa(@PathVariable Long id) {
        log.debug("REST request to get PerfilEquipoEmpresa : {}", id);
        Optional<PerfilEquipoEmpresa> perfilEquipoEmpresa = perfilEquipoEmpresaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(perfilEquipoEmpresa);
    }

    /**
     * DELETE  /perfil-equipo-empresas/:id : delete the "id" perfilEquipoEmpresa.
     *
     * @param id the id of the perfilEquipoEmpresa to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/perfil-equipo-empresas/{id}")
    public ResponseEntity<Void> deletePerfilEquipoEmpresa(@PathVariable Long id) {
        log.debug("REST request to delete PerfilEquipoEmpresa : {}", id);
        perfilEquipoEmpresaRepository.deleteById(id);
        perfilEquipoEmpresaSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/perfil-equipo-empresas?query=:query : search for the perfilEquipoEmpresa corresponding
     * to the query.
     *
     * @param query the query of the perfilEquipoEmpresa search
     * @return the result of the search
     */
    @GetMapping("/_search/perfil-equipo-empresas")
    public List<PerfilEquipoEmpresa> searchPerfilEquipoEmpresas(@RequestParam String query) {
        log.debug("REST request to search PerfilEquipoEmpresas for query {}", query);
        return StreamSupport
            .stream(perfilEquipoEmpresaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
