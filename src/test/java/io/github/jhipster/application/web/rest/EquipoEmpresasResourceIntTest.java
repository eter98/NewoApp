package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.EquipoEmpresas;
import io.github.jhipster.application.repository.EquipoEmpresasRepository;
import io.github.jhipster.application.repository.search.EquipoEmpresasSearchRepository;
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
import org.springframework.util.Base64Utils;
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
 * Test class for the EquipoEmpresasResource REST controller.
 *
 * @see EquipoEmpresasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class EquipoEmpresasResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGOS = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGOS = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGOS_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGOS_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_PAGINA_WEB = "AAAAAAAAAA";
    private static final String UPDATED_PAGINA_WEB = "BBBBBBBBBB";

    @Autowired
    private EquipoEmpresasRepository equipoEmpresasRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.EquipoEmpresasSearchRepositoryMockConfiguration
     */
    @Autowired
    private EquipoEmpresasSearchRepository mockEquipoEmpresasSearchRepository;

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

    private MockMvc restEquipoEmpresasMockMvc;

    private EquipoEmpresas equipoEmpresas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EquipoEmpresasResource equipoEmpresasResource = new EquipoEmpresasResource(equipoEmpresasRepository, mockEquipoEmpresasSearchRepository);
        this.restEquipoEmpresasMockMvc = MockMvcBuilders.standaloneSetup(equipoEmpresasResource)
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
    public static EquipoEmpresas createEntity(EntityManager em) {
        EquipoEmpresas equipoEmpresas = new EquipoEmpresas()
            .nombre(DEFAULT_NOMBRE)
            .telefono(DEFAULT_TELEFONO)
            .correo(DEFAULT_CORREO)
            .direccion(DEFAULT_DIRECCION)
            .descripcion(DEFAULT_DESCRIPCION)
            .logos(DEFAULT_LOGOS)
            .logosContentType(DEFAULT_LOGOS_CONTENT_TYPE)
            .paginaWeb(DEFAULT_PAGINA_WEB);
        return equipoEmpresas;
    }

    @Before
    public void initTest() {
        equipoEmpresas = createEntity(em);
    }

    @Test
    @Transactional
    public void createEquipoEmpresas() throws Exception {
        int databaseSizeBeforeCreate = equipoEmpresasRepository.findAll().size();

        // Create the EquipoEmpresas
        restEquipoEmpresasMockMvc.perform(post("/api/equipo-empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipoEmpresas)))
            .andExpect(status().isCreated());

        // Validate the EquipoEmpresas in the database
        List<EquipoEmpresas> equipoEmpresasList = equipoEmpresasRepository.findAll();
        assertThat(equipoEmpresasList).hasSize(databaseSizeBeforeCreate + 1);
        EquipoEmpresas testEquipoEmpresas = equipoEmpresasList.get(equipoEmpresasList.size() - 1);
        assertThat(testEquipoEmpresas.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEquipoEmpresas.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testEquipoEmpresas.getCorreo()).isEqualTo(DEFAULT_CORREO);
        assertThat(testEquipoEmpresas.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testEquipoEmpresas.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testEquipoEmpresas.getLogos()).isEqualTo(DEFAULT_LOGOS);
        assertThat(testEquipoEmpresas.getLogosContentType()).isEqualTo(DEFAULT_LOGOS_CONTENT_TYPE);
        assertThat(testEquipoEmpresas.getPaginaWeb()).isEqualTo(DEFAULT_PAGINA_WEB);

        // Validate the EquipoEmpresas in Elasticsearch
        verify(mockEquipoEmpresasSearchRepository, times(1)).save(testEquipoEmpresas);
    }

    @Test
    @Transactional
    public void createEquipoEmpresasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = equipoEmpresasRepository.findAll().size();

        // Create the EquipoEmpresas with an existing ID
        equipoEmpresas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEquipoEmpresasMockMvc.perform(post("/api/equipo-empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipoEmpresas)))
            .andExpect(status().isBadRequest());

        // Validate the EquipoEmpresas in the database
        List<EquipoEmpresas> equipoEmpresasList = equipoEmpresasRepository.findAll();
        assertThat(equipoEmpresasList).hasSize(databaseSizeBeforeCreate);

        // Validate the EquipoEmpresas in Elasticsearch
        verify(mockEquipoEmpresasSearchRepository, times(0)).save(equipoEmpresas);
    }

    @Test
    @Transactional
    public void getAllEquipoEmpresas() throws Exception {
        // Initialize the database
        equipoEmpresasRepository.saveAndFlush(equipoEmpresas);

        // Get all the equipoEmpresasList
        restEquipoEmpresasMockMvc.perform(get("/api/equipo-empresas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equipoEmpresas.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].logosContentType").value(hasItem(DEFAULT_LOGOS_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logos").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGOS))))
            .andExpect(jsonPath("$.[*].paginaWeb").value(hasItem(DEFAULT_PAGINA_WEB.toString())));
    }
    
    @Test
    @Transactional
    public void getEquipoEmpresas() throws Exception {
        // Initialize the database
        equipoEmpresasRepository.saveAndFlush(equipoEmpresas);

        // Get the equipoEmpresas
        restEquipoEmpresasMockMvc.perform(get("/api/equipo-empresas/{id}", equipoEmpresas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(equipoEmpresas.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.telefono").value(DEFAULT_TELEFONO.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.logosContentType").value(DEFAULT_LOGOS_CONTENT_TYPE))
            .andExpect(jsonPath("$.logos").value(Base64Utils.encodeToString(DEFAULT_LOGOS)))
            .andExpect(jsonPath("$.paginaWeb").value(DEFAULT_PAGINA_WEB.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEquipoEmpresas() throws Exception {
        // Get the equipoEmpresas
        restEquipoEmpresasMockMvc.perform(get("/api/equipo-empresas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEquipoEmpresas() throws Exception {
        // Initialize the database
        equipoEmpresasRepository.saveAndFlush(equipoEmpresas);

        int databaseSizeBeforeUpdate = equipoEmpresasRepository.findAll().size();

        // Update the equipoEmpresas
        EquipoEmpresas updatedEquipoEmpresas = equipoEmpresasRepository.findById(equipoEmpresas.getId()).get();
        // Disconnect from session so that the updates on updatedEquipoEmpresas are not directly saved in db
        em.detach(updatedEquipoEmpresas);
        updatedEquipoEmpresas
            .nombre(UPDATED_NOMBRE)
            .telefono(UPDATED_TELEFONO)
            .correo(UPDATED_CORREO)
            .direccion(UPDATED_DIRECCION)
            .descripcion(UPDATED_DESCRIPCION)
            .logos(UPDATED_LOGOS)
            .logosContentType(UPDATED_LOGOS_CONTENT_TYPE)
            .paginaWeb(UPDATED_PAGINA_WEB);

        restEquipoEmpresasMockMvc.perform(put("/api/equipo-empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEquipoEmpresas)))
            .andExpect(status().isOk());

        // Validate the EquipoEmpresas in the database
        List<EquipoEmpresas> equipoEmpresasList = equipoEmpresasRepository.findAll();
        assertThat(equipoEmpresasList).hasSize(databaseSizeBeforeUpdate);
        EquipoEmpresas testEquipoEmpresas = equipoEmpresasList.get(equipoEmpresasList.size() - 1);
        assertThat(testEquipoEmpresas.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEquipoEmpresas.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testEquipoEmpresas.getCorreo()).isEqualTo(UPDATED_CORREO);
        assertThat(testEquipoEmpresas.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testEquipoEmpresas.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testEquipoEmpresas.getLogos()).isEqualTo(UPDATED_LOGOS);
        assertThat(testEquipoEmpresas.getLogosContentType()).isEqualTo(UPDATED_LOGOS_CONTENT_TYPE);
        assertThat(testEquipoEmpresas.getPaginaWeb()).isEqualTo(UPDATED_PAGINA_WEB);

        // Validate the EquipoEmpresas in Elasticsearch
        verify(mockEquipoEmpresasSearchRepository, times(1)).save(testEquipoEmpresas);
    }

    @Test
    @Transactional
    public void updateNonExistingEquipoEmpresas() throws Exception {
        int databaseSizeBeforeUpdate = equipoEmpresasRepository.findAll().size();

        // Create the EquipoEmpresas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEquipoEmpresasMockMvc.perform(put("/api/equipo-empresas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equipoEmpresas)))
            .andExpect(status().isBadRequest());

        // Validate the EquipoEmpresas in the database
        List<EquipoEmpresas> equipoEmpresasList = equipoEmpresasRepository.findAll();
        assertThat(equipoEmpresasList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EquipoEmpresas in Elasticsearch
        verify(mockEquipoEmpresasSearchRepository, times(0)).save(equipoEmpresas);
    }

    @Test
    @Transactional
    public void deleteEquipoEmpresas() throws Exception {
        // Initialize the database
        equipoEmpresasRepository.saveAndFlush(equipoEmpresas);

        int databaseSizeBeforeDelete = equipoEmpresasRepository.findAll().size();

        // Delete the equipoEmpresas
        restEquipoEmpresasMockMvc.perform(delete("/api/equipo-empresas/{id}", equipoEmpresas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EquipoEmpresas> equipoEmpresasList = equipoEmpresasRepository.findAll();
        assertThat(equipoEmpresasList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EquipoEmpresas in Elasticsearch
        verify(mockEquipoEmpresasSearchRepository, times(1)).deleteById(equipoEmpresas.getId());
    }

    @Test
    @Transactional
    public void searchEquipoEmpresas() throws Exception {
        // Initialize the database
        equipoEmpresasRepository.saveAndFlush(equipoEmpresas);
        when(mockEquipoEmpresasSearchRepository.search(queryStringQuery("id:" + equipoEmpresas.getId())))
            .thenReturn(Collections.singletonList(equipoEmpresas));
        // Search the equipoEmpresas
        restEquipoEmpresasMockMvc.perform(get("/api/_search/equipo-empresas?query=id:" + equipoEmpresas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equipoEmpresas.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].telefono").value(hasItem(DEFAULT_TELEFONO)))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO)))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].logosContentType").value(hasItem(DEFAULT_LOGOS_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logos").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGOS))))
            .andExpect(jsonPath("$.[*].paginaWeb").value(hasItem(DEFAULT_PAGINA_WEB)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EquipoEmpresas.class);
        EquipoEmpresas equipoEmpresas1 = new EquipoEmpresas();
        equipoEmpresas1.setId(1L);
        EquipoEmpresas equipoEmpresas2 = new EquipoEmpresas();
        equipoEmpresas2.setId(equipoEmpresas1.getId());
        assertThat(equipoEmpresas1).isEqualTo(equipoEmpresas2);
        equipoEmpresas2.setId(2L);
        assertThat(equipoEmpresas1).isNotEqualTo(equipoEmpresas2);
        equipoEmpresas1.setId(null);
        assertThat(equipoEmpresas1).isNotEqualTo(equipoEmpresas2);
    }
}
