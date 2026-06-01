# WOODPLACE - 가구 쇼핑몰 UI 퍼블리싱

포트폴리오용 가구 쇼핑몰 웹사이트입니다. HTML/CSS/JavaScript를 사용하여 반응형 디자인으로 구현되었습니다.

## 📁 프로젝트 구조

```
woodplace/
├── index.html                 # 메인 페이지
├── login.html                 # 로그인 페이지
├── join.html                  # 회원가입 페이지
├── product-list.html          # 상품 목록 페이지 (개발 예정)
├── product-detail.html        # 상품 상세 페이지 (개발 예정)
├── cart.html                  # 장바구니 페이지
├── search.html                # 검색 결과 페이지 (개발 예정)
│
├── css/
│   ├── common.css             # 공통 스타일 (변수, 리셋, 컴포넌트)
│   ├── layout.css             # 레이아웃 (헤더, 푸터, 모달 등)
│   └── pages.css              # 페이지별 스타일 (로그인, 장바구니 등)
│
├── js/
│   └── common.js              # 공통 유틸리티 함수
│
├── images/
│   └── placeholder-furniture.jpg  # 임시 이미지 파일
│
└── README.md                  # 이 파일
```

## 🎨 디자인 가이드

### 색상 팔레트
- **Primary**: `#1a1a1a` (검정)
- **Brown**: `#8B7355` (우드 톤)
- **Background**: `#FFFAF0` (아이보리)
- **Light Background**: `#F5F5F5`
- **Beige**: `#E8DCC8`

### 폰트
- **Font Family**: Pretendard (Google Fonts)
- **Font Sizes**: 12px ~ 36px (CSS 변수로 관리)
- **Font Weights**: 300 ~ 700

### 레이아웃
- **Max Width**: 1440px
- **Responsive Breakpoints**:
  - Desktop: 1440px 이상
  - Tablet: 768px 이하
  - Mobile: 480px 이하

### 간격 시스템
- **Base Unit**: 4px
- **Spacing**: 4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px, 100px

## 🔧 기술 스택

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, CSS Variables
- **JavaScript**: ES6+, No Framework
- **Icons**: Google Material Icons
- **Fonts**: Google Fonts (Pretendard)

## 📱 구현된 기능

### 1. 로그인 페이지 (`login.html`)
- 이메일, 비밀번호 입력
- 자동 로그인 체크박스
- 소셜 로그인 UI (카카오, 네이버)
- 폼 유효성 검증
- 로컬 스토리지를 이용한 사용자 정보 저장

### 2. 회원가입 페이지 (`join.html`)
- 이름, 이메일, 비밀번호 입력
- 비밀번호 강도 표시
- 휴대폰 번호, 주소 입력
- 약관 동의 필수 체크
- 실시간 폼 유효성 검증

### 3. 메인 페이지 (`index.html`)
- 헤더 (로고, 네비게이션, 검색, 아이콘)
- 히어로 섹션 (배너, 텍스트)
- 상품 카드 그리드 (4열)
- 찜하기 기능
- 전시장 소개 섹션
- 서비스 소개 섹션 (5개 아이콘 박스)
- 푸터 (회사정보, 고객서비스, 약관, 연락처, SNS)

### 4. 장바구니 페이지 (`cart.html`)
- 장바구니 아이템 리스트
- 수량 증감 버튼
- 개별 상품 가격 계산
- 주문 요약 (소계, 배송료, 총액)
- 상품 삭제 기능
- 빈 장바구니 상태 처리

## 💾 공통 JavaScript 유틸리티 (`js/common.js`)

### DOM 관련
- `DOM.get()` - 요소 선택
- `DOM.getAll()` - 여러 요소 선택
- `DOM.create()` - 요소 생성

### 포맷팅
- `Format.price()` - 금액 포맷 (1,000 형식)
- `Format.date()` - 날짜 포맷

### 로컬 스토리지
- `Storage.set()` - 데이터 저장
- `Storage.get()` - 데이터 조회
- `Storage.remove()` - 데이터 삭제

