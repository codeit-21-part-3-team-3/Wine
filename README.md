# 나만의 와인을 찾는 방법, WINE

<img width="915" height="597" alt="스크린샷 2026-02-24 오후 1 28 26" src="https://github.com/user-attachments/assets/d8dc18ef-cd98-473d-98e5-785f82379df3" />
<br><br>

사용자가 다양한 와인에 대한 리뷰를 확인하고, 구매 결정을 돕는 **사용자 참여형 와인 리뷰 플랫폼**입니다.<br>
와인의 종류, 맛, 가격대, 별점을 기반으로 **리뷰 작성**할 수 있으며, **다양한 필터 적용**으로 와인을 골라서 볼 수 있는 기능도 포함됩니다.
<br><br>

## 🔗 프로젝트 개요
- **배포 URL:** [🚀 서비스 접속하기](https://your-service-url.com)
- **프로젝트 기간:** 2025.02.03 ~ 2026.02.24
- **팀명:** FE 21기 Part3 3팀

## 🛠 Tech Stack

### Core & Framework
- **Language:** `TypeScript`, `HTML5`, `CSS3`
- **Framework:** `Next.js (Page Router)`
- **Library:** `React`
- **Data Fetching:** `Native Fetch API`
- **State Management:** `Context API`

### Styling & UI
- **Styling:** `Tailwind CSS`
- **UI Components:** `shadcn/ui`

### Tooling & Dev Ops
- **Bundler:** `Webpack`
- **Lint & Format:** `ESLint`, `Prettier`, `husky`, `commitlint`
- **Version Control:** `Git`, `GitHub`
- **Deployment:** `Vercel`, `Docker`
- **Design:** `Figma`

## 📂 Project Structure
```text
src/
┣ pages/              // 페이지 라우팅 및 API 프록시
┃ ┣ api/proxy/        // API Proxy Route
┃ ┣ wines/            // 와인 리스트 및 상세 페이지
┃ ┣ myprofile/        // 마이페이지 (후기, 등록 와인)
┃ ┣ auth/             // 로그인 및 회원가입
┃ ┗ index.tsx         // 랜딩 페이지
┣ components/         // 공용 및 도메인별 컴포넌트
┃ ┣ common/           // 공용 UI 및 레이아웃
┃ ┣ auth/             // 인증 관련 컴포넌트
┃ ┣ wine/             // 와인 관련 컴포넌트
┃ ┗ my/               // 마이페이지 컴포넌트
┣ hooks/              // 커스텀 훅 (infinityScroll 등)
┣ constants/          // 공용 상수
┣ providers/          // 공용 Providers
┣ lib/                // 공용 API 및 설정
┣ utils/              // 공용 유틸리티 함수
┣ styles/             // 전역 스타일
┣ types/              // 전역 타입 정의
┗ assets/             // 정적 리소스 (Images, Icons, Logos, Fonts)
```

## 👥 Team & Role 

### 💻 이정용 | Team Leader
- **초기 아키텍처 설계:** GitHub 레포지토리 초기 셋팅 및 프로젝트 파일 구조 설계
- **코어 로직 구현:** 공통 `fetcher` 컴포넌트 구현 및 API 도메인별 호출 함수/타입 정의
- **주요 페이지 개발:** 와인 리스트 페이지 및 내 프로필(마이페이지) 전반 담당

### 💻 김애란 | Member
- **UI/UX 구현:** 와인 맛 그래프 시각화 및 캐럴셀(Carousel) UI 작업
- **API 연동:** 랜딩 페이지 및 상세 페이지 데이터 연동
- **공통 컴포넌트:** 프로젝트 전반에 사용되는 `Dropdown` 및 `Input` 컴포넌트 제작

### 💻 배상빈 | Member
- **환경 및 인증 설정:** GitHub Issue 시스템 구축, Proxy 셋팅 및 Auth(로그인/회원가입) 로직 구현
- **기능 구현:** `Form Validation` 로직 설계 및 `Dialog`, `Toast` 공통 컴포넌트 구현
- **UI 컴포넌트:** `Radio`, `Checkbox` 등 폼 관련 공통 컴포넌트 제작

### 💻 유지현 | Member
- **디자인 및 레이아웃:** 피그마(Figma) 시안 정리 및 디자인 시스템 관리
- **페이지 개발:** 랜딩 페이지 및 상세 페이지 UI 구현 및 데이터 연결
- **공통 컴포넌트:** `Chip`, `AlertDialog` 컴포넌트 제작 및 프로젝트 발표 자료 준비

