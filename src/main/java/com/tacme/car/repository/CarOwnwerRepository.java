package com.tacme.car.repository;

import com.tacme.car.domain.CarOwnwer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CarOwnwer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarOwnwerRepository extends JpaRepository<CarOwnwer, Long> {

}
