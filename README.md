
# 냉털마스터 naengtul-master (개발중 ·  ·  · )

> **냉장고에 있는 재료만으로 만들 수 있는 레시피를 AI가 추천해줍니다.**

사용자가 보유한 재료를 입력하면, 백엔드에서 OpenAI API를 호출해 가능한 레시피를 생성하고, 추천 결과를 React UI로 보여줍니다.

---

## ✨ 사용 방법

* 사용자는 냉장고에 있는 재료를 입력합니다.
* AI(OpenAI)를 통해 여러 가지 조합의 레시피를 생성합니다.

---

## 🚀 주요 특징

* 냉장고 재료 기반 레시피 자동 생성 (OpenAI API)
* 사용자 인증 및 권한 관리 (JWT + Spring Security)
* RESTful API 설계로 확장성과 유지보수성 확보
* 프론트엔드는 반응형 UI(React + Tailwind)로 빠른 사용성 제공
* JPA를 통한 영속성 관리

---

## 🧰 기술 스택

### 백엔드

* Java + Spring Boot
* Spring Security (JWT 기반 인증)
* Spring Data JPA
* RESTful API
* OpenAI API (레시피 생성)
* MySQL (database)

### 프론트엔드

* React
* Tailwind CSS

### 개발 환경

* IDE: IntelliJ IDEA, VS Code
* 빌드: Gradle


---

## 🧪 테스트 전략

* 단위 테스트: JUnit
* 통합 테스트: Spring Boot Test (H2 인메모리 DB 활용)

