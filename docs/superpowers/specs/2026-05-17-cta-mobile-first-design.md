# 전체 반응형 모바일 우선 전환 설계

## 배경

기존 반응형 CSS는 데스크톱 우선(`max-width`) 방식이며, 브레이크포인트가 480px, 768px, 1024px로 Tailwind v4 표준(640px, 768px, 1024px)과 불일치한다. Hero CTA와 Contact CTA의 모바일 대응이 불충분하다(480px 이하에서만 축소, 중간 구간 누락).

## 목표

모든 반응형 규칙을 Tailwind v4 브레이크포인트에 맞춰 모바일 우선(`min-width`)으로 전환한다. 미디어 쿼리는 접근성을 위해 `rem` 단위를 사용한다.

## 브레이크포인트 기준

Tailwind v4 기본값 사용 (`rem` 단위, 기본 16px 루트 기준):

| 이름 | min-width | rem | 전통적 명칭 |
|------|-----------|-----|-------------|
| 기본  | 0 | 0 | 모바일 |
| sm   | 640px | 40rem | 큰 모바일/작은 태블릿 |
| md   | 768px | 48rem | 태블릿 세로 |
| lg   | 1024px | 64rem | 태블릿 가로/소형 데스크톱 |

480px 브레이크포인트는 제거하고 640px(sm)로 대체한다. 미디어 쿼리에 `rem` 단위를 사용하여 사용자 글꼴 크기 설정을 존중한다.

## 변경 사항

### 1. 폰트/스페이싱 토큰

`:root` 기본값을 모바일 기준으로 변경하고, `min-width`로 점진 확장한다. 현재 동작을 보존하기 위해 최대값은 `≥768px`에서 적용한다(현재 769px+에서 최대값이 이미 적용됨).

| 토큰 | 모바일 (<640) | ≥640px (sm) | ≥768px (md) |
|------|-------------|-------------|-------------|
| `--fs-3xl` | 1.625rem | 2rem | 2.75rem |
| `--fs-2xl` | 1.5rem | — | 2rem |
| `--space-2xl` | 3rem | 4rem | 6rem |

```css
:root {
  /* 기존 토큰 유지, 다음 3개만 모바일 기본값으로 변경 */
  --fs-3xl: 1.625rem;
  --fs-2xl: 1.5rem;
  --space-2xl: 3rem;
}

@media (min-width: 40rem) {
  :root {
    --fs-3xl: 2rem;
    --space-2xl: 4rem;
  }
}

@media (min-width: 48rem) {
  :root {
    --fs-3xl: 2.75rem;
    --fs-2xl: 2rem;
    --space-2xl: 6rem;
  }
}
```

### 2. Navigation

기본 스타일을 모바일(햄버거 메뉴)로 설정하고, `≥1024px`에서 데스크톱 네비게이션으로 확장한다. 이 변환은 기본 스타일 재작성 범위가 가장 크다.

| 속성 | 모바일 (<1024) | ≥1024px (lg) |
|------|--------------|-------------|
| `.nav-toggle` | `display: flex` | `display: none` |
| `.nav-menu` | 숨김/드롭다운 (absolute) | `display: flex` 인라인 |
| `.nav-links` | column, gap sm | row, gap lg |
| `.nav-ctas` | column, 100% | row |
| `.nav-cta` | 100% 폭, 중앙 | auto 폭 |
| `.nav-link` | 대문자 없음, 기본 폰트 | uppercase, 작은 폰트 |

### 3. Hero CTA

| 속성 | 모바일 (<640) | ≥640px (sm) | ≥768px (md) |
|------|-------------|-------------|-------------|
| `.hero-ctas` 방향 | column | column | row |
| `.hero-ctas` 정렬 | center | center | center |
| `.hero-cta` 폭 | 100% | auto | auto |
| `.hero-cta` 정렬 | center | center | center |

```css
.hero-ctas {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.hero-cta {
  width: 100%;
  justify-content: center;
  /* 기존 inline-flex, gap, font, padding, radius, transition 유지 */
}

@media (min-width: 40rem) {
  .hero-cta {
    width: auto;
  }
}

@media (min-width: 48rem) {
  .hero-ctas {
    flex-direction: row;
  }
}
```

### 4. Hero

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| `.hero` min-height | 80vh | 100vh |

```css
.hero {
  min-height: 80vh;
  /* 기존 position, display, align, text-align, overflow, background 유지 */
}

@media (min-width: 48rem) {
  .hero {
    min-height: 100vh;
  }
}
```

### 5. Bio Grid

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| `.bio-grid` | `1fr`, text-align center | `280px 1fr`, text-align left |
| `.portrait-img` | 200×200px | 240×240px |

```css
.bio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  align-items: start;
  text-align: center;
}

.portrait-img {
  width: 200px;
  height: 200px;
  /* 기존 object-fit, border-radius, margin, border 유지 */
}

@media (min-width: 48rem) {
  .bio-grid {
    grid-template-columns: 280px 1fr;
    text-align: left;
  }

  .portrait-img {
    width: 240px;
    height: 240px;
  }
}
```

### 6. Conditions / Signature Grids

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| `.conditions-groups` | `1fr` | `repeat(2, 1fr)` |
| `.signature-grid` | `1fr` | `repeat(2, 1fr)` |

