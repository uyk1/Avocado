package com.avocado.statistics.db.mysql.repository.jpa;

import com.avocado.statistics.common.utils.OrderByNull;
import com.avocado.statistics.db.mysql.entity.jpa.QConsumer;
import com.avocado.statistics.db.mysql.entity.jpa.QPurchase;
import com.avocado.statistics.db.mysql.entity.jpa.QStore;
import com.avocado.statistics.db.mysql.repository.dto.ChartDistributionDTO;
import com.avocado.statistics.db.mysql.repository.dto.QChartDistributionDTO;
import com.avocado.statistics.db.mysql.repository.dto.QSellCountTotalRevenueDTO;
import com.avocado.statistics.db.mysql.repository.dto.SellCountTotalRevenueDTO;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.avocado.statistics.db.mysql.entity.jpa.QClick.click;
import static com.avocado.statistics.db.mysql.entity.jpa.QConsumer.consumer;
import static com.avocado.statistics.db.mysql.entity.jpa.QMerchandise.merchandise;
import static com.avocado.statistics.db.mysql.entity.jpa.QMerchandiseGroup.merchandiseGroup;
import static com.avocado.statistics.db.mysql.entity.jpa.QPurchase.purchase;
import static com.avocado.statistics.db.mysql.entity.jpa.QPurchasedMerchandise.purchasedMerchandise;
import static com.avocado.statistics.db.mysql.entity.jpa.QStore.store;

@Repository
@RequiredArgsConstructor
public class StatisticsRepository {
    private final JPAQueryFactory queryFactory;

    /**
     * 조회수 조회
     * @param providerId : 스토어 ID
     * @return : 해당 스토어의 상품의 모든 조회수
     */
    public Long getClickCount(UUID providerId) {
        return queryFactory
                .select(click.id.count())
                .from(click)
                .join(click.merchandise, merchandise)
                .join(merchandise.group, merchandiseGroup)
                .where(
                        merchandiseGroup.provider.providerId.eq(providerId)
                )
                .fetchOne();
    }

    /**
     * 총 판매액 및 판매수 조회
     * @param providerId : 스토어 ID
     * @return : 해당 스토어가 판매한 상품의 개수와 얻은 총 판매액
     */
    public SellCountTotalRevenueDTO getSellCountTotalRevenue(UUID providerId) {
        return queryFactory
                .select(new QSellCountTotalRevenueDTO(
                        purchasedMerchandise.id.count(),
                        purchasedMerchandise.price.sum()
                ))
                .from(purchasedMerchandise)
                .where(
                        purchasedMerchandise.provider.providerId.eq(providerId)
                )
                .fetchOne();
    }

    /**
     * 상품수 조회
     * @param providerId : 스토어 ID
     * @return : 해당 스토어에서 판매하는 상품의 개수
     */
    public Long getMerchandiseCount(UUID providerId) {
        return queryFactory
                .select(merchandise.id.count())
                .from(merchandise)
                .join(merchandise.group, merchandiseGroup)
                .where(
                        merchandiseGroup.provider.providerId.eq(providerId)
                )
                .fetchOne();
    }

    /**
     * 퍼스널컬러 분포 조회
     * @param providerId : 스토어 ID
     * @return : 해당 스토어의 상품을 구매한 사람들의 퍼스널컬러 분포
     */
    public List<ChartDistributionDTO> getPersonalColorDistribution(UUID providerId) {
        // 해당 사람들의 퍼스널컬러 분포 조회
        return queryFactory
                .select(new QChartDistributionDTO(
                        consumer.personalColor.id,
                        consumer.personalColor.id.count()
                ))
                .from(consumer)
                .where(consumer.id.in(
                        subSelectConsumers(providerId)  // 서브쿼리
                ))
                .groupBy(consumer.personalColor.id)
                .orderBy(OrderByNull.DEFAULT)
                .fetch();
    }

    /**
     * 스토어의 상품을 구매한 사람들의 ID를 조회하는 쿼리
     * @param providerId : 스토어 ID
     * @return : 해당 스토어의 상품을 구매한 사람들의 ID 쿼리
     */
    private JPAQuery<UUID> subSelectConsumers(UUID providerId) {
        return queryFactory
                .select(purchase.consumer.id).distinct()
                .from(purchasedMerchandise)
                .join(purchasedMerchandise.purchase, purchase)
                .where(purchasedMerchandise.provider.providerId.eq(providerId));
    }
}
