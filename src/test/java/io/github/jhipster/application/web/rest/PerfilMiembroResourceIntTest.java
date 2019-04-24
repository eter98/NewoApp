package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.PerfilMiembro;
import io.github.jhipster.application.repository.PerfilMiembroRepository;
import io.github.jhipster.application.repository.search.PerfilMiembroSearchRepository;
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
 * Test class for the PerfilMiembroResource REST controller.
 *
 * @see PerfilMiembroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class PerfilMiembroResourceIntTest {

    private static final String DEFAULT_BIOGRAFIA = "AAAAAAAAAA";
    private static final String UPDATED_BIOGRAFIA = "BBBBBBBBBB";

    private static final byte[] DEFAULT_FOTO_1 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOTO_1 = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FOTO_1_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOTO_1_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_FOTO_2 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOTO_2 = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FOTO_2_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOTO_2_CONTENT_TYPE = "image/png";

    private static final byte[] DEFAULT_FOT_3 = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOT_3 = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FOT_3_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOT_3_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CONOCIMIENTOS_QUE_DOMINA = "AAAAAAAAAA";
    private static final String UPDATED_CONOCIMIENTOS_QUE_DOMINA = "BBBBBBBBBB";

    private static final String DEFAULT_TEMAS_DE_INTERES = "AAAAAAAAAA";
    private static final String UPDATED_TEMAS_DE_INTERES = "BBBBBBBBBB";

    private static final String DEFAULT_FACEBOOK = "AAAAAAAAAA";
    private static final String UPDATED_FACEBOOK = "BBBBBBBBBB";

    private static final String DEFAULT_INSTAGRAM = "AAAAAAAAAA";
    private static final String UPDATED_INSTAGRAM = "BBBBBBBBBB";

    private static final String DEFAULT_ID_GOOGLE = "AAAAAAAAAA";
    private static final String UPDATED_ID_GOOGLE = "BBBBBBBBBB";

    private static final String DEFAULT_TWITER = "AAAAAAAAAA";
    private static final String UPDATED_TWITER = "BBBBBBBBBB";

    @Autowired
    private PerfilMiembroRepository perfilMiembroRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.PerfilMiembroSearchRepositoryMockConfiguration
     */
    @Autowired
    private PerfilMiembroSearchRepository mockPerfilMiembroSearchRepository;

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

    private MockMvc restPerfilMiembroMockMvc;

    private PerfilMiembro perfilMiembro;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PerfilMiembroResource perfilMiembroResource = new PerfilMiembroResource(perfilMiembroRepository, mockPerfilMiembroSearchRepository);
        this.restPerfilMiembroMockMvc = MockMvcBuilders.standaloneSetup(perfilMiembroResource)
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
    public static PerfilMiembro createEntity(EntityManager em) {
        PerfilMiembro perfilMiembro = new PerfilMiembro()
            .biografia(DEFAULT_BIOGRAFIA)
            .foto1(DEFAULT_FOTO_1)
            .foto1ContentType(DEFAULT_FOTO_1_CONTENT_TYPE)
            .foto2(DEFAULT_FOTO_2)
            .foto2ContentType(DEFAULT_FOTO_2_CONTENT_TYPE)
            .fot3(DEFAULT_FOT_3)
            .fot3ContentType(DEFAULT_FOT_3_CONTENT_TYPE)
            .conocimientosQueDomina(DEFAULT_CONOCIMIENTOS_QUE_DOMINA)
            .temasDeInteres(DEFAULT_TEMAS_DE_INTERES)
            .facebook(DEFAULT_FACEBOOK)
            .instagram(DEFAULT_INSTAGRAM)
            .idGoogle(DEFAULT_ID_GOOGLE)
            .twiter(DEFAULT_TWITER);
        return perfilMiembro;
    }

    @Before
    public void initTest() {
        perfilMiembro = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerfilMiembro() throws Exception {
        int databaseSizeBeforeCreate = perfilMiembroRepository.findAll().size();

        // Create the PerfilMiembro
        restPerfilMiembroMockMvc.perform(post("/api/perfil-miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perfilMiembro)))
            .andExpect(status().isCreated());

        // Validate the PerfilMiembro in the database
        List<PerfilMiembro> perfilMiembroList = perfilMiembroRepository.findAll();
        assertThat(perfilMiembroList).hasSize(databaseSizeBeforeCreate + 1);
        PerfilMiembro testPerfilMiembro = perfilMiembroList.get(perfilMiembroList.size() - 1);
        assertThat(testPerfilMiembro.getBiografia()).isEqualTo(DEFAULT_BIOGRAFIA);
        assertThat(testPerfilMiembro.getFoto1()).isEqualTo(DEFAULT_FOTO_1);
        assertThat(testPerfilMiembro.getFoto1ContentType()).isEqualTo(DEFAULT_FOTO_1_CONTENT_TYPE);
        assertThat(testPerfilMiembro.getFoto2()).isEqualTo(DEFAULT_FOTO_2);
        assertThat(testPerfilMiembro.getFoto2ContentType()).isEqualTo(DEFAULT_FOTO_2_CONTENT_TYPE);
        assertThat(testPerfilMiembro.getFot3()).isEqualTo(DEFAULT_FOT_3);
        assertThat(testPerfilMiembro.getFot3ContentType()).isEqualTo(DEFAULT_FOT_3_CONTENT_TYPE);
        assertThat(testPerfilMiembro.getConocimientosQueDomina()).isEqualTo(DEFAULT_CONOCIMIENTOS_QUE_DOMINA);
        assertThat(testPerfilMiembro.getTemasDeInteres()).isEqualTo(DEFAULT_TEMAS_DE_INTERES);
        assertThat(testPerfilMiembro.getFacebook()).isEqualTo(DEFAULT_FACEBOOK);
        assertThat(testPerfilMiembro.getInstagram()).isEqualTo(DEFAULT_INSTAGRAM);
        assertThat(testPerfilMiembro.getIdGoogle()).isEqualTo(DEFAULT_ID_GOOGLE);
        assertThat(testPerfilMiembro.getTwiter()).isEqualTo(DEFAULT_TWITER);

        // Validate the PerfilMiembro in Elasticsearch
        verify(mockPerfilMiembroSearchRepository, times(1)).save(testPerfilMiembro);
    }

    @Test
    @Transactional
    public void createPerfilMiembroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = perfilMiembroRepository.findAll().size();

        // Create the PerfilMiembro with an existing ID
        perfilMiembro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPerfilMiembroMockMvc.perform(post("/api/perfil-miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perfilMiembro)))
            .andExpect(status().isBadRequest());

        // Validate the PerfilMiembro in the database
        List<PerfilMiembro> perfilMiembroList = perfilMiembroRepository.findAll();
        assertThat(perfilMiembroList).hasSize(databaseSizeBeforeCreate);

        // Validate the PerfilMiembro in Elasticsearch
        verify(mockPerfilMiembroSearchRepository, times(0)).save(perfilMiembro);
    }

    @Test
    @Transactional
    public void getAllPerfilMiembros() throws Exception {
        // Initialize the database
        perfilMiembroRepository.saveAndFlush(perfilMiembro);

        // Get all the perfilMiembroList
        restPerfilMiembroMockMvc.perform(get("/api/perfil-miembros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perfilMiembro.getId().intValue())))
            .andExpect(jsonPath("$.[*].biografia").value(hasItem(DEFAULT_BIOGRAFIA.toString())))
            .andExpect(jsonPath("$.[*].foto1ContentType").value(hasItem(DEFAULT_FOTO_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foto1").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO_1))))
            .andExpect(jsonPath("$.[*].foto2ContentType").value(hasItem(DEFAULT_FOTO_2_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foto2").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO_2))))
            .andExpect(jsonPath("$.[*].fot3ContentType").value(hasItem(DEFAULT_FOT_3_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fot3").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOT_3))))
            .andExpect(jsonPath("$.[*].conocimientosQueDomina").value(hasItem(DEFAULT_CONOCIMIENTOS_QUE_DOMINA.toString())))
            .andExpect(jsonPath("$.[*].temasDeInteres").value(hasItem(DEFAULT_TEMAS_DE_INTERES.toString())))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK.toString())))
            .andExpect(jsonPath("$.[*].instagram").value(hasItem(DEFAULT_INSTAGRAM.toString())))
            .andExpect(jsonPath("$.[*].idGoogle").value(hasItem(DEFAULT_ID_GOOGLE.toString())))
            .andExpect(jsonPath("$.[*].twiter").value(hasItem(DEFAULT_TWITER.toString())));
    }
    
    @Test
    @Transactional
    public void getPerfilMiembro() throws Exception {
        // Initialize the database
        perfilMiembroRepository.saveAndFlush(perfilMiembro);

        // Get the perfilMiembro
        restPerfilMiembroMockMvc.perform(get("/api/perfil-miembros/{id}", perfilMiembro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(perfilMiembro.getId().intValue()))
            .andExpect(jsonPath("$.biografia").value(DEFAULT_BIOGRAFIA.toString()))
            .andExpect(jsonPath("$.foto1ContentType").value(DEFAULT_FOTO_1_CONTENT_TYPE))
            .andExpect(jsonPath("$.foto1").value(Base64Utils.encodeToString(DEFAULT_FOTO_1)))
            .andExpect(jsonPath("$.foto2ContentType").value(DEFAULT_FOTO_2_CONTENT_TYPE))
            .andExpect(jsonPath("$.foto2").value(Base64Utils.encodeToString(DEFAULT_FOTO_2)))
            .andExpect(jsonPath("$.fot3ContentType").value(DEFAULT_FOT_3_CONTENT_TYPE))
            .andExpect(jsonPath("$.fot3").value(Base64Utils.encodeToString(DEFAULT_FOT_3)))
            .andExpect(jsonPath("$.conocimientosQueDomina").value(DEFAULT_CONOCIMIENTOS_QUE_DOMINA.toString()))
            .andExpect(jsonPath("$.temasDeInteres").value(DEFAULT_TEMAS_DE_INTERES.toString()))
            .andExpect(jsonPath("$.facebook").value(DEFAULT_FACEBOOK.toString()))
            .andExpect(jsonPath("$.instagram").value(DEFAULT_INSTAGRAM.toString()))
            .andExpect(jsonPath("$.idGoogle").value(DEFAULT_ID_GOOGLE.toString()))
            .andExpect(jsonPath("$.twiter").value(DEFAULT_TWITER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPerfilMiembro() throws Exception {
        // Get the perfilMiembro
        restPerfilMiembroMockMvc.perform(get("/api/perfil-miembros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerfilMiembro() throws Exception {
        // Initialize the database
        perfilMiembroRepository.saveAndFlush(perfilMiembro);

        int databaseSizeBeforeUpdate = perfilMiembroRepository.findAll().size();

        // Update the perfilMiembro
        PerfilMiembro updatedPerfilMiembro = perfilMiembroRepository.findById(perfilMiembro.getId()).get();
        // Disconnect from session so that the updates on updatedPerfilMiembro are not directly saved in db
        em.detach(updatedPerfilMiembro);
        updatedPerfilMiembro
            .biografia(UPDATED_BIOGRAFIA)
            .foto1(UPDATED_FOTO_1)
            .foto1ContentType(UPDATED_FOTO_1_CONTENT_TYPE)
            .foto2(UPDATED_FOTO_2)
            .foto2ContentType(UPDATED_FOTO_2_CONTENT_TYPE)
            .fot3(UPDATED_FOT_3)
            .fot3ContentType(UPDATED_FOT_3_CONTENT_TYPE)
            .conocimientosQueDomina(UPDATED_CONOCIMIENTOS_QUE_DOMINA)
            .temasDeInteres(UPDATED_TEMAS_DE_INTERES)
            .facebook(UPDATED_FACEBOOK)
            .instagram(UPDATED_INSTAGRAM)
            .idGoogle(UPDATED_ID_GOOGLE)
            .twiter(UPDATED_TWITER);

        restPerfilMiembroMockMvc.perform(put("/api/perfil-miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPerfilMiembro)))
            .andExpect(status().isOk());

        // Validate the PerfilMiembro in the database
        List<PerfilMiembro> perfilMiembroList = perfilMiembroRepository.findAll();
        assertThat(perfilMiembroList).hasSize(databaseSizeBeforeUpdate);
        PerfilMiembro testPerfilMiembro = perfilMiembroList.get(perfilMiembroList.size() - 1);
        assertThat(testPerfilMiembro.getBiografia()).isEqualTo(UPDATED_BIOGRAFIA);
        assertThat(testPerfilMiembro.getFoto1()).isEqualTo(UPDATED_FOTO_1);
        assertThat(testPerfilMiembro.getFoto1ContentType()).isEqualTo(UPDATED_FOTO_1_CONTENT_TYPE);
        assertThat(testPerfilMiembro.getFoto2()).isEqualTo(UPDATED_FOTO_2);
        assertThat(testPerfilMiembro.getFoto2ContentType()).isEqualTo(UPDATED_FOTO_2_CONTENT_TYPE);
        assertThat(testPerfilMiembro.getFot3()).isEqualTo(UPDATED_FOT_3);
        assertThat(testPerfilMiembro.getFot3ContentType()).isEqualTo(UPDATED_FOT_3_CONTENT_TYPE);
        assertThat(testPerfilMiembro.getConocimientosQueDomina()).isEqualTo(UPDATED_CONOCIMIENTOS_QUE_DOMINA);
        assertThat(testPerfilMiembro.getTemasDeInteres()).isEqualTo(UPDATED_TEMAS_DE_INTERES);
        assertThat(testPerfilMiembro.getFacebook()).isEqualTo(UPDATED_FACEBOOK);
        assertThat(testPerfilMiembro.getInstagram()).isEqualTo(UPDATED_INSTAGRAM);
        assertThat(testPerfilMiembro.getIdGoogle()).isEqualTo(UPDATED_ID_GOOGLE);
        assertThat(testPerfilMiembro.getTwiter()).isEqualTo(UPDATED_TWITER);

        // Validate the PerfilMiembro in Elasticsearch
        verify(mockPerfilMiembroSearchRepository, times(1)).save(testPerfilMiembro);
    }

    @Test
    @Transactional
    public void updateNonExistingPerfilMiembro() throws Exception {
        int databaseSizeBeforeUpdate = perfilMiembroRepository.findAll().size();

        // Create the PerfilMiembro

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPerfilMiembroMockMvc.perform(put("/api/perfil-miembros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(perfilMiembro)))
            .andExpect(status().isBadRequest());

        // Validate the PerfilMiembro in the database
        List<PerfilMiembro> perfilMiembroList = perfilMiembroRepository.findAll();
        assertThat(perfilMiembroList).hasSize(databaseSizeBeforeUpdate);

        // Validate the PerfilMiembro in Elasticsearch
        verify(mockPerfilMiembroSearchRepository, times(0)).save(perfilMiembro);
    }

    @Test
    @Transactional
    public void deletePerfilMiembro() throws Exception {
        // Initialize the database
        perfilMiembroRepository.saveAndFlush(perfilMiembro);

        int databaseSizeBeforeDelete = perfilMiembroRepository.findAll().size();

        // Delete the perfilMiembro
        restPerfilMiembroMockMvc.perform(delete("/api/perfil-miembros/{id}", perfilMiembro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PerfilMiembro> perfilMiembroList = perfilMiembroRepository.findAll();
        assertThat(perfilMiembroList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the PerfilMiembro in Elasticsearch
        verify(mockPerfilMiembroSearchRepository, times(1)).deleteById(perfilMiembro.getId());
    }

    @Test
    @Transactional
    public void searchPerfilMiembro() throws Exception {
        // Initialize the database
        perfilMiembroRepository.saveAndFlush(perfilMiembro);
        when(mockPerfilMiembroSearchRepository.search(queryStringQuery("id:" + perfilMiembro.getId())))
            .thenReturn(Collections.singletonList(perfilMiembro));
        // Search the perfilMiembro
        restPerfilMiembroMockMvc.perform(get("/api/_search/perfil-miembros?query=id:" + perfilMiembro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perfilMiembro.getId().intValue())))
            .andExpect(jsonPath("$.[*].biografia").value(hasItem(DEFAULT_BIOGRAFIA.toString())))
            .andExpect(jsonPath("$.[*].foto1ContentType").value(hasItem(DEFAULT_FOTO_1_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foto1").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO_1))))
            .andExpect(jsonPath("$.[*].foto2ContentType").value(hasItem(DEFAULT_FOTO_2_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foto2").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO_2))))
            .andExpect(jsonPath("$.[*].fot3ContentType").value(hasItem(DEFAULT_FOT_3_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fot3").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOT_3))))
            .andExpect(jsonPath("$.[*].conocimientosQueDomina").value(hasItem(DEFAULT_CONOCIMIENTOS_QUE_DOMINA)))
            .andExpect(jsonPath("$.[*].temasDeInteres").value(hasItem(DEFAULT_TEMAS_DE_INTERES)))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK)))
            .andExpect(jsonPath("$.[*].instagram").value(hasItem(DEFAULT_INSTAGRAM)))
            .andExpect(jsonPath("$.[*].idGoogle").value(hasItem(DEFAULT_ID_GOOGLE)))
            .andExpect(jsonPath("$.[*].twiter").value(hasItem(DEFAULT_TWITER)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PerfilMiembro.class);
        PerfilMiembro perfilMiembro1 = new PerfilMiembro();
        perfilMiembro1.setId(1L);
        PerfilMiembro perfilMiembro2 = new PerfilMiembro();
        perfilMiembro2.setId(perfilMiembro1.getId());
        assertThat(perfilMiembro1).isEqualTo(perfilMiembro2);
        perfilMiembro2.setId(2L);
        assertThat(perfilMiembro1).isNotEqualTo(perfilMiembro2);
        perfilMiembro1.setId(null);
        assertThat(perfilMiembro1).isNotEqualTo(perfilMiembro2);
    }
}
