package com.avocado.userserver.api.service

import com.avocado.userserver.common.error.BaseException
import com.avocado.userserver.common.error.ResponseCode
import com.avocado.userserver.common.utils.ConvertIdUtil
import com.avocado.userserver.db.entity.Consumer
import com.avocado.userserver.db.entity.Provider
import com.avocado.userserver.db.repository.ConsumerRepository
import com.avocado.userserver.db.repository.ProviderRepository
import io.jsonwebtoken.Claims
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.Jwts
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.test.context.junit.jupiter.SpringExtension

@WebFluxTest(JwtProvider::class)
@ExtendWith(SpringExtension::class)
internal class JwtProviderTest @Autowired constructor(
    private val jwtProvider: JwtProvider,
    private val providerRepository: ProviderRepository,
    private val consumerRepository: ConsumerRepository,
    private val convertIdUtil: ConvertIdUtil,
    private val consumerService: ConsumerService
) {

    @Test
    fun `제공자 Access Token 출력`() {
        runBlocking{
            val id:ByteArray = convertIdUtil.unHex("A15DEE5DE3FF11ED89BF8CB0E9DBB87D")
            val member: Provider = providerRepository.findById(id)?: throw BaseException(ResponseCode.INVALID_VALUE)
            println(jwtProvider.getAccessToken(member))
        }
    }

    @Test
    fun `소비자 Access Token 출력`() {
        runBlocking{
            val id:ByteArray = convertIdUtil.unHex("CD9C70A576D543FF9A7BA34A211F3240")
            val member: Consumer = consumerRepository.findById(id)?: throw BaseException(ResponseCode.INVALID_VALUE)
            println(jwtProvider.getAccessToken(member))
        }
    }
    

    @Test
    fun `access token 생성`() {
        runBlocking {
            val consumer = consumerService.getConsumerFromSubAndSocial("2771365526", SocialType.KAKAO)?:BaseException(ResponseCode.INVALID_VALUE);
            println(jwtProvider.getAccessToken(consumer))
        }

    }

    @Test
    fun `JWT Token 확인`() {
        runBlocking {
            println(jwtProvider.parseClaims("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQyZThhYzA1YjI0MjQzYWY4MzliNzUzZTRhZGVlNTc2IiwidHlwZSI6ImNvbnN1bWVyIn0.55k0PHRPcO8KSh2POvfQuU1_VP3JYxqR1oCWL-RVkMM"))
            println(jwtProvider.parseClaims("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJzb25hbF9jb2xvcl9pZCI6LTEsInBpY3R1cmVfdXJsIjoiaHR0cDovL2sua2FrYW9jZG4ubmV0L2RuL1V3c1U2L2J0cjBSSko5OGd2L25jd2RmT3hDSjdxdmxLczhaaTBpSzEvaW1nXzExMHgxMTAuanBnIiwibWJ0aV9pZCI6LTEsIndlaWdodCI6LTEsImlkIjoiZDJlOGFjMDViMjQyNDNhZjgzOWI3NTNlNGFkZWU1NzYiLCJ0eXBlIjoiY29uc3VtZXIiLCJlbWFpbCI6ImhlbGVuYWxpbTdAbmF2ZXIuY29tIiwiYWdlIjotMSwiaGVpZ2h0IjotMX0.TNdQkmGWD9J9bitC0Sk8xDT5zfDpENIXyMemTLwH43c"))
        }
    }

    @Test
    fun `parseClaim`() {
        runBlocking {
            jwtProvider.parseClaims("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwZXJzb25hbF9jb2xvcl9pZCI6MCwicGljdHVyZV91cmwiOiJodHRwOi8vay5rYWthb2Nkbi5uZXQvZG4vVXdzVTYvYnRyMFJKSjk4Z3YvbmN3ZGZPeENKN3F2bEtzOFppMGlLMS9pbWdfMTEweDExMC5qcGciLCJnZW5kZXIiOiJNIiwibWJ0aV9pZCI6MCwiYWdlX2dyb3VwIjoyMCwiZ3JhZGUiOjEsIm5hbWUiOiLsnoTtmJzsp4QiLCJ3ZWlnaHQiOi0xLCJpZCI6IjI0ZTI1OGFmNWIzMTRiZjE4MjY4OGYwZWZhY2IxZjA0IiwidHlwZSI6ImNvbnN1bWVyIiwiZW1haWwiOiJoZWxlbmFsaW03QG5hdmVyLmNvbSIsImhlaWdodCI6LTEsImlzcyI6ImF2b2NhZG8uY29tIiwiaWF0IjoxNjgzODY2NDAzLCJleHAiOjE2ODUxNjI0MDN9.23kkzUHuVBRpZ-wJTpW1_QzcGtIY_Rc4f50klgGNVv4");
//            jwtProvider.parseClaims("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjI0ZTI1OGFmNWIzMTRiZjE4MjY4OGYwZWZhY2IxZjA0IiwidHlwZSI6ImNvbnN1bWVyIiwiaXNzIjoiYXZvY2Fkby5jb20iLCJpYXQiOjE2ODM3Nzk5NDAsImV4cCI6MTY4Mzc3OTk0MH0.OZyj2ltJl-yZ2fjICOIbKp2kFLqVF8dkoPVOEw4oTZ4");
        }
    }
}