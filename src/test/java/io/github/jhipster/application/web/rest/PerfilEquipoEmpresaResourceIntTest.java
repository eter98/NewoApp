package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.PerfilEquipoEmpresa;
import io.github.jhipster.application.repository.PerfilEquipoEmpresaRepository;
import io.github.jhipster.application.repository.search.PerfilEquipoEmpresaSearchRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PerfilEquipoEmpresaResource REST controller.
 *
 * @see PerfilEquipoEmpresaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class PerfilEquipoEmpresaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Integer DEFAULT_INVENTARIABLE = 1;
    private static final Integer UPDATED_INVENTARIABLE = 2;

    private static final Integer DEFAULT_VALOR = 1;
    private static final Integer UPDATED_VALOR = 2;

    private static final Integer DEFAULT_IMPUESTO = 1;
    private static final Integer UPDATED_IMPUESTO = 2;

    @Autowired
    private PerfilEquipoEmpresaRepository perfilEquipoEmpresaRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.PerfilEquipoEmpresaSearchRepositoryMockConfiguration
     */
    @Autowired
    private PerfilEquipoEmpresaSearchRepository mockPerfilEquipoEmpresaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPerfilEquipoEmpresaMockMvc;

    private PerfilEquipoEmpresa perfilEquipoEmpresa;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PerfilEquipoEmpresaResource perfilEquipoEmpresaResource = new PerfilEquipoEmpresaResource(perfilEquipoEmpresaRepository, mockPerfilEquipoEmpresaSearchRepository);
        this.restPerfilEquipoEmpresaMockMvc = MockMvcBuilders.standaloneSetup(perfilEquipoEmpresaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PerfilEquipoEmpresa createEntity(EntityManager em) {
        PerfilEquipoEmpresa perfilEquipoEmpresa = new PerfilEquipoEmpresa()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .inventariable(DEFAULT_INVENTARIABLE)
            .valor(DEFAULT_VALOR)
            .impuesto(DEFAULT_IMPUESTO);
        return perfilEquipoEmpresa;
    }

    @Before
    public void initTest() {
        perfilEquipoEmpresa = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerfilEquipoEmpresa() throws Exception {
        int databaseSizeBeforeCreate = perfilEquipoEmpresaRepository.findAll().size();

        // Create the PerfilEquipoEmpresa
        restPerfilEquipoEmpresaMockMvc.perform(post("/api/perfil-equipo-empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perfilEquipoEmpresa)))
            .andExpect(status().isCreated());

        // Validate the PerfilEquipoEmpresa in the database
        List<PerfilEquipoEmpresa> perfilEquipoEmpresaList = perfilEquipoEmpresaRepository.findAll();
        assertThat(perfilEquipoEmpresaList).hasSize(databaseSizeBeforeCreate + 1);
        PerfilEquipoEmpresa testPerfilEquipoEmpresa = perfilEquipoEmpresaList.get(perfilEquipoEmpresaList.size() - 1);
        assertThat(testPerfilEquipoEmpresa.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testPerfilEquipoEmpresa.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testPerfilEquipoEmpresa.getInventariable()).isEqualTo(DEFAULT_INVENTARIABLE);
        assertThat(testPerfilEquipoEmpresa.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testPerfilEquipoEmpresa.getImpuesto()).isEqualTo(DEFAULT_IMPUESTO);

        // Validate the PerfilEquipoEmpresa in Elasticsearch
        verify(mockPerfilEquipoEmpresaSearchRepository, times(1)).save(testPerfilEquipoEmpresa);
    }

    @Test
    @Transactional
    public void createPerfilEquipoEmpresaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = perfilEquipoEmpresaRepository.findAll().size();

        // Create the PerfilEquipoEmpresa with an existing ID
        perfilEquipoEmpresa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPerfilEquipoEmpresaMockMvc.perform(post("/api/perfil-equipo-empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perfilEquipoEmpresa)))
            .andExpect(status().isBadRequest());

        // Validate the PerfilEquipoEmpresa in the database
        List<PerfilEquipoEmpresa> perfilEquipoEmpresaList = perfilEquipoEmpresaRepository.findAll();
        assertThat(perfilEquipoEmpresaList).hasSize(databaseSizeBeforeCreate);

        // Validate the PerfilEquipoEmpresa in Elasticsearch
        verify(mockPerfilEquipoEmpresaSearchRepository, times(0)).save(perfilEquipoEmpresa);
    }

    @Test
    @Transactional
    public void getAllPerfilEquipoEmpresas() throws Exception {
        // Initialize the database
        perfilEquipoEmpresaRepository.saveAndFlush(perfilEquipoEmpresa);

        // Get all the perfilEquipoEmpresaList
        restPerfilEquipoEmpresaMockMvc.perform(get("/api/perfil-equipo-empresas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perfilEquipoEmpresa.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].inventariable").value(hasItem(DEFAULT_INVENTARIABLE)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)))
            .andExpect(jsonPath("$.[*].impuesto").value(hasItem(DEFAULT_IMPUESTO)));
    }
    
    @Test
    @Transactional
    public void getPerfilEquipoEmpresa() throws Exception {
        // Initialize the database
        perfilEquipoEmpresaRepository.saveAndFlush(perfilEquipoEmpresa);

        // Get the perfilEquipoEmpresa
        restPerfilEquipoEmpresaMockMvc.perform(get("/api/perfil-equipo-empresas/{id}", perfilEquipoEmpresa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(perfilEquipoEmpresa.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.inventariable").value(DEFAULT_INVENTARIABLE))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR))
            .andExpect(jsonPath("$.impuesto").value(DEFAULT_IMPUESTO));
    }

    @Test
    @Transactional
    public void getNonExistingPerfilEquipoEmpresa() throws Exception {
        // Get the perfilEquipoEmpresa
        restPerfilEquipoEmpresaMockMvc.perform(get("/api/perfil-equipo-empresas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerfilEquipoEmpresa() throws Exception {
        // Initialize the database
        perfilEquipoEmpresaRepository.saveAndFlush(perfilEquipoEmpresa);

        int databaseSizeBeforeUpdate = perfilEquipoEmpresaRepository.findAll().size();

        // Update the perfilEquipoEmpresa
        PerfilEquipoEmpresa updatedPerfilEquipoEmpresa = perfilEquipoEmpresaRepository.findById(perfilEquipoEmpresa.getId()).get();
        // Disconnect from session so that the updates on updatedPerfilEquipoEmpresa are not directly saved in db
        em.detach(updatedPerfilEquipoEmpresa);
        updatedPerfilEquipoEmpresa
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .inventariable(UPDATED_INVENTARIABLE)
            .valor(UPDATED_VALOR)
            .impuesto(UPDATED_IMPUESTO);

        restPerfilEquipoEmpresaMockMvc.perform(put("/api/perfil-equipo-empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPerfilEquipoEmpresa)))
            .andExpect(status().isOk());

        // Validate the PerfilEquipoEmpresa in the database
        List<PerfilEquipoEmpresa> perfilEquipoEmpresaList = perfilEquipoEmpresaRepository.findAll();
        assertThat(perfilEquipoEmpresaList).hasSize(databaseSizeBeforeUpdate);
        PerfilEquipoEmpresa testPerfilEquipoEmpresa = perfilEquipoEmpresaList.get(perfilEquipoEmpresaList.size() - 1);
        assertThat(testPerfilEquipoEmpresa.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testPerfilEquipoEmpresa.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPerfilEquipoEmpresa.getInventariable()).isEqualTo(UPDATED_INVENTARIABLE);
        assertThat(testPerfilEquipoEmpresa.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testPerfilEquipoEmpresa.getImpuesto()).isEqualTo(UPDATED_IMPUESTO);

        // Validate the PerfilEquipoEmpresa in Elasticsearch
        verify(mockPerfilEquipoEmpresaSearchRepository, times(1)).save(testPerfilEquipoEmpresa);
    }

    @Test
    @Transactional
    public void updateNonExistingPerfilEquipoEmpresa() throws Exception {
        int databaseSizeBeforeUpdate = perfilEquipoEmpresaRepository.findAll().size();

        // Create the PerfilEquipoEmpresa

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPerfilEquipoEmpresaMockMvc.perform(put("/api/perfil-equipo-empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perfilEquipoEmpresa)))
            .andExpect(status().isBadRequest());

        // Validate the PerfilEquipoEmpresa in the database
        List<PerfilEquipoEmpresa> perfilEquipoEmpresaList = perfilEquipoEmpresaRepository.findAll();
        assertThat(perfilEquipoEmpresaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the PerfilEquipoEmpresa in Elasticsearch
        verify(mockPerfilEquipoEmpresaSearchRepository, times(0)).save(perfilEquipoEmpresa);
    }

    @Test
    @Transactional
    public void deletePerfilEquipoEmpresa() throws Exception {
        // Initialize the database
        perfilEquipoEmpresaRepository.saveAndFlush(perfilEquipoEmpresa);

        int databaseSizeBeforeDelete = perfilEquipoEmpresaRepository.findAll().size();

        // Delete the perfilEquipoEmpresa
        restPerfilEquipoEmpresaMockMvc.perform(delete("/api/perfil-equipo-empresas/{id}", perfilEquipoEmpresa.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PerfilEquipoEmpresa> perfilEquipoEmpresaList = perfilEquipoEmpresaRepository.findAll();
        assertThat(perfilEquipoEmpresaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the PerfilEquipoEmpresa in Elasticsearch
        verify(mockPerfilEquipoEmpresaSearchRepository, times(1)).deleteById(perfilEquipoEmpresa.getId());
    }

    @Test
    @Transactional
    public void searchPerfilEquipoEmpresa() throws Exception {
        // Initialize the database
        perfilEquipoEmpresaRepository.saveAndFlush(perfilEquipoEmpresa);
        when(mockPerfilEquipoEmpresaSearchRepository.search(queryStringQuery("id:" + perfilEquipoEmpresa.getId())))
            .thenReturn(Collections.singletonList(perfilEquipoEmpresa));
        // Search the perfilEquipoEmpresa
        restPerfilEquipoEmpresaMockMvc.perform(get("/api/_search/perfil-equipo-empresas?query=id:" + perfilEquipoEmpresa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perfilEquipoEmpresa.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].inventariable").value(hasItem(DEFAULT_INVENTARIABLE)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)))
            .andExpect(jsonPath("$.[*].impuesto").value(hasItem(DEFAULT_IMPUESTO)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PerfilEquipoEmpresa.class);
        PerfilEquipoEmpresa perfilEquipoEmpresa1 = new PerfilEquipoEmpresa();
        perfilEquipoEmpresa1.setId(1L);
        PerfilEquipoEmpresa perfilEquipoEmpresa2 = new PerfilEquipoEmpresa();
        perfilEquipoEmpresa2.setId(perfilEquipoEmpresa1.getId());
        assertThat(perfilEquipoEmpresa1).isEqualTo(perfilEquipoEmpresa2);
        perfilEquipoEmpresa2.setId(2L);
        assertThat(perfilEquipoEmpresa1).isNotEqualTo(perfilEquipoEmpresa2);
        perfilEquipoEmpresa1.setId(null);
        assertThat(perfilEquipoEmpresa1).isNotEqualTo(perfilEquipoEmpresa2);
    }
}
