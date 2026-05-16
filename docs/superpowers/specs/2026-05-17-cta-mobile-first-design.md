# 전체 반응형 모바일 우선 전환 설계

## 배경

기존 반응형 CSS는 데스크톱 우선(`max-width`) 방식이며, 브레이크포인트가 480px, 768px, 1024px로 Tailwind v4 표준(640px, 768px, 1024px)과 불일치한다. Hero CTA와 Contact CTA의 모바일 대응이 불충분하다(480px 이하에서만 축소, 중간 구간 누락).

## 목표

모든 반응형 규칙을 Tailwind v4 브레이크포인트에 맞춰 모바일 우선(`min-width`)으로 전환한다.

## 브레이크포인트 기준

Tailwind v4 기본값 사용:

| 이름 | min-width | 전통적 명칭 |
|------|-----------|-------------|
| 기본  | 0px | 모바일 |
| sm   | 640px | 큰 모바일/작은 태블릿 |
| md   | 768px | 태블릿 세로 |
| lg   | 1024px | 태블릿 가로/소형 데스크톱 |

480px 브레이크포인트는 제거하고 640px(sm)로 대체한다.

## 변경 사항

### 1. 폰트/스페이싱 토큰

`:root` 기본값을 모바일 기준으로 변경하고, `min-width`로 점진 확장한다.

| 토큰 | 모바일 (<640) | ≥640px (sm) | ≥768px (md) | ≥1024px (lg) |
|------|-------------|-------------|-------------|-------------|
| `--fs-3xl` | 1.625rem | 2rem | — | 2.75rem |
| `--fs-2xl` | 1.5rem | — | — | 2rem |
| `--space-2xl` | 3rem | 4rem | — | 6rem |

`≥1024px`에서만 최대 값으로 복원된다. `≥768px`에서는 sm 값이 그대로 유지된다.

### 2. Navigation

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
/* 기본: 모바일 우선 */
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

@media (min-width: 640px) {
  .hero-cta {
    width: auto;
  }
}

@media (min-width: 768px) {
  .hero-ctas {
    flex-direction: row;
  }
}
```

### 4. Hero

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| `.hero` min-height | 80vh | 100vh |

### 5. Bio Grid

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| `.bio-grid` | `1fr`, text-align center | `280px 1fr`, text-align left |
| `.portrait-img` | 200×200px | 240×240px |

### 6. Conditions / Signature Grids

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| `.conditions-groups` | `1fr` | `repeat(2, 1fr)` |
| `.signature-grid` | `1fr` | `repeat(2, 1fr)` |

### 7. Reviews Grid

`.reviews-grid`는 현재 `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`로 유동적이다. 기존 `≤768px`에서 강제 1칸 규칙을 제거하면 자연스럽게 반응하므로, 별도 `min-width` 규칙이 필요 없다.

### 8. Contact Grid

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

@media (min-width: 768px) {
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

### 10. Map Container

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| `.map-container` aspect-ratio | 4/3 | 16/9 |

### 11. Floating CTA

| 속성 | 모바일 (<768) | ≥768px (md) |
|------|-------------|-------------|
| bottom/right | var(--space-sm) | var(--space-lg) |

### 12. Treatments / Tags

| 속성 | 모바일 (<640) | ≥640px (sm) |
|------|-------------|-------------|
| `.treatments` gap | 6px | var(--space-xs) |
| `.tag` font-size | 0.8125rem | var(--fs-sm) |
| `.tag` padding | 4px 12px | 6px 16px |

### 13. 기존 max-width 블록 전면 제거

기존 반응형 섹션(908–1025행)의 모든 `max-width` 규칙을 제거하고, 각 컴포넌트 기본 스타일 아래에 `min-width` 쿼리로 재배치한다. 결과적으로 파일 끝의 `/* ── Responsive ── */` 섹션 전체가 사라진다.

### 브레이크포인트 요약

| min-width | 커버하는 변경 |
|-----------|-------------|
| 기본 | 모바일 기본값 (작은 폰트, 세로 레이아웃, 1칸 그리드, 햄버거 메뉴) |
| 640px (sm) | 태그/CTA 폭 확장, 스페이싱 증가, 폰트 토큰 중간값 |
| 768px (md) | 2칸 그리드, 가로 CTA, 히어로 전체 높이, 지도 16:9, 바이오 2칸 |
| 1024px (lg) | 데스크톱 네비게이션, 최대 폰트/스페이싱 토큰 |