```css
.conditions-groups {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  /* 기존 margin-bottom 유지 */
}

.signature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

@media (min-width: 48rem) {
  .conditions-groups {
    grid-template-columns: repeat(2, 1fr);
  }

  .signature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### 7. Reviews Grid

`.reviews-grid`는 `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`를 유지한다. 기존 `≤768px` 강제 1칸 규칙을 제거하면 auto-fit가 자연스럽게 반응한다. 640px 이상에서는 2칸, 560px 이하에서는 1칸으로 자동 전환된다.

### 8. Contact Grid

**설계 변경**: 기존 `≤1024px`에서 1칸 전환을 `≥768px`에서 2칸 전환으로 변경한다. 768px에서 각 칸은 약 340px로 연락처 정보와 진료시간이 나란히 배치 가능하다.

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| `.contact-grid` 칸 | 1fr | repeat(2, 1fr) |
| `.contact-grid` gap | var(--space-lg) | var(--space-xl) |

```css
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

@media (min-width: 48rem) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-xl);
  }
}
```

### 9. Contact CTA

| 속성 | 모바일 (<640) | ≥640px (sm) | ≥768px (md) |
|------|-------------|-------------|-------------|
| `.contact-ctas` 방향 | column | column | row |
| `.contact-ctas` 정렬 | center | center | start |
| `.contact-cta` 폭 | 100% | auto | auto |
| `.contact-cta` 정렬 | center | center | start |
| `.contact-cta` white-space | normal | nowrap | nowrap |

```css
.contact-ctas {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}

.contact-cta {
  width: 100%;
  justify-content: center;
  white-space: normal;
  /* 기존 inline-flex, gap, font, padding, radius, transition 유지 */
}

@media (min-width: 40rem) {
  .contact-cta {
    width: auto;
    white-space: nowrap;
  }
}

@media (min-width: 48rem) {
  .contact-ctas {
    flex-direction: row;
    justify-content: flex-start;
  }
}
```

### 10. Map Container

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| `.map-container` aspect-ratio | 4/3 | 16/9 |

```css
.map-container {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

@media (min-width: 48rem) {
  .map-container {
    aspect-ratio: 16 / 9;
  }
}
```

### 11. Floating CTA

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| bottom/right | var(--space-sm) | var(--space-lg) |

```css
.floating-cta {
  /* 기존 position, size, color, shadow 유지 */
  bottom: var(--space-sm);
  right: var(--space-sm);
}

@media (min-width: 48rem) {
  .floating-cta {
    bottom: var(--space-lg);
    right: var(--space-lg);
  }
}
```

### 12. Treatments / Tags

| 속성 | 모바일 (<640) | ≥640px (sm) |
|------|-------------|-------------|
| `.treatments` gap | 6px | var(--space-xs) |
| `.tag` font-size | 0.8125rem | var(--fs-sm) |
| `.tag` padding | 4px 12px | 6px 16px |

```css
.treatments {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-bottom: var(--space-xl);
}

.tag {
  font-size: 0.8125rem;
  padding: 4px 12px;
  /* 기존 color, background, border-radius, border, transition 유지 */
}

@media (min-width: 40rem) {
  .treatments {
    gap: var(--space-xs);
  }

  .tag {
    font-size: var(--fs-sm);
    padding: 6px 16px;
  }
}
```

### 13. 기존 max-width 블록 전면 제거

기존 반응형 섹션(908–1025행)의 모든 `max-width` 규칙을 제거하고, 각 컴포넌트 기본 스타일을 모바일 기준으로 재작성한 뒤 `min-width` 쿼리로 점진 확장한다. 결과적으로 파일 끝의 `/* ── Responsive ── */` 섹션 전체가 사라지고, 각 컴포넌트 규칙 바로 아래에 `@media (min-width: …)` 블록이 위치한다.

### 브레이크포인트 요약

| min-width (rem) | px | 커버하는 변경 |
|-----------------|-----|-------------|
| 기본 | 0 | 모바일 기본값 (작은 폰트, 세로 레이아웃, 1칸 그리드, 햄버거 메뉴) |
| 40rem (sm) | 640 | 태그/CTA 폭 확장, 스페이싱 증가, 폰트 토큰 중간값 |
| 48rem (md) | 768 | 2칸 그리드, 가로 CTA, 히어로 전체 높이, 지도 16:9, 바이오 2칸, 폰트 토큰 최대값 |
| 64rem (lg) | 1024 | 데스크톱 네비게이션 |

### 설계 변경 사항 (기존 동작과 다른 점)

| 항목 | 기존 | 변경 후 | 이유 |
|------|------|---------|------|
| 480px 브레이크포인트 | 480px | 640px | Tailwind v4 표준 정렬 |
| Contact Grid 2칸 전환 | 1024px | 768px | 768px에서 2칸 배치 가능, 표준 브레이크포인트 정렬 |
| Reviews Grid 1칸 강제 | ≤768px 강제 1칸 | auto-fit 자연 반응 | 더 부드러운 전환 |
| 미디어 쿼리 단위 | px | rem | Tailwind v4 표준, 접근성 |