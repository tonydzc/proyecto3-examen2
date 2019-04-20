package com.adiazc.jhipsterapp.web.rest;

import com.adiazc.jhipsterapp.UmlApp;

import com.adiazc.jhipsterapp.domain.Spring;
import com.adiazc.jhipsterapp.repository.SpringRepository;
import com.adiazc.jhipsterapp.web.rest.errors.ExceptionTranslator;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.adiazc.jhipsterapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SpringResource REST controller.
 *
 * @see SpringResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UmlApp.class)
public class SpringResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_STAR_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_STAR_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    @Autowired
    private SpringRepository springRepository;

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

    private MockMvc restSpringMockMvc;

    private Spring spring;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpringResource springResource = new SpringResource(springRepository);
        this.restSpringMockMvc = MockMvcBuilders.standaloneSetup(springResource)
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
    public static Spring createEntity(EntityManager em) {
        Spring spring = new Spring()
            .name(DEFAULT_NAME)
            .starDate(DEFAULT_STAR_DATE)
            .endDate(DEFAULT_END_DATE)
            .status(DEFAULT_STATUS);
        return spring;
    }

    @Before
    public void initTest() {
        spring = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpring() throws Exception {
        int databaseSizeBeforeCreate = springRepository.findAll().size();

        // Create the Spring
        restSpringMockMvc.perform(post("/api/springs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spring)))
            .andExpect(status().isCreated());

        // Validate the Spring in the database
        List<Spring> springList = springRepository.findAll();
        assertThat(springList).hasSize(databaseSizeBeforeCreate + 1);
        Spring testSpring = springList.get(springList.size() - 1);
        assertThat(testSpring.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSpring.getStarDate()).isEqualTo(DEFAULT_STAR_DATE);
        assertThat(testSpring.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testSpring.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createSpringWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = springRepository.findAll().size();

        // Create the Spring with an existing ID
        spring.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpringMockMvc.perform(post("/api/springs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spring)))
            .andExpect(status().isBadRequest());

        // Validate the Spring in the database
        List<Spring> springList = springRepository.findAll();
        assertThat(springList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSprings() throws Exception {
        // Initialize the database
        springRepository.saveAndFlush(spring);

        // Get all the springList
        restSpringMockMvc.perform(get("/api/springs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spring.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].starDate").value(hasItem(DEFAULT_STAR_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getSpring() throws Exception {
        // Initialize the database
        springRepository.saveAndFlush(spring);

        // Get the spring
        restSpringMockMvc.perform(get("/api/springs/{id}", spring.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(spring.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.starDate").value(DEFAULT_STAR_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSpring() throws Exception {
        // Get the spring
        restSpringMockMvc.perform(get("/api/springs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpring() throws Exception {
        // Initialize the database
        springRepository.saveAndFlush(spring);

        int databaseSizeBeforeUpdate = springRepository.findAll().size();

        // Update the spring
        Spring updatedSpring = springRepository.findById(spring.getId()).get();
        // Disconnect from session so that the updates on updatedSpring are not directly saved in db
        em.detach(updatedSpring);
        updatedSpring
            .name(UPDATED_NAME)
            .starDate(UPDATED_STAR_DATE)
            .endDate(UPDATED_END_DATE)
            .status(UPDATED_STATUS);

        restSpringMockMvc.perform(put("/api/springs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSpring)))
            .andExpect(status().isOk());

        // Validate the Spring in the database
        List<Spring> springList = springRepository.findAll();
        assertThat(springList).hasSize(databaseSizeBeforeUpdate);
        Spring testSpring = springList.get(springList.size() - 1);
        assertThat(testSpring.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSpring.getStarDate()).isEqualTo(UPDATED_STAR_DATE);
        assertThat(testSpring.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testSpring.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingSpring() throws Exception {
        int databaseSizeBeforeUpdate = springRepository.findAll().size();

        // Create the Spring

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpringMockMvc.perform(put("/api/springs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spring)))
            .andExpect(status().isBadRequest());

        // Validate the Spring in the database
        List<Spring> springList = springRepository.findAll();
        assertThat(springList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSpring() throws Exception {
        // Initialize the database
        springRepository.saveAndFlush(spring);

        int databaseSizeBeforeDelete = springRepository.findAll().size();

        // Delete the spring
        restSpringMockMvc.perform(delete("/api/springs/{id}", spring.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Spring> springList = springRepository.findAll();
        assertThat(springList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Spring.class);
        Spring spring1 = new Spring();
        spring1.setId(1L);
        Spring spring2 = new Spring();
        spring2.setId(spring1.getId());
        assertThat(spring1).isEqualTo(spring2);
        spring2.setId(2L);
        assertThat(spring1).isNotEqualTo(spring2);
        spring1.setId(null);
        assertThat(spring1).isNotEqualTo(spring2);
    }
}
