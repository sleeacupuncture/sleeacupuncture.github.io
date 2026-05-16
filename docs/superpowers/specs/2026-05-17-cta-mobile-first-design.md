# CTA + Contact Grid 모바일 우선 전환 설계

## 배경

기존 반응형 CSS는 데스크톱 우선(`max-width`) 방식이며, 브레이크포인트가 480px, 768px, 1024px로 Tailwind v4 표준(640px, 768px, 1024px)과 불일치한다. Hero CTA와 Contact CTA의 모바일 대응이 불충분하다(480px 이하에서만 축소, 중간 구간 누락).

## 목표

Hero CTA, Contact CTA, Contact Grid를 Tailwind v4 브레이크포인트에 맞춰 모바일 우선(`min-width`)으로 전환한다.

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

### 1. Hero CTA

기본(모바일) 스타일을 세로 스택 + 100% 폭으로 설정하고, `min-width` 쿼리로 점진 확장한다.

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

### 2. Contact Grid

기본을 1칸으로 설정하고, `≥768px`에서 2칸으로 확장한다.

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

### 3. Contact CTA

기본을 세로 스택 + 100% 폭으로 설정하고, 점진 확장한다.

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

@media (min-width: 640px) {
  .contact-cta {
    width: auto;
    white-space: nowrap;
  }
}

@media (min-width: 768px) {
  .contact-ctas {
    flex-direction: row;
    justify-content: flex-start;
  }
}
```

### 4. 기존 max-width에서 제거할 규칙

다음 셀렉터를 기존 `max-width` 블록에서 삭제한다:

- `@media (max-width: 1024px)` 안의 `.contact-grid` 규칙
- `@media (max-width: 1024px)` 안의 `.contact-ctas` 규칙
- `@media (max-width: 768px)` 안의 `.hero-ctas` 규칙
- `@media (max-width: 480px)` 안의 `.hero-cta` 규칙

### 5. 일관성 메모

nav, bio-grid, conditions-groups, signature-grid, reviews-grid, floating-cta, 폰트 토큰 등은 여전히 `max-width` 기반이다. 이후 전체를 모바일 우선으로 전환할 때 일관성 있게 처리한다.