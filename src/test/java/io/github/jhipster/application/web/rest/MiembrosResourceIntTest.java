package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.Miembros;
import io.github.jhipster.application.repository.MiembrosRepository;
import io.github.jhipster.application.repository.search.MiembrosSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Test class for the MiembrosResource REST controller.
 *
 * @see MiembrosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class MiembrosResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDO = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDO = "BBBBBBBBBB";

    private static final String DEFAULT_NACIONALIDAD = "AAAAAAAAAA";
    private static final String UPDATED_NACIONALIDAD = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FEVHA_NACIMIENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FEVHA_NACIMIENTO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_REGISTRO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_REGISTRO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_GENERO = "AAAAAAAAAA";
    private static final String UPDATED_GENERO = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO_ELECTRONICO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO_ELECTRONICO = "BBBBBBBBBB";

    private static final String DEFAULT_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_CELULAR = "BBBBBBBBBB";

    private static final Integer DEFAULT_ID_EQUIPO_EMPREARIAL = 1;
    private static final Integer UPDATED_ID_EQUIPO_EMPREARIAL = 2;

    private static final Integer DEFAULT_ID_SEDE = 1;
    private static final Integer UPDATED_ID_SEDE = 2;

    private static final Integer DEFAULT_DERECHOS_DE_COMPRA = 1;
    private static final Integer UPDATED_DERECHOS_DE_COMPRA = 2;

    private static final Integer DEFAULT_TIPO_ACCESO = 1;
    private static final Integer UPDATED_TIPO_ACCESO = 2;

    @Autowired
    private MiembrosRepository miembrosRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.MiembrosSearchRepositoryMockConfiguration
     */
    @Autowired
    private MiembrosSearchRepository mockMiembrosSearchRepository;

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

    private MockMvc restMiembrosMockMvc;

    private Miembros miembros;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MiembrosResource miembrosResource = new MiembrosResource(miembrosRepository, mockMiembrosSearchRepository);
        this.restMiembrosMockMvc = MockMvcBuilders.standaloneSetup(miembrosResource)
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
    public static Miembros createEntity(EntityManager em) {
        Miembros miembros = new Miembros()
            .nombre(DEFAULT_NOMBRE)
            .apellido(DEFAULT_APELLIDO)
            .nacionalidad(DEFAULT_NACIONALIDAD)
            .fevhaNacimiento(DEFAULT_FEVHA_NACIMIENTO)
            .fechaRegistro(DEFAULT_FECHA_REGISTRO)
            .genero(DEFAULT_GENERO)
            .correoElectronico(DEFAULT_CORREO_ELECTRONICO)
            .celular(DEFAULT_CELULAR)
            .idEquipoEmprearial(DEFAULT_ID_EQUIPO_EMPREARIAL)
            .idSede(DEFAULT_ID_SEDE)
            .derechosDeCompra(DEFAULT_DERECHOS_DE_COMPRA)
            .tipoAcceso(DEFAULT_TIPO_ACCESO);
        return miembros;
    }

    @Before
    public void initTest() {
        miembros = createEntity(em);
    }

    @Test
    @Transactional
    public void createMiembros() throws Exception {
        int databaseSizeBeforeCreate = miembrosRepository.findAll().size();

        // Create the Miembros
        restMiembrosMockMvc.perform(post("/api/miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(miembros)))
            .andExpect(status().isCreated());

        // Validate the Miembros in the database
        List<Miembros> miembrosList = miembrosRepository.findAll();
        assertThat(miembrosList).hasSize(databaseSizeBeforeCreate + 1);
        Miembros testMiembros = miembrosList.get(miembrosList.size() - 1);
        assertThat(testMiembros.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testMiembros.getApellido()).isEqualTo(DEFAULT_APELLIDO);
        assertThat(testMiembros.getNacionalidad()).isEqualTo(DEFAULT_NACIONALIDAD);
        assertThat(testMiembros.getFevhaNacimiento()).isEqualTo(DEFAULT_FEVHA_NACIMIENTO);
        assertThat(testMiembros.getFechaRegistro()).isEqualTo(DEFAULT_FECHA_REGISTRO);
        assertThat(testMiembros.getGenero()).isEqualTo(DEFAULT_GENERO);
        assertThat(testMiembros.getCorreoElectronico()).isEqualTo(DEFAULT_CORREO_ELECTRONICO);
        assertThat(testMiembros.getCelular()).isEqualTo(DEFAULT_CELULAR);
        assertThat(testMiembros.getIdEquipoEmprearial()).isEqualTo(DEFAULT_ID_EQUIPO_EMPREARIAL);
        assertThat(testMiembros.getIdSede()).isEqualTo(DEFAULT_ID_SEDE);
        assertThat(testMiembros.getDerechosDeCompra()).isEqualTo(DEFAULT_DERECHOS_DE_COMPRA);
        assertThat(testMiembros.getTipoAcceso()).isEqualTo(DEFAULT_TIPO_ACCESO);

        // Validate the Miembros in Elasticsearch
        verify(mockMiembrosSearchRepository, times(1)).save(testMiembros);
    }

    @Test
    @Transactional
    public void createMiembrosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = miembrosRepository.findAll().size();

        // Create the Miembros with an existing ID
        miembros.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMiembrosMockMvc.perform(post("/api/miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(miembros)))
            .andExpect(status().isBadRequest());

        // Validate the Miembros in the database
        List<Miembros> miembrosList = miembrosRepository.findAll();
        assertThat(miembrosList).hasSize(databaseSizeBeforeCreate);

        // Validate the Miembros in Elasticsearch
        verify(mockMiembrosSearchRepository, times(0)).save(miembros);
    }

    @Test
    @Transactional
    public void getAllMiembros() throws Exception {
        // Initialize the database
        miembrosRepository.saveAndFlush(miembros);

        // Get all the miembrosList
        restMiembrosMockMvc.perform(get("/api/miembros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(miembros.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO.toString())))
            .andExpect(jsonPath("$.[*].nacionalidad").value(hasItem(DEFAULT_NACIONALIDAD.toString())))
            .andExpect(jsonPath("$.[*].fevhaNacimiento").value(hasItem(DEFAULT_FEVHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].fechaRegistro").value(hasItem(DEFAULT_FECHA_REGISTRO.toString())))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO.toString())))
            .andExpect(jsonPath("$.[*].correoElectronico").value(hasItem(DEFAULT_CORREO_ELECTRONICO.toString())))
            .andExpect(jsonPath("$.[*].celular").value(hasItem(DEFAULT_CELULAR.toString())))
            .andExpect(jsonPath("$.[*].idEquipoEmprearial").value(hasItem(DEFAULT_ID_EQUIPO_EMPREARIAL)))
            .andExpect(jsonPath("$.[*].idSede").value(hasItem(DEFAULT_ID_SEDE)))
            .andExpect(jsonPath("$.[*].derechosDeCompra").value(hasItem(DEFAULT_DERECHOS_DE_COMPRA)))
            .andExpect(jsonPath("$.[*].tipoAcceso").value(hasItem(DEFAULT_TIPO_ACCESO)));
    }
    
    @Test
    @Transactional
    public void getMiembros() throws Exception {
        // Initialize the database
        miembrosRepository.saveAndFlush(miembros);

        // Get the miembros
        restMiembrosMockMvc.perform(get("/api/miembros/{id}", miembros.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(miembros.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.apellido").value(DEFAULT_APELLIDO.toString()))
            .andExpect(jsonPath("$.nacionalidad").value(DEFAULT_NACIONALIDAD.toString()))
            .andExpect(jsonPath("$.fevhaNacimiento").value(DEFAULT_FEVHA_NACIMIENTO.toString()))
            .andExpect(jsonPath("$.fechaRegistro").value(DEFAULT_FECHA_REGISTRO.toString()))
            .andExpect(jsonPath("$.genero").value(DEFAULT_GENERO.toString()))
            .andExpect(jsonPath("$.correoElectronico").value(DEFAULT_CORREO_ELECTRONICO.toString()))
            .andExpect(jsonPath("$.celular").value(DEFAULT_CELULAR.toString()))
            .andExpect(jsonPath("$.idEquipoEmprearial").value(DEFAULT_ID_EQUIPO_EMPREARIAL))
            .andExpect(jsonPath("$.idSede").value(DEFAULT_ID_SEDE))
            .andExpect(jsonPath("$.derechosDeCompra").value(DEFAULT_DERECHOS_DE_COMPRA))
            .andExpect(jsonPath("$.tipoAcceso").value(DEFAULT_TIPO_ACCESO));
    }

    @Test
    @Transactional
    public void getNonExistingMiembros() throws Exception {
        // Get the miembros
        restMiembrosMockMvc.perform(get("/api/miembros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMiembros() throws Exception {
        // Initialize the database
        miembrosRepository.saveAndFlush(miembros);

        int databaseSizeBeforeUpdate = miembrosRepository.findAll().size();

        // Update the miembros
        Miembros updatedMiembros = miembrosRepository.findById(miembros.getId()).get();
        // Disconnect from session so that the updates on updatedMiembros are not directly saved in db
        em.detach(updatedMiembros);
        updatedMiembros
            .nombre(UPDATED_NOMBRE)
            .apellido(UPDATED_APELLIDO)
            .nacionalidad(UPDATED_NACIONALIDAD)
            .fevhaNacimiento(UPDATED_FEVHA_NACIMIENTO)
            .fechaRegistro(UPDATED_FECHA_REGISTRO)
            .genero(UPDATED_GENERO)
            .correoElectronico(UPDATED_CORREO_ELECTRONICO)
            .celular(UPDATED_CELULAR)
            .idEquipoEmprearial(UPDATED_ID_EQUIPO_EMPREARIAL)
            .idSede(UPDATED_ID_SEDE)
            .derechosDeCompra(UPDATED_DERECHOS_DE_COMPRA)
            .tipoAcceso(UPDATED_TIPO_ACCESO);

        restMiembrosMockMvc.perform(put("/api/miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMiembros)))
            .andExpect(status().isOk());

        // Validate the Miembros in the database
        List<Miembros> miembrosList = miembrosRepository.findAll();
        assertThat(miembrosList).hasSize(databaseSizeBeforeUpdate);
        Miembros testMiembros = miembrosList.get(miembrosList.size() - 1);
        assertThat(testMiembros.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testMiembros.getApellido()).isEqualTo(UPDATED_APELLIDO);
        assertThat(testMiembros.getNacionalidad()).isEqualTo(UPDATED_NACIONALIDAD);
        assertThat(testMiembros.getFevhaNacimiento()).isEqualTo(UPDATED_FEVHA_NACIMIENTO);
        assertThat(testMiembros.getFechaRegistro()).isEqualTo(UPDATED_FECHA_REGISTRO);
        assertThat(testMiembros.getGenero()).isEqualTo(UPDATED_GENERO);
        assertThat(testMiembros.getCorreoElectronico()).isEqualTo(UPDATED_CORREO_ELECTRONICO);
        assertThat(testMiembros.getCelular()).isEqualTo(UPDATED_CELULAR);
        assertThat(testMiembros.getIdEquipoEmprearial()).isEqualTo(UPDATED_ID_EQUIPO_EMPREARIAL);
        assertThat(testMiembros.getIdSede()).isEqualTo(UPDATED_ID_SEDE);
        assertThat(testMiembros.getDerechosDeCompra()).isEqualTo(UPDATED_DERECHOS_DE_COMPRA);
        assertThat(testMiembros.getTipoAcceso()).isEqualTo(UPDATED_TIPO_ACCESO);

        // Validate the Miembros in Elasticsearch
        verify(mockMiembrosSearchRepository, times(1)).save(testMiembros);
    }

    @Test
    @Transactional
    public void updateNonExistingMiembros() throws Exception {
        int databaseSizeBeforeUpdate = miembrosRepository.findAll().size();

        // Create the Miembros

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMiembrosMockMvc.perform(put("/api/miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(miembros)))
            .andExpect(status().isBadRequest());

        // Validate the Miembros in the database
        List<Miembros> miembrosList = miembrosRepository.findAll();
        assertThat(miembrosList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Miembros in Elasticsearch
        verify(mockMiembrosSearchRepository, times(0)).save(miembros);
    }

    @Test
    @Transactional
    public void deleteMiembros() throws Exception {
        // Initialize the database
        miembrosRepository.saveAndFlush(miembros);

        int databaseSizeBeforeDelete = miembrosRepository.findAll().size();

        // Delete the miembros
        restMiembrosMockMvc.perform(delete("/api/miembros/{id}", miembros.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Miembros> miembrosList = miembrosRepository.findAll();
        assertThat(miembrosList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Miembros in Elasticsearch
        verify(mockMiembrosSearchRepository, times(1)).deleteById(miembros.getId());
    }

    @Test
    @Transactional
    public void searchMiembros() throws Exception {
        // Initialize the database
        miembrosRepository.saveAndFlush(miembros);
        when(mockMiembrosSearchRepository.search(queryStringQuery("id:" + miembros.getId())))
            .thenReturn(Collections.singletonList(miembros));
        // Search the miembros
        restMiembrosMockMvc.perform(get("/api/_search/miembros?query=id:" + miembros.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(miembros.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO)))
            .andExpect(jsonPath("$.[*].nacionalidad").value(hasItem(DEFAULT_NACIONALIDAD)))
            .andExpect(jsonPath("$.[*].fevhaNacimiento").value(hasItem(DEFAULT_FEVHA_NACIMIENTO.toString())))
            .andExpect(jsonPath("$.[*].fechaRegistro").value(hasItem(DEFAULT_FECHA_REGISTRO.toString())))
            .andExpect(jsonPath("$.[*].genero").value(hasItem(DEFAULT_GENERO)))
            .andExpect(jsonPath("$.[*].correoElectronico").value(hasItem(DEFAULT_CORREO_ELECTRONICO)))
            .andExpect(jsonPath("$.[*].celular").value(hasItem(DEFAULT_CELULAR)))
            .andExpect(jsonPath("$.[*].idEquipoEmprearial").value(hasItem(DEFAULT_ID_EQUIPO_EMPREARIAL)))
            .andExpect(jsonPath("$.[*].idSede").value(hasItem(DEFAULT_ID_SEDE)))
            .andExpect(jsonPath("$.[*].derechosDeCompra").value(hasItem(DEFAULT_DERECHOS_DE_COMPRA)))
            .andExpect(jsonPath("$.[*].tipoAcceso").value(hasItem(DEFAULT_TIPO_ACCESO)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Miembros.class);
        Miembros miembros1 = new Miembros();
        miembros1.setId(1L);
        Miembros miembros2 = new Miembros();
        miembros2.setId(miembros1.getId());
        assertThat(miembros1).isEqualTo(miembros2);
        miembros2.setId(2L);
        assertThat(miembros1).isNotEqualTo(miembros2);
        miembros1.setId(null);
        assertThat(miembros1).isNotEqualTo(miembros2);
    }
}
