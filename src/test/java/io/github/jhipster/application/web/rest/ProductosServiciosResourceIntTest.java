package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.NewoApp;

import io.github.jhipster.application.domain.ProductosServicios;
import io.github.jhipster.application.repository.ProductosServiciosRepository;
import io.github.jhipster.application.repository.search.ProductosServiciosSearchRepository;
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
 * Test class for the ProductosServiciosResource REST controller.
 *
 * @see ProductosServiciosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NewoApp.class)
public class ProductosServiciosResourceIntTest {

    private static final String DEFAULT_NOMBRE_PRODUCTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_PRODUCTO = "BBBBBBBBBB";

    private static final byte[] DEFAULT_FOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOTO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOTO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Integer DEFAULT_INVENTARIABLES = 1;
    private static final Integer UPDATED_INVENTARIABLES = 2;

    private static final Integer DEFAULT_VALOR = 1;
    private static final Integer UPDATED_VALOR = 2;

    private static final Integer DEFAULT_IMPUESTO = 1;
    private static final Integer UPDATED_IMPUESTO = 2;

    @Autowired
    private ProductosServiciosRepository productosServiciosRepository;

    /**
     * This repository is mocked in the io.github.jhipster.application.repository.search test package.
     *
     * @see io.github.jhipster.application.repository.search.ProductosServiciosSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductosServiciosSearchRepository mockProductosServiciosSearchRepository;

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

    private MockMvc restProductosServiciosMockMvc;

    private ProductosServicios productosServicios;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductosServiciosResource productosServiciosResource = new ProductosServiciosResource(productosServiciosRepository, mockProductosServiciosSearchRepository);
        this.restProductosServiciosMockMvc = MockMvcBuilders.standaloneSetup(productosServiciosResource)
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
    public static ProductosServicios createEntity(EntityManager em) {
        ProductosServicios productosServicios = new ProductosServicios()
            .nombreProducto(DEFAULT_NOMBRE_PRODUCTO)
            .foto(DEFAULT_FOTO)
            .fotoContentType(DEFAULT_FOTO_CONTENT_TYPE)
            .descripcion(DEFAULT_DESCRIPCION)
            .inventariables(DEFAULT_INVENTARIABLES)
            .valor(DEFAULT_VALOR)
            .impuesto(DEFAULT_IMPUESTO);
        return productosServicios;
    }

    @Before
    public void initTest() {
        productosServicios = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductosServicios() throws Exception {
        int databaseSizeBeforeCreate = productosServiciosRepository.findAll().size();

        // Create the ProductosServicios
        restProductosServiciosMockMvc.perform(post("/api/productos-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosServicios)))
            .andExpect(status().isCreated());

        // Validate the ProductosServicios in the database
        List<ProductosServicios> productosServiciosList = productosServiciosRepository.findAll();
        assertThat(productosServiciosList).hasSize(databaseSizeBeforeCreate + 1);
        ProductosServicios testProductosServicios = productosServiciosList.get(productosServiciosList.size() - 1);
        assertThat(testProductosServicios.getNombreProducto()).isEqualTo(DEFAULT_NOMBRE_PRODUCTO);
        assertThat(testProductosServicios.getFoto()).isEqualTo(DEFAULT_FOTO);
        assertThat(testProductosServicios.getFotoContentType()).isEqualTo(DEFAULT_FOTO_CONTENT_TYPE);
        assertThat(testProductosServicios.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testProductosServicios.getInventariables()).isEqualTo(DEFAULT_INVENTARIABLES);
        assertThat(testProductosServicios.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testProductosServicios.getImpuesto()).isEqualTo(DEFAULT_IMPUESTO);

        // Validate the ProductosServicios in Elasticsearch
        verify(mockProductosServiciosSearchRepository, times(1)).save(testProductosServicios);
    }

    @Test
    @Transactional
    public void createProductosServiciosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productosServiciosRepository.findAll().size();

        // Create the ProductosServicios with an existing ID
        productosServicios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductosServiciosMockMvc.perform(post("/api/productos-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosServicios)))
            .andExpect(status().isBadRequest());

        // Validate the ProductosServicios in the database
        List<ProductosServicios> productosServiciosList = productosServiciosRepository.findAll();
        assertThat(productosServiciosList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductosServicios in Elasticsearch
        verify(mockProductosServiciosSearchRepository, times(0)).save(productosServicios);
    }

    @Test
    @Transactional
    public void getAllProductosServicios() throws Exception {
        // Initialize the database
        productosServiciosRepository.saveAndFlush(productosServicios);

        // Get all the productosServiciosList
        restProductosServiciosMockMvc.perform(get("/api/productos-servicios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productosServicios.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreProducto").value(hasItem(DEFAULT_NOMBRE_PRODUCTO.toString())))
            .andExpect(jsonPath("$.[*].fotoContentType").value(hasItem(DEFAULT_FOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foto").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO))))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].inventariables").value(hasItem(DEFAULT_INVENTARIABLES)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)))
            .andExpect(jsonPath("$.[*].impuesto").value(hasItem(DEFAULT_IMPUESTO)));
    }
    
    @Test
    @Transactional
    public void getProductosServicios() throws Exception {
        // Initialize the database
        productosServiciosRepository.saveAndFlush(productosServicios);

        // Get the productosServicios
        restProductosServiciosMockMvc.perform(get("/api/productos-servicios/{id}", productosServicios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productosServicios.getId().intValue()))
            .andExpect(jsonPath("$.nombreProducto").value(DEFAULT_NOMBRE_PRODUCTO.toString()))
            .andExpect(jsonPath("$.fotoContentType").value(DEFAULT_FOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.foto").value(Base64Utils.encodeToString(DEFAULT_FOTO)))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.inventariables").value(DEFAULT_INVENTARIABLES))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR))
            .andExpect(jsonPath("$.impuesto").value(DEFAULT_IMPUESTO));
    }

    @Test
    @Transactional
    public void getNonExistingProductosServicios() throws Exception {
        // Get the productosServicios
        restProductosServiciosMockMvc.perform(get("/api/productos-servicios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductosServicios() throws Exception {
        // Initialize the database
        productosServiciosRepository.saveAndFlush(productosServicios);

        int databaseSizeBeforeUpdate = productosServiciosRepository.findAll().size();

        // Update the productosServicios
        ProductosServicios updatedProductosServicios = productosServiciosRepository.findById(productosServicios.getId()).get();
        // Disconnect from session so that the updates on updatedProductosServicios are not directly saved in db
        em.detach(updatedProductosServicios);
        updatedProductosServicios
            .nombreProducto(UPDATED_NOMBRE_PRODUCTO)
            .foto(UPDATED_FOTO)
            .fotoContentType(UPDATED_FOTO_CONTENT_TYPE)
            .descripcion(UPDATED_DESCRIPCION)
            .inventariables(UPDATED_INVENTARIABLES)
            .valor(UPDATED_VALOR)
            .impuesto(UPDATED_IMPUESTO);

        restProductosServiciosMockMvc.perform(put("/api/productos-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductosServicios)))
            .andExpect(status().isOk());

        // Validate the ProductosServicios in the database
        List<ProductosServicios> productosServiciosList = productosServiciosRepository.findAll();
        assertThat(productosServiciosList).hasSize(databaseSizeBeforeUpdate);
        ProductosServicios testProductosServicios = productosServiciosList.get(productosServiciosList.size() - 1);
        assertThat(testProductosServicios.getNombreProducto()).isEqualTo(UPDATED_NOMBRE_PRODUCTO);
        assertThat(testProductosServicios.getFoto()).isEqualTo(UPDATED_FOTO);
        assertThat(testProductosServicios.getFotoContentType()).isEqualTo(UPDATED_FOTO_CONTENT_TYPE);
        assertThat(testProductosServicios.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testProductosServicios.getInventariables()).isEqualTo(UPDATED_INVENTARIABLES);
        assertThat(testProductosServicios.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testProductosServicios.getImpuesto()).isEqualTo(UPDATED_IMPUESTO);

        // Validate the ProductosServicios in Elasticsearch
        verify(mockProductosServiciosSearchRepository, times(1)).save(testProductosServicios);
    }

    @Test
    @Transactional
    public void updateNonExistingProductosServicios() throws Exception {
        int databaseSizeBeforeUpdate = productosServiciosRepository.findAll().size();

        // Create the ProductosServicios

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductosServiciosMockMvc.perform(put("/api/productos-servicios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productosServicios)))
            .andExpect(status().isBadRequest());

        // Validate the ProductosServicios in the database
        List<ProductosServicios> productosServiciosList = productosServiciosRepository.findAll();
        assertThat(productosServiciosList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductosServicios in Elasticsearch
        verify(mockProductosServiciosSearchRepository, times(0)).save(productosServicios);
    }

    @Test
    @Transactional
    public void deleteProductosServicios() throws Exception {
        // Initialize the database
        productosServiciosRepository.saveAndFlush(productosServicios);

        int databaseSizeBeforeDelete = productosServiciosRepository.findAll().size();

        // Delete the productosServicios
        restProductosServiciosMockMvc.perform(delete("/api/productos-servicios/{id}", productosServicios.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductosServicios> productosServiciosList = productosServiciosRepository.findAll();
        assertThat(productosServiciosList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductosServicios in Elasticsearch
        verify(mockProductosServiciosSearchRepository, times(1)).deleteById(productosServicios.getId());
    }

    @Test
    @Transactional
    public void searchProductosServicios() throws Exception {
        // Initialize the database
        productosServiciosRepository.saveAndFlush(productosServicios);
        when(mockProductosServiciosSearchRepository.search(queryStringQuery("id:" + productosServicios.getId())))
            .thenReturn(Collections.singletonList(productosServicios));
        // Search the productosServicios
        restProductosServiciosMockMvc.perform(get("/api/_search/productos-servicios?query=id:" + productosServicios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productosServicios.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreProducto").value(hasItem(DEFAULT_NOMBRE_PRODUCTO)))
            .andExpect(jsonPath("$.[*].fotoContentType").value(hasItem(DEFAULT_FOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].foto").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO))))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].inventariables").value(hasItem(DEFAULT_INVENTARIABLES)))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR)))
            .andExpect(jsonPath("$.[*].impuesto").value(hasItem(DEFAULT_IMPUESTO)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductosServicios.class);
        ProductosServicios productosServicios1 = new ProductosServicios();
        productosServicios1.setId(1L);
        ProductosServicios productosServicios2 = new ProductosServicios();
        productosServicios2.setId(productosServicios1.getId());
        assertThat(productosServicios1).isEqualTo(productosServicios2);
        productosServicios2.setId(2L);
        assertThat(productosServicios1).isNotEqualTo(productosServicios2);
        productosServicios1.setId(null);
        assertThat(productosServicios1).isNotEqualTo(productosServicios2);
    }
}
