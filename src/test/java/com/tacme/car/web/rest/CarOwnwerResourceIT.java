package com.tacme.car.web.rest;

import com.tacme.car.CarTechnicalDocumentationApp;
import com.tacme.car.domain.CarOwnwer;
import com.tacme.car.repository.CarOwnwerRepository;
import com.tacme.car.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.tacme.car.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CarOwnwerResource} REST controller.
 */
@SpringBootTest(classes = CarTechnicalDocumentationApp.class)
public class CarOwnwerResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CarOwnwerRepository carOwnwerRepository;

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

    private MockMvc restCarOwnwerMockMvc;

    private CarOwnwer carOwnwer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarOwnwerResource carOwnwerResource = new CarOwnwerResource(carOwnwerRepository);
        this.restCarOwnwerMockMvc = MockMvcBuilders.standaloneSetup(carOwnwerResource)
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
    public static CarOwnwer createEntity(EntityManager em) {
        CarOwnwer carOwnwer = new CarOwnwer()
            .name(DEFAULT_NAME);
        return carOwnwer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarOwnwer createUpdatedEntity(EntityManager em) {
        CarOwnwer carOwnwer = new CarOwnwer()
            .name(UPDATED_NAME);
        return carOwnwer;
    }

    @BeforeEach
    public void initTest() {
        carOwnwer = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarOwnwer() throws Exception {
        int databaseSizeBeforeCreate = carOwnwerRepository.findAll().size();

        // Create the CarOwnwer
        restCarOwnwerMockMvc.perform(post("/api/car-ownwers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carOwnwer)))
            .andExpect(status().isCreated());

        // Validate the CarOwnwer in the database
        List<CarOwnwer> carOwnwerList = carOwnwerRepository.findAll();
        assertThat(carOwnwerList).hasSize(databaseSizeBeforeCreate + 1);
        CarOwnwer testCarOwnwer = carOwnwerList.get(carOwnwerList.size() - 1);
        assertThat(testCarOwnwer.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCarOwnwerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carOwnwerRepository.findAll().size();

        // Create the CarOwnwer with an existing ID
        carOwnwer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarOwnwerMockMvc.perform(post("/api/car-ownwers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carOwnwer)))
            .andExpect(status().isBadRequest());

        // Validate the CarOwnwer in the database
        List<CarOwnwer> carOwnwerList = carOwnwerRepository.findAll();
        assertThat(carOwnwerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = carOwnwerRepository.findAll().size();
        // set the field null
        carOwnwer.setName(null);

        // Create the CarOwnwer, which fails.

        restCarOwnwerMockMvc.perform(post("/api/car-ownwers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carOwnwer)))
            .andExpect(status().isBadRequest());

        List<CarOwnwer> carOwnwerList = carOwnwerRepository.findAll();
        assertThat(carOwnwerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCarOwnwers() throws Exception {
        // Initialize the database
        carOwnwerRepository.saveAndFlush(carOwnwer);

        // Get all the carOwnwerList
        restCarOwnwerMockMvc.perform(get("/api/car-ownwers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carOwnwer.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getCarOwnwer() throws Exception {
        // Initialize the database
        carOwnwerRepository.saveAndFlush(carOwnwer);

        // Get the carOwnwer
        restCarOwnwerMockMvc.perform(get("/api/car-ownwers/{id}", carOwnwer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carOwnwer.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingCarOwnwer() throws Exception {
        // Get the carOwnwer
        restCarOwnwerMockMvc.perform(get("/api/car-ownwers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarOwnwer() throws Exception {
        // Initialize the database
        carOwnwerRepository.saveAndFlush(carOwnwer);

        int databaseSizeBeforeUpdate = carOwnwerRepository.findAll().size();

        // Update the carOwnwer
        CarOwnwer updatedCarOwnwer = carOwnwerRepository.findById(carOwnwer.getId()).get();
        // Disconnect from session so that the updates on updatedCarOwnwer are not directly saved in db
        em.detach(updatedCarOwnwer);
        updatedCarOwnwer
            .name(UPDATED_NAME);

        restCarOwnwerMockMvc.perform(put("/api/car-ownwers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarOwnwer)))
            .andExpect(status().isOk());

        // Validate the CarOwnwer in the database
        List<CarOwnwer> carOwnwerList = carOwnwerRepository.findAll();
        assertThat(carOwnwerList).hasSize(databaseSizeBeforeUpdate);
        CarOwnwer testCarOwnwer = carOwnwerList.get(carOwnwerList.size() - 1);
        assertThat(testCarOwnwer.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCarOwnwer() throws Exception {
        int databaseSizeBeforeUpdate = carOwnwerRepository.findAll().size();

        // Create the CarOwnwer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarOwnwerMockMvc.perform(put("/api/car-ownwers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carOwnwer)))
            .andExpect(status().isBadRequest());

        // Validate the CarOwnwer in the database
        List<CarOwnwer> carOwnwerList = carOwnwerRepository.findAll();
        assertThat(carOwnwerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarOwnwer() throws Exception {
        // Initialize the database
        carOwnwerRepository.saveAndFlush(carOwnwer);

        int databaseSizeBeforeDelete = carOwnwerRepository.findAll().size();

        // Delete the carOwnwer
        restCarOwnwerMockMvc.perform(delete("/api/car-ownwers/{id}", carOwnwer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CarOwnwer> carOwnwerList = carOwnwerRepository.findAll();
        assertThat(carOwnwerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
