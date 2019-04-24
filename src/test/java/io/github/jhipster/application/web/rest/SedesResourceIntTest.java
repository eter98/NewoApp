package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.Sedes;
import io.github.jhipster.application.repository.SedesRepository;
import io.github.jhipster.application.repository.search.SedesSearchRepository;
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
 * Test class for the SedesResource REST controller.
 *
 * @see SedesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class SedesResourceIntTest {

    private static final Integer DEFAULT_NOMBRE_SEDE = 1;
    private static final Integer UPDATED_NOMBRE_SEDE = 2;

    private static final Double DEFAULT_COORDENADA_X = 1D;
    private static final Double UPDATED_COORDENADA_X = 2D;

    private static final Double DEFAULT_COORDENADA_Y = 1D;
    private static final Double UPDATED_COORDENADA_Y = 2D;

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO_COMUNIDAD = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO_COMUNIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO_NEGOCIO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO_NEGOCIO = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPACIDAD_ESPACIO_LIBRE = 1;
    private static final Integer UPDATED_CAPACIDAD_ESPACIO_LIBRE = 2;

    private static final String DEFAULT_DESCRIPCION_SEDE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION_SEDE = "BBBBBBBBBB";

    private static final String DEFAULT_HORARIO = "AAAAAAAAAA";
    private static final String UPDATED_HORARIO = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGEN_1 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN_1 = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_1_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_1_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_IMAGEN_2 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGEN_2 = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGEN_2_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGEN_2_CONTENT_TYPE = "image/png";

    @Autowired
    private SedesRepository sedesRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.SedesSearchRepositoryMockConfiguration
     */
    @Autowired
    private SedesSearchRepository mockSedesSearchRepository;

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

    private MockMvc restSedesMockMvc;

    private Sedes sedes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SedesResource sedesResource = new SedesResource(sedesRepository, mockSedesSearchRepository);
        this.restSedesMockMvc = MockMvcBuilders.standaloneSetup(sedesResource)
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
    public static Sedes createEntity(EntityManager em) {
        Sedes sedes = new Sedes()
            .nombreSede(DEFAULT_NOMBRE_SEDE)
            .coordenadaX(DEFAULT_COORDENADA_X)
            .coordenadaY(DEFAULT_COORDENADA_Y)
            .direccion(DEFAULT_DIRECCION)
            .telefonoComunidad(DEFAULT_TELEFONO_COMUNIDAD)
            .telefonoNegocio(DEFAULT_TELEFONO_NEGOCIO)
            .capacidadEspacioLibre(DEFAULT_CAPACIDAD_ESPACIO_LIBRE)
            .descripcionSede(DEFAULT_DESCRIPCION_SEDE)
            .horario(DEFAULT_HORARIO)
            .imagen1(DEFAULT_IMAGEN_1)
            .imagen1ContentType(DEFAULT_IMAGEN_1_CONTENT_TYPE)
            .imagen2(DEFAULT_IMAGEN_2)
            .imagen2ContentType(DEFAULT_IMAGEN_2_CONTENT_TYPE);
        return sedes;
    }

    @Before
    public void initTest() {
        sedes = createEntity(em);
    }

    @Test
    @Transactional
    public void createSedes() throws Exception {
        int databaseSizeBeforeCreate = sedesRepository.findAll().size();

        // Create the Sedes
        restSedesMockMvc.perform(post("/api/sedes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sedes)))
            .andExpect(status().isCreated());

        // Validate the Sedes in the database
        List<Sedes> sedesList = sedesRepository.findAll();
        assertThat(sedesList).hasSize(databaseSizeBeforeCreate + 1);
        Sedes testSedes = sedesList.get(sedesList.size() - 1);
        assertThat(testSedes.getNombreSede()).isEqualTo(DEFAULT_NOMBRE_SEDE);
        assertThat(testSedes.getCoordenadaX()).isEqualTo(DEFAULT_COORDENADA_X);
        assertThat(testSedes.getCoordenadaY()).isEqualTo(DEFAULT_COORDENADA_Y);
        assertThat(testSedes.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testSedes.getTelefonoComunidad()).isEqualTo(DEFAULT_TELEFONO_COMUNIDAD);
        assertThat(testSedes.getTelefonoNegocio()).isEqualTo(DEFAULT_TELEFONO_NEGOCIO);
        assertThat(testSedes.getCapacidadEspacioLibre()).isEqualTo(DEFAULT_CAPACIDAD_ESPACIO_LIBRE);
        assertThat(testSedes.getDescripcionSede()).isEqualTo(DEFAULT_DESCRIPCION_SEDE);
        assertThat(testSedes.getHorario()).isEqualTo(DEFAULT_HORARIO);
        assertThat(testSedes.getImagen1()).isEqualTo(DEFAULT_IMAGEN_1);
        assertThat(testSedes.getImagen1ContentType()).isEqualTo(DEFAULT_IMAGEN_1_CONTENT_TYPE);
        assertThat(testSedes.getImagen2()).isEqualTo(DEFAULT_IMAGEN_2);
        assertThat(testSedes.getImagen2ContentType()).isEqualTo(DEFAULT_IMAGEN_2_CONTENT_TYPE);

        // Validate the Sedes in Elasticsearch
        verify(mockSedesSearchRepository, times(1)).save(testSedes);
    }

    @Test
    @Transactional
    public void createSedesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sedesRepository.findAll().size();

        // Create the Sedes with an existing ID
        sedes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSedesMockMvc.perform(post("/api/sedes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sedes)))
            .andExpect(status().isBadRequest());

        // Validate the Sedes in the database
        List<Sedes> sedesList = sedesRepository.findAll();
        assertThat(sedesList).hasSize(databaseSizeBeforeCreate);

        // Validate the Sedes in Elasticsearch
        verify(mockSedesSearchRepository, times(0)).save(sedes);
    }

    @Test
    @Transactional
    public void getAllSedes() throws Exception {
        // Initialize the database
        sedesRepository.saveAndFlush(sedes);

        // Get all the sedesList
        restSedesMockMvc.perform(get("/api/sedes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sedes.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreSede").value(hasItem(DEFAULT_NOMBRE_SEDE)))
            .andExpect(jsonPath("$.[*].coordenadaX").value(hasItem(DEFAULT_COORDENADA_X.doubleValue())))
            .andExpect(jsonPath("$.[*].coordenadaY").value(hasItem(DEFAULT_COORDENADA_Y.doubleValue())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].telefonoComunidad").value(hasItem(DEFAULT_TELEFONO_COMUNIDAD.toString())))
            .andExpect(jsonPath("$.[*].telefonoNegocio").value(hasItem(DEFAULT_TELEFONO_NEGOCIO.toString())))
            .andExpect(jsonPath("$.[*].capacidadEspacioLibre").value(hasItem(DEFAULT_CAPACIDAD_ESPACIO_LIBRE)))
            .andExpect(jsonPath("$.[*].descripcionSede").value(hasItem(DEFAULT_DESCRIPCION_SEDE.toString())))
            .andExpect(jsonPath("$.[*].horario").value(hasItem(DEFAULT_HORARIO.toString())))
            .andExpect(jsonPath("$.[*].imagen1ContentType").value(hasItem(DEFAULT_IMAGEN_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen1").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN_1))))
            .andExpect(jsonPath("$.[*].imagen2ContentType").value(hasItem(DEFAULT_IMAGEN_2_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen2").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN_2))));
    }
    
    @Test
    @Transactional
    public void getSedes() throws Exception {
        // Initialize the database
        sedesRepository.saveAndFlush(sedes);

        // Get the sedes
        restSedesMockMvc.perform(get("/api/sedes/{id}", sedes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sedes.getId().intValue()))
            .andExpect(jsonPath("$.nombreSede").value(DEFAULT_NOMBRE_SEDE))
            .andExpect(jsonPath("$.coordenadaX").value(DEFAULT_COORDENADA_X.doubleValue()))
            .andExpect(jsonPath("$.coordenadaY").value(DEFAULT_COORDENADA_Y.doubleValue()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.telefonoComunidad").value(DEFAULT_TELEFONO_COMUNIDAD.toString()))
            .andExpect(jsonPath("$.telefonoNegocio").value(DEFAULT_TELEFONO_NEGOCIO.toString()))
            .andExpect(jsonPath("$.capacidadEspacioLibre").value(DEFAULT_CAPACIDAD_ESPACIO_LIBRE))
            .andExpect(jsonPath("$.descripcionSede").value(DEFAULT_DESCRIPCION_SEDE.toString()))
            .andExpect(jsonPath("$.horario").value(DEFAULT_HORARIO.toString()))
            .andExpect(jsonPath("$.imagen1ContentType").value(DEFAULT_IMAGEN_1_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen1").value(Base64Utils.encodeToString(DEFAULT_IMAGEN_1)))
            .andExpect(jsonPath("$.imagen2ContentType").value(DEFAULT_IMAGEN_2_CONTENT_TYPE))
            .andExpect(jsonPath("$.imagen2").value(Base64Utils.encodeToString(DEFAULT_IMAGEN_2)));
    }

    @Test
    @Transactional
    public void getNonExistingSedes() throws Exception {
        // Get the sedes
        restSedesMockMvc.perform(get("/api/sedes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSedes() throws Exception {
        // Initialize the database
        sedesRepository.saveAndFlush(sedes);

        int databaseSizeBeforeUpdate = sedesRepository.findAll().size();

        // Update the sedes
        Sedes updatedSedes = sedesRepository.findById(sedes.getId()).get();
        // Disconnect from session so that the updates on updatedSedes are not directly saved in db
        em.detach(updatedSedes);
        updatedSedes
            .nombreSede(UPDATED_NOMBRE_SEDE)
            .coordenadaX(UPDATED_COORDENADA_X)
            .coordenadaY(UPDATED_COORDENADA_Y)
            .direccion(UPDATED_DIRECCION)
            .telefonoComunidad(UPDATED_TELEFONO_COMUNIDAD)
            .telefonoNegocio(UPDATED_TELEFONO_NEGOCIO)
            .capacidadEspacioLibre(UPDATED_CAPACIDAD_ESPACIO_LIBRE)
            .descripcionSede(UPDATED_DESCRIPCION_SEDE)
            .horario(UPDATED_HORARIO)
            .imagen1(UPDATED_IMAGEN_1)
            .imagen1ContentType(UPDATED_IMAGEN_1_CONTENT_TYPE)
            .imagen2(UPDATED_IMAGEN_2)
            .imagen2ContentType(UPDATED_IMAGEN_2_CONTENT_TYPE);

        restSedesMockMvc.perform(put("/api/sedes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSedes)))
            .andExpect(status().isOk());

        // Validate the Sedes in the database
        List<Sedes> sedesList = sedesRepository.findAll();
        assertThat(sedesList).hasSize(databaseSizeBeforeUpdate);
        Sedes testSedes = sedesList.get(sedesList.size() - 1);
        assertThat(testSedes.getNombreSede()).isEqualTo(UPDATED_NOMBRE_SEDE);
        assertThat(testSedes.getCoordenadaX()).isEqualTo(UPDATED_COORDENADA_X);
        assertThat(testSedes.getCoordenadaY()).isEqualTo(UPDATED_COORDENADA_Y);
        assertThat(testSedes.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testSedes.getTelefonoComunidad()).isEqualTo(UPDATED_TELEFONO_COMUNIDAD);
        assertThat(testSedes.getTelefonoNegocio()).isEqualTo(UPDATED_TELEFONO_NEGOCIO);
        assertThat(testSedes.getCapacidadEspacioLibre()).isEqualTo(UPDATED_CAPACIDAD_ESPACIO_LIBRE);
        assertThat(testSedes.getDescripcionSede()).isEqualTo(UPDATED_DESCRIPCION_SEDE);
        assertThat(testSedes.getHorario()).isEqualTo(UPDATED_HORARIO);
        assertThat(testSedes.getImagen1()).isEqualTo(UPDATED_IMAGEN_1);
        assertThat(testSedes.getImagen1ContentType()).isEqualTo(UPDATED_IMAGEN_1_CONTENT_TYPE);
        assertThat(testSedes.getImagen2()).isEqualTo(UPDATED_IMAGEN_2);
        assertThat(testSedes.getImagen2ContentType()).isEqualTo(UPDATED_IMAGEN_2_CONTENT_TYPE);

        // Validate the Sedes in Elasticsearch
        verify(mockSedesSearchRepository, times(1)).save(testSedes);
    }

    @Test
    @Transactional
    public void updateNonExistingSedes() throws Exception {
        int databaseSizeBeforeUpdate = sedesRepository.findAll().size();

        // Create the Sedes

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSedesMockMvc.perform(put("/api/sedes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sedes)))
            .andExpect(status().isBadRequest());

        // Validate the Sedes in the database
        List<Sedes> sedesList = sedesRepository.findAll();
        assertThat(sedesList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Sedes in Elasticsearch
        verify(mockSedesSearchRepository, times(0)).save(sedes);
    }

    @Test
    @Transactional
    public void deleteSedes() throws Exception {
        // Initialize the database
        sedesRepository.saveAndFlush(sedes);

        int databaseSizeBeforeDelete = sedesRepository.findAll().size();

        // Delete the sedes
        restSedesMockMvc.perform(delete("/api/sedes/{id}", sedes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Sedes> sedesList = sedesRepository.findAll();
        assertThat(sedesList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Sedes in Elasticsearch
        verify(mockSedesSearchRepository, times(1)).deleteById(sedes.getId());
    }

    @Test
    @Transactional
    public void searchSedes() throws Exception {
        // Initialize the database
        sedesRepository.saveAndFlush(sedes);
        when(mockSedesSearchRepository.search(queryStringQuery("id:" + sedes.getId())))
            .thenReturn(Collections.singletonList(sedes));
        // Search the sedes
        restSedesMockMvc.perform(get("/api/_search/sedes?query=id:" + sedes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sedes.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreSede").value(hasItem(DEFAULT_NOMBRE_SEDE)))
            .andExpect(jsonPath("$.[*].coordenadaX").value(hasItem(DEFAULT_COORDENADA_X.doubleValue())))
            .andExpect(jsonPath("$.[*].coordenadaY").value(hasItem(DEFAULT_COORDENADA_Y.doubleValue())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION)))
            .andExpect(jsonPath("$.[*].telefonoComunidad").value(hasItem(DEFAULT_TELEFONO_COMUNIDAD)))
            .andExpect(jsonPath("$.[*].telefonoNegocio").value(hasItem(DEFAULT_TELEFONO_NEGOCIO)))
            .andExpect(jsonPath("$.[*].capacidadEspacioLibre").value(hasItem(DEFAULT_CAPACIDAD_ESPACIO_LIBRE)))
            .andExpect(jsonPath("$.[*].descripcionSede").value(hasItem(DEFAULT_DESCRIPCION_SEDE.toString())))
            .andExpect(jsonPath("$.[*].horario").value(hasItem(DEFAULT_HORARIO)))
            .andExpect(jsonPath("$.[*].imagen1ContentType").value(hasItem(DEFAULT_IMAGEN_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen1").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN_1))))
            .andExpect(jsonPath("$.[*].imagen2ContentType").value(hasItem(DEFAULT_IMAGEN_2_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].imagen2").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGEN_2))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sedes.class);
        Sedes sedes1 = new Sedes();
        sedes1.setId(1L);
        Sedes sedes2 = new Sedes();
        sedes2.setId(sedes1.getId());
        assertThat(sedes1).isEqualTo(sedes2);
        sedes2.setId(2L);
        assertThat(sedes1).isNotEqualTo(sedes2);
        sedes1.setId(null);
        assertThat(sedes1).isNotEqualTo(sedes2);
    }
}
