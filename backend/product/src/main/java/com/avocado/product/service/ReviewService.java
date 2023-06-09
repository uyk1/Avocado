package com.avocado.product.service;

import com.avocado.product.dto.query.ReviewDTO;
import com.avocado.product.dto.response.ReviewResp;
import com.avocado.product.entity.Consumer;
import com.avocado.product.entity.Merchandise;
import com.avocado.product.entity.Review;
import com.avocado.product.exception.ErrorCode;
import com.avocado.product.exception.InvalidValueException;
import com.avocado.product.kafka.service.KafkaProducer;
import com.avocado.product.repository.ConsumerRepository;
import com.avocado.product.repository.MerchandiseRepository;
import com.avocado.product.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReviewService {
    @PersistenceContext
    private final EntityManager em;
    private final MerchandiseRepository merchandiseRepository;
    private final ReviewRepository reviewRepository;
    private final ConsumerRepository consumerRepository;
    private final KafkaProducer kafkaProducer;

    @Transactional
    public void createReview(UUID reviewerId, Long merchandiseId, Byte score, String content) {
        // 기존 리뷰 존재 여부 파악
        if (reviewRepository.existsReview(reviewerId, merchandiseId))
            throw new InvalidValueException(ErrorCode.EXISTS_REVIEW);

        // 리뷰 주인 & 상품 프록시 조회
        Consumer reviewer = consumerRepository.getOne(reviewerId);
        Merchandise merchandise = merchandiseRepository.getOne(merchandiseId);

        // 리뷰 생성 및 저장
        Review review = Review.builder()
                .merchandise(merchandise)
                .consumer(reviewer)
                .score(score)
                .content(content)
                .build();
        reviewRepository.save(review);

        // Kafka Produce 용도로 상품 ID, 별점 총점, 리뷰 개수 조회
        Merchandise updatedMerchandise = merchandiseRepository.findById(merchandiseId);

        // 추가된 리뷰 업데이트
        updatedMerchandise.updateReview(1, score);

        // send to kafka
        kafkaProducer.sendCompactReview(updatedMerchandise, review.getId());
    }

    @Transactional(readOnly = true)
    public List<ReviewResp> searchReviews(Long merchandiseId) {
        List<ReviewDTO> reviews = reviewRepository.findByMerchandiseId(merchandiseId);

        // 반환용 DTO 생성 및 반환
        List<ReviewResp> result = new ArrayList<>();
        reviews.forEach((review) -> result.add(new ReviewResp(review)));
        return result;
    }

    @Transactional
    public void removeReview(UUID consumerId, Long reviewId) {
        // 기존 리뷰 찾기
        Review review = reviewRepository.findByIdWithMerchandise(reviewId);

        // 리뷰 주인 확인
        if (review != null && !review.getConsumer().getId().equals(consumerId))
            throw new InvalidValueException(ErrorCode.ACCESS_DENIED);

        if (review == null)
            throw new InvalidValueException(ErrorCode.NO_REVIEW);

        // 삭제
        reviewRepository.delete(review);

        // 상품 정보에 반영
        review.getMerchandise().updateReview(-1, -review.getScore());

        // send to kafka
        kafkaProducer.sendCompactReview(review.getMerchandise(), review.getId());
    }
}
