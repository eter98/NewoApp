package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.Reservas;
import io.github.jhipster.application.repository.ReservasRepository;
import io.github.jhipster.application.repository.search.ReservasSearchRepository;
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
 * Test class for the ReservasResource REST controller.
 *
 * @see ReservasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class ReservasResourceIntTest {

    private static final LocalDate DEFAULT_FECHA_ENTRADA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ENTRADA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_HORA_ENTRADA = "AAAAAAAAAA";
    private static final String UPDATED_HORA_ENTRADA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_SALIDA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_SALIDA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_HORA_SALIDA = "AAAAAAAAAA";
    private static final String UPDATED_HORA_SALIDA = "BBBBBBBBBB";

    @Autowired
    private ReservasRepository reservasRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.ReservasSearchRepositoryMockConfiguration
     */
    @Autowired
    private ReservasSearchRepository mockReservasSearchRepository;

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

    private MockMvc restReservasMockMvc;

    private Reservas reservas;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReservasResource reservasResource = new ReservasResource(reservasRepository, mockReservasSearchRepository);
        this.restReservasMockMvc = MockMvcBuilders.standaloneSetup(reservasResource)
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
    public static Reservas createEntity(EntityManager em) {
        Reservas reservas = new Reservas()
            .fechaEntrada(DEFAULT_FECHA_ENTRADA)
            .horaEntrada(DEFAULT_HORA_ENTRADA)
            .fechaSalida(DEFAULT_FECHA_SALIDA)
            .horaSalida(DEFAULT_HORA_SALIDA);
        return reservas;
    }

    @Before
    public void initTest() {
        reservas = createEntity(em);
    }

    @Test
    @Transactional
    public void createReservas() throws Exception {
        int databaseSizeBeforeCreate = reservasRepository.findAll().size();

        // Create the Reservas
        restReservasMockMvc.perform(post("/api/reservas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservas)))
            .andExpect(status().isCreated());

        // Validate the Reservas in the database
        List<Reservas> reservasList = reservasRepository.findAll();
        assertThat(reservasList).hasSize(databaseSizeBeforeCreate + 1);
        Reservas testReservas = reservasList.get(reservasList.size() - 1);
        assertThat(testReservas.getFechaEntrada()).isEqualTo(DEFAULT_FECHA_ENTRADA);
        assertThat(testReservas.getHoraEntrada()).isEqualTo(DEFAULT_HORA_ENTRADA);
        assertThat(testReservas.getFechaSalida()).isEqualTo(DEFAULT_FECHA_SALIDA);
        assertThat(testReservas.getHoraSalida()).isEqualTo(DEFAULT_HORA_SALIDA);

        // Validate the Reservas in Elasticsearch
        verify(mockReservasSearchRepository, times(1)).save(testReservas);
    }

    @Test
    @Transactional
    public void createReservasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reservasRepository.findAll().size();

        // Create the Reservas with an existing ID
        reservas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReservasMockMvc.perform(post("/api/reservas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservas)))
            .andExpect(status().isBadRequest());

        // Validate the Reservas in the database
        List<Reservas> reservasList = reservasRepository.findAll();
        assertThat(reservasList).hasSize(databaseSizeBeforeCreate);

        // Validate the Reservas in Elasticsearch
        verify(mockReservasSearchRepository, times(0)).save(reservas);
    }

    @Test
    @Transactional
    public void getAllReservas() throws Exception {
        // Initialize the database
        reservasRepository.saveAndFlush(reservas);

        // Get all the reservasList
        restReservasMockMvc.perform(get("/api/reservas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reservas.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaEntrada").value(hasItem(DEFAULT_FECHA_ENTRADA.toString())))
            .andExpect(jsonPath("$.[*].horaEntrada").value(hasItem(DEFAULT_HORA_ENTRADA.toString())))
            .andExpect(jsonPath("$.[*].fechaSalida").value(hasItem(DEFAULT_FECHA_SALIDA.toString())))
            .andExpect(jsonPath("$.[*].horaSalida").value(hasItem(DEFAULT_HORA_SALIDA.toString())));
    }
    
    @Test
    @Transactional
    public void getReservas() throws Exception {
        // Initialize the database
        reservasRepository.saveAndFlush(reservas);

        // Get the reservas
        restReservasMockMvc.perform(get("/api/reservas/{id}", reservas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reservas.getId().intValue()))
            .andExpect(jsonPath("$.fechaEntrada").value(DEFAULT_FECHA_ENTRADA.toString()))
            .andExpect(jsonPath("$.horaEntrada").value(DEFAULT_HORA_ENTRADA.toString()))
            .andExpect(jsonPath("$.fechaSalida").value(DEFAULT_FECHA_SALIDA.toString()))
            .andExpect(jsonPath("$.horaSalida").value(DEFAULT_HORA_SALIDA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReservas() throws Exception {
        // Get the reservas
        restReservasMockMvc.perform(get("/api/reservas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReservas() throws Exception {
        // Initialize the database
        reservasRepository.saveAndFlush(reservas);

        int databaseSizeBeforeUpdate = reservasRepository.findAll().size();

        // Update the reservas
        Reservas updatedReservas = reservasRepository.findById(reservas.getId()).get();
        // Disconnect from session so that the updates on updatedReservas are not directly saved in db
        em.detach(updatedReservas);
        updatedReservas
            .fechaEntrada(UPDATED_FECHA_ENTRADA)
            .horaEntrada(UPDATED_HORA_ENTRADA)
            .fechaSalida(UPDATED_FECHA_SALIDA)
            .horaSalida(UPDATED_HORA_SALIDA);

        restReservasMockMvc.perform(put("/api/reservas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReservas)))
            .andExpect(status().isOk());

        // Validate the Reservas in the database
        List<Reservas> reservasList = reservasRepository.findAll();
        assertThat(reservasList).hasSize(databaseSizeBeforeUpdate);
        Reservas testReservas = reservasList.get(reservasList.size() - 1);
        assertThat(testReservas.getFechaEntrada()).isEqualTo(UPDATED_FECHA_ENTRADA);
        assertThat(testReservas.getHoraEntrada()).isEqualTo(UPDATED_HORA_ENTRADA);
        assertThat(testReservas.getFechaSalida()).isEqualTo(UPDATED_FECHA_SALIDA);
        assertThat(testReservas.getHoraSalida()).isEqualTo(UPDATED_HORA_SALIDA);

        // Validate the Reservas in Elasticsearch
        verify(mockReservasSearchRepository, times(1)).save(testReservas);
    }

    @Test
    @Transactional
    public void updateNonExistingReservas() throws Exception {
        int databaseSizeBeforeUpdate = reservasRepository.findAll().size();

        // Create the Reservas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReservasMockMvc.perform(put("/api/reservas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reservas)))
            .andExpect(status().isBadRequest());

        // Validate the Reservas in the database
        List<Reservas> reservasList = reservasRepository.findAll();
        assertThat(reservasList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Reservas in Elasticsearch
        verify(mockReservasSearchRepository, times(0)).save(reservas);
    }

    @Test
    @Transactional
    public void deleteReservas() throws Exception {
        // Initialize the database
        reservasRepository.saveAndFlush(reservas);

        int databaseSizeBeforeDelete = reservasRepository.findAll().size();

        // Delete the reservas
        restReservasMockMvc.perform(delete("/api/reservas/{id}", reservas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Reservas> reservasList = reservasRepository.findAll();
        assertThat(reservasList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Reservas in Elasticsearch
        verify(mockReservasSearchRepository, times(1)).deleteById(reservas.getId());
    }

    @Test
    @Transactional
    public void searchReservas() throws Exception {
        // Initialize the database
        reservasRepository.saveAndFlush(reservas);
        when(mockReservasSearchRepository.search(queryStringQuery("id:" + reservas.getId())))
            .thenReturn(Collections.singletonList(reservas));
        // Search the reservas
        restReservasMockMvc.perform(get("/api/_search/reservas?query=id:" + reservas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reservas.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaEntrada").value(hasItem(DEFAULT_FECHA_ENTRADA.toString())))
            .andExpect(jsonPath("$.[*].horaEntrada").value(hasItem(DEFAULT_HORA_ENTRADA)))
            .andExpect(jsonPath("$.[*].fechaSalida").value(hasItem(DEFAULT_FECHA_SALIDA.toString())))
            .andExpect(jsonPath("$.[*].horaSalida").value(hasItem(DEFAULT_HORA_SALIDA)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reservas.class);
        Reservas reservas1 = new Reservas();
        reservas1.setId(1L);
        Reservas reservas2 = new Reservas();
        reservas2.setId(reservas1.getId());
        assertThat(reservas1).isEqualTo(reservas2);
        reservas2.setId(2L);
        assertThat(reservas1).isNotEqualTo(reservas2);
        reservas1.setId(null);
        assertThat(reservas1).isNotEqualTo(reservas2);
    }
}