### 검증
- `Validator.isEmail()` - 이메일 검증
- `Validator.isPassword()` - 비밀번호 검증
- `Validator.isPhone()` - 휴대폰 번호 검증
- `Validator.isRequired()` - 필수 필드 검증

### 폼 관련
- `Form.getData()` - 폼 데이터 추출
- `Form.validate()` - 폼 유효성 검증
- `Form.showError()` - 에러 메시지 표시
- `Form.clearError()` - 에러 제거

### 장바구니 관리
- `Cart.getItems()` - 장바구니 조회
- `Cart.addItem()` - 상품 추가
- `Cart.removeItem()` - 상품 삭제
- `Cart.updateQuantity()` - 수량 변경

### 위시리스트 관리
- `Wishlist.getItems()` - 위시리스트 조회
- `Wishlist.addItem()` - 상품 추가
- `Wishlist.removeItem()` - 상품 삭제

### 모달 관리
- `Modal.open()` - 모달 열기
- `Modal.close()` - 모달 닫기

## 🚀 사용 방법

### 1. 파일 구조 확인
모든 HTML, CSS, JS 파일이 올바른 디렉토리에 있는지 확인하세요.

### 2. 웹 서버 실행
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000

# Node.js (Live Server)
npx live-server
```

### 3. 브라우저에서 열기
`http://localhost:8000`

## 📝 수정 및 확장 가이드

### 이미지 변경
모든 이미지는 `images/placeholder-furniture.jpg`로 설정되어 있습니다.
실제 이미지로 교체하려면 다음을 변경하세요:

```html
<!-- 변경 전 -->
<img src="images/placeholder-furniture.jpg" alt="상품 이미지" />

<!-- 변경 후 -->
<img src="images/actual-product-name.jpg" alt="상품 이미지" />
```

### 색상 변경
`css/common.css`의 CSS 변수를 수정하세요:

```css
:root {
  --color-primary: #1a1a1a;      /* 기본 색상 */
  --color-brown: #8B7355;        /* 강조 색상 */
  /* 다른 색상들... */
}
```

### 폰트 크기 조정
`css/common.css`의 폰트 사이즈 변수를 수정하세요:

```css
:root {
  --font-size-base: 16px;
  --font-size-lg: 18px;
  /* 다른 크기들... */
}
```

### 새로운 페이지 추가
1. 새로운 HTML 파일 생성
2. Header와 Footer 복사
3. `css/common.css`, `css/layout.css`, `js/common.js` import
4. 필요한 경우 `css/pages.css`에 스타일 추가

### 상품 데이터 통합
현재는 하드코딩된 상품 데이터를 사용합니다.
JSON 데이터나 API와 연결하려면:

```javascript
// 테스트 데이터 (임시)
const products = [
  {
    id: 1,
    name: "편안한 패브릭 소파",
    price: 899000,
    image: "images/sofa.jpg"
  },
  // ...
];

// API 연동 (실제)
fetch('/api/products')
  .then(res => res.json())
  .then(data => renderProducts(data));
```

## 🐛 알려진 문제 및 개선 사항

### 1차 작업 완료 항목
- ✅ 공통 CSS 구조 (variables, components)
- ✅ Header 및 Footer
- ✅ 로그인/회원가입 페이지
- ✅ 메인 페이지 (Hero, 상품, 서비스)
- ✅ 장바구니 페이지
- ✅ 공통 JavaScript 유틸리티

### 2차 개발 예정 항목
- ⏳ 상품 목록 페이지 (필터, 정렬)
- ⏳ 상품 상세 페이지 (갤러리, 리뷰)
- ⏳ 검색 결과 페이지
- ⏳ 마이페이지 (주문 조회, 찜 목록)
- ⏳ 결제 페이지
- ⏳ Swiper를 이용한 캐러셀
- ⏳ 실제 백엔드 API 연동
- ⏳ 사용자 인증 시스템

## 📄 라이센스

이 프로젝트는 포트폴리오 목적으로 작성되었습니다.

## 👨‍💻 작성자

- 한글 코드 작성 및 주석
- Semantic HTML 구조
- 반응형 디자인
- 모던 CSS 기법 (Grid, Flexbox, Variables)

---

**마지막 수정**: 2026년 6월 1일
**버전**: 1.0.0
