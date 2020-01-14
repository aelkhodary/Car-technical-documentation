package com.tacme.car.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tacme.car.web.rest.TestUtil;

public class CarOwnwerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarOwnwer.class);
        CarOwnwer carOwnwer1 = new CarOwnwer();
        carOwnwer1.setId(1L);
        CarOwnwer carOwnwer2 = new CarOwnwer();
        carOwnwer2.setId(carOwnwer1.getId());
        assertThat(carOwnwer1).isEqualTo(carOwnwer2);
        carOwnwer2.setId(2L);
        assertThat(carOwnwer1).isNotEqualTo(carOwnwer2);
        carOwnwer1.setId(null);
        assertThat(carOwnwer1).isNotEqualTo(carOwnwer2);
    }
}
