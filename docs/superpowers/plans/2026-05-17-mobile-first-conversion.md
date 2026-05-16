# 전체 반응형 모바일 우선 전환 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** CSS 반응형 규칙을 데스크톱 우선(`max-width`)에서 모바일 우선(`min-width`)으로 전면 전환한다. Tailwind v4 브레이크포인트(40rem/48rem/64rem)를 사용하고, 480px을 640px로 대체한다.

**Architecture:** 각 컴포넌트의 기본 스타일을 모바일 기준으로 변경하고, 컴포넌트 규칙 바로 아래에 `@media (min-width: ...)` 블록을 추가한다. 기존 `/* ── Responsive ── */` 섹션(908–1025행)은 모든 전환이 완료된 후 제거한다.

**Tech Stack:** Vanilla CSS (빌드 시스템 없음), 미디어 쿼리에 `rem` 단위 사용

**Spec:** `docs/superpowers/specs/2026-05-17-cta-mobile-first-design.md`

---

## 파일 구조

| 파일 | 변경 내용 |
|------|----------|
| `css/style.css` | `:root` 토큰 변경, 컴포넌트 기본 스타일 모바일 전환, `min-width` 쿼리 추가, 기존 `max-width` 섹션 제거 |
| `index.html` | 변경 없음 |
| `js/init.js` | 변경 없음 |

## 전략

1. 각 태스크에서 컴포넌트의 **기본 스타일을 모바일 기준으로 변경**하고 **`min-width` 쿼리를 추가**한다.
2. 전환 중 기존 `max-width` 규칙이 공존한다. 768px 경계에서 `max-width`가 나중에 선언되어 우선순위가 높지만, 현재 동작과 동일하므로 회귀가 없다.
3. 모든 컴포넌트 전환 완료 후 **기존 `max-width` 섹션을 전체 제거**한다.
4. 각 태스크 후 로컬 서버에서 시각 검증한다.

---

### Task 1: 폰트/스페이싱 토큰 전환

**Files:**
- Modify: `css/style.css:4-46` (`:root` 토큰 블록)

`:root` 토큰 3개를 모바일 기본값으로 변경하고, `min-width` 쿼리 2개를 `:root` 블록 바로 뒤에 추가한다.

- [ ] **Step 1: `:root` 토큰 기본값을 모바일로 변경**

`css/style.css`의 `:root` 블록에서 다음 3개 값을 변경:

```css
/* 변경 전 */
--fs-3xl: 2.75rem;
--fs-2xl: 2rem;
--space-2xl: 6rem;

/* 변경 후 */
--fs-3xl: 1.625rem;
--fs-2xl: 1.5rem;
--space-2xl: 3rem;
```

- [ ] **Step 2: `:root` 블록 닫는 중괄호 뒤에 `min-width` 쿼리 2개 추가**

```css
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

- [ ] **Step 3: 시각 검증**

`python3 -m http.server 8000` 으로 서버 실행 후 브라우저에서 확인:
- 320px 폭: `--fs-3xl`이 1.625rem (약 26px)으로 표시
- 640px 폭: `--fs-3xl`이 2rem (약 32px)으로 표시
- 768px 이상: `--fs-3xl`이 2.75rem (약 44px)으로 표시

DevTools에서 `getComputedStyle(document.documentElement).getPropertyValue('--fs-3xl')`로 값 확인.

- [ ] **Step 4: 커밋**

```bash
git add css/style.css
git commit -m "refactor(css): convert font/spacing tokens to mobile-first"
```

---

### Task 2: 네비게이션 모바일 우선 전환

**Files:**
- Modify: `css/style.css:131-257` (nav 섹션)

네비게이션 기본 스타일을 모바일(햄버거)로 변경하고, `64rem` 쿼리에서 데스크톱 스타일로 확장한다.

- [ ] **Step 1: `.nav-toggle` 기본값을 `display: flex`로 변경**

```css
/* 변경 전 */
.nav-toggle {
  display: none;
  /* ...나머지 속성 유지 */
}

/* 변경 후 */
.nav-toggle {
  display: flex;
  /* ...나머지 속성 유지 */
}
```

- [ ] **Step 2: `.nav-menu` 기본값을 모바일 드롭다운으로 변경**

```css
/* 변경 전 */
.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  flex-wrap: nowrap;
}

/* 변경 후 */
.nav-menu {
  display: none;
  position: absolute;
  top: var(--nav-height);
  left: 0;
  right: 0;
  flex-direction: column;
  background: var(--color-white);
  padding: var(--space-md);
  gap: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}
```

`.nav-menu.open` 규칙은 그대로 유지 (`display: flex`).

- [ ] **Step 3: `.nav-links` 기본값을 column으로 변경**

```css
/* 변경 전 */
.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  flex-wrap: nowrap;
}

/* 변경 후 */
.nav-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
```

- [ ] **Step 4: `.nav-link` 기본값을 모바일 스타일로 변경**

```css
/* 변경 전 */
.nav-link {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--fs-sm);
  color: var(--color-text-muted);
  letter-spacing: .5px;
  text-transform: uppercase;
  white-space: nowrap;
  padding: var(--space-xs) 0;
  border-bottom: 2px solid transparent;
  transition: color .2s, border-color .2s;
}

/* 변경 후 */
.nav-link {
  font-family: var(--font-heading);
  font-weight: 500;
  font-size: var(--fs-base);
  color: var(--color-text-muted);
  text-transform: none;
  white-space: nowrap;
  padding: var(--space-sm);
  border-bottom: none;
  transition: color .2s;
}
```

- [ ] **Step 5: `.nav-ctas` 기본값을 column으로 변경**

```css
/* 변경 전 */
.nav-ctas {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}

/* 변경 후 */
.nav-ctas {
  display: flex;
  flex-direction: column;
  width: 100%;
}
```

- [ ] **Step 6: `.nav-cta` 기본값을 모바일로 변경**

`.nav-cta`에 `width: 100%`와 `justify-content: center`를 추가:

```css
.nav-cta {
  /* 기존 속성 유지 */
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-sm);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius);
  transition: all .2s;
  width: 100%;          /* 추가 */
  justify-content: center; /* 추가 */
}
```

- [ ] **Step 7: `.nav-menu` 뒤에 `64rem` 쿼리 추가**

```css
@media (min-width: 64rem) {
  .nav-toggle {
    display: none;
  }

  .nav-menu {
    display: flex;
    position: static;
    flex-direction: row;
    background: none;
    padding: 0;
    gap: 0;
    border-bottom: none;
    box-shadow: none;
  }

  .nav-links {
    flex-direction: row;
    gap: var(--space-lg);
  }

  .nav-link {
    font-size: var(--fs-sm);
    text-transform: uppercase;
    padding: var(--space-xs) 0;
    border-bottom: 2px solid transparent;
    transition: color .2s, border-color .2s;
  }

  .nav-ctas {
    flex-direction: row;
    width: auto;
  }

  .nav-cta {
    width: auto;
    justify-content: initial;
  }
}
```

- [ ] **Step 8: 시각 검증**

- 320px: 햄버거 버튼 표시, 메뉴 토글 동작, 링크 세로 정렬
- 768px: 햄버거 버튼 표시, 메뉴 토글 동작
- 1024px 이상: 햄버거 숨김, 가로 네비게이션 표시

- [ ] **Step 9: 커밋**

```bash
git add css/style.css
git commit -m "refactor(css): convert navigation to mobile-first"
```

---

### Task 3: Hero 섹션 모바일 우선 전환

**Files:**
- Modify: `css/style.css` Hero 섹션 (`.hero`, `.hero-ctas`, `.hero-cta`)

- [ ] **Step 1: `.hero` 기본 `min-height`를 80vh로 변경**

```css
/* 변경 전 */
.hero {
  /* ...다른 속성 유지 */
  min-height: 100vh;
}

/* 변경 후 */
.hero {
  /* ...다른 속성 유지 */
  min-height: 80vh;
}
```

Hero 섹션 전체에 `min-width` 쿼리 추가:

```css
@media (min-width: 48rem) {
  .hero {
    min-height: 100vh;
  }
}
```

- [ ] **Step 2: `.hero-ctas` 기본값을 모바일로 변경**

```css
/* 변경 전 */
.hero-ctas {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

/* 변경 후 */
.hero-ctas {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}
```

- [ ] **Step 3: `.hero-cta` 기본값에 `width: 100%`와 `justify-content: center` 추가**

```css
.hero-cta {
  /* 기존 속성 유지 */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-base);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius);
  transition: all .2s;
  width: 100%;          /* 추가 */
  justify-content: center; /* 추가 */
}
```

- [ ] **Step 4: `.hero-cta` 섹션 뒤에 `min-width` 쿼리 2개 추가**

```css
@media (min-width: 40rem) {
  .hero-cta {
    width: auto;
  }
}

@media (min-width: 48rem) {
  .hero-ctas {
    flex-direction: row;
  }

  .hero {
    min-height: 100vh;
  }
}
```

참고: `.hero`의 `min-height` 쿼리는 Hero 섹션 `min-width` 블록에 함께 배치한다.

- [ ] **Step 5: 시각 검증**

- 320px: CTA 세로 스택, 100% 폭, 히어로 80vh
- 640px: CTA 세로 스택, auto 폭
- 768px 이상: CTA 가로 나란히, 히어로 100vh

- [ ] **Step 6: 커밋**

```bash
git add css/style.css
git commit -m "refactor(css): convert hero section to mobile-first"
```

---

### Task 4: Bio grid + Conditions + Signature + Reviews 모바일 우선 전환

**Files:**
- Modify: `css/style.css` Bio, Conditions, Signature, Reviews 섹션

- [ ] **Step 1: `.bio-grid` 기본값을 모바일로 변경**

```css
/* 변경 전 */
.bio-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-xl);
  align-items: start;
}

/* 변경 후 */
.bio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
  align-items: start;
  text-align: center;
}
```

`.bio-grid` 뒤에 쿼리 추가:

```css
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

- [ ] **Step 2: `.portrait-img` 기본값을 200px로 변경**

```css
/* 변경 전 */
.portrait-img {
  width: 240px;
  height: 240px;
  /* ...다른 속성 유지 */
}

/* 변경 후 */
.portrait-img {
  width: 200px;
  height: 200px;
  /* ...다른 속성 유지 */
}
```

- [ ] **Step 3: `.conditions-groups` 기본값을 1fr로 변경**

```css
/* 변경 전 */
.conditions-groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

/* 변경 후 */
.conditions-groups {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}
```

`.conditions-groups` 뒤에 쿼리 추가:

```css
@media (min-width: 48rem) {
  .conditions-groups {
    grid-template-columns: repeat(2, 1fr);
  }

  .signature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 4: `.signature-grid` 기본값을 1fr로 변경**

```css
/* 변경 전 */
.signature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

/* 변경 후 */
.signature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}
```

- [ ] **Step 5: `.reviews-grid`은 변경 없음**

`.reviews-grid`은 `repeat(auto-fit, minmax(260px, 1fr))`을 유지한다. 기존 `max-width: 768px`에서 강제 1칸 규칙은 Task 7에서 제거한다.

- [ ] **Step 6: 시각 검증**

- 320px: 모든 그리드 1칸, 바이오 센터 정렬, 초상화 200px
- 768px 이상: 모든 그리드 2칸, 바이오 좌측 정렬, 초상화 240px

- [ ] **Step 7: 커밋**

```bash
git add css/style.css
git commit -m "refactor(css): convert content grids to mobile-first"
```

---

### Task 5: Contact 섹션 모바일 우선 전환

**Files:**
- Modify: `css/style.css` Contact 섹션 (`.contact-grid`, `.contact-ctas`, `.contact-cta`)

- [ ] **Step 1: `.contact-grid` 기본값을 모바일로 변경**

```css
/* 변경 전 */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl);
  margin-bottom: var(--space-xl);
}

/* 변경 후 */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}
```

`.contact-grid` 뒤에 쿼리 추가:

```css
@media (min-width: 48rem) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-xl);
  }
}
```

- [ ] **Step 2: `.contact-ctas` 기본값을 모바일로 변경**

```css
/* 변경 전 */
.contact-ctas {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}

/* 변경 후 */
.contact-ctas {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}
```

`.contact-ctas` 뒤에 쿼리 추가:

```css
@media (min-width: 48rem) {
  .contact-ctas {
    flex-direction: row;
    justify-content: flex-start;
  }
}
```

- [ ] **Step 3: `.contact-cta` 기본값에 모바일 속성 추가**

```css
.contact-cta {
  /* 기존 속성 유지 */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: var(--fs-base);
  white-space: normal;    /* nowrap에서 변경 */
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius);
  transition: all .2s;
  width: 100%;            /* 추가 */
  justify-content: center; /* 추가 */
}
```

`.contact-cta` 뒤에 쿼리 추가:

```css
@media (min-width: 40rem) {
  .contact-cta {
    width: auto;
    white-space: nowrap;
  }
}
```

- [ ] **Step 4: 시각 검증**

- 320px: 그리드 1칸, CTA 세로 스택 100% 폭, 중앙 정렬
- 640px: CTA auto 폭, 여전히 세로 스택
- 768px 이상: 그리드 2칸, CTA 가로 나란히, 좌측 정렬

- [ ] **Step 5: 커밋**

```bash
git add css/style.css
git commit -m "refactor(css): convert contact section to mobile-first"
```

---

### Task 6: Map + Floating CTA + Treatments/Tags 모바일 우선 전환

**Files:**
- Modify: `css/style.css` `.map-container`, `.floating-cta`, `.treatments`, `.tag` 섹션

- [ ] **Step 1: `.map-container` 기본 `aspect-ratio`를 4/3으로 변경**

```css
/* 변경 전 */
.map-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

/* 변경 후 */
.map-container {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}
```

`.map-container` 뒤에 쿼리 추가:

```css
@media (min-width: 48rem) {
  .map-container {
    aspect-ratio: 16 / 9;
  }
}
```

- [ ] **Step 2: `.floating-cta` 기본 `bottom`/`right`를 작은 값으로 변경**

```css
/* 변경 전 */
.floating-cta {
  /* ...다른 속성 유지 */
  bottom: var(--space-lg);
  right: var(--space-lg);
}

/* 변경 후 */
.floating-cta {
  /* ...다른 속성 유지 */
  bottom: var(--space-sm);
  right: var(--space-sm);
}
```

`.floating-cta` 규칙 끝(`visible`/`hover` 상태 뒤)에 쿼리 추가:

```css
@media (min-width: 48rem) {
  .floating-cta {
    bottom: var(--space-lg);
    right: var(--space-lg);
  }
}
```

- [ ] **Step 3: `.treatments` 기본 `gap`을 작은 값으로 변경**

```css
/* 변경 전 */
.treatments {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-xl);
}

/* 변경 후 */
.treatments {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-bottom: var(--space-xl);
}
```

- [ ] **Step 4: `.tag` 기본값을 모바일로 변경**

```css
/* 변경 전 */
.tag {
  /* ...다른 속성 유지 */
  font-size: var(--fs-sm);
  padding: 6px 16px;
}

/* 변경 후 */
.tag {
  /* ...다른 속성 유지 */
  font-size: 0.8125rem;
  padding: 4px 12px;
}
```

`.tag` 뒤에 쿼리 추가 (`.section-dark .tag` 규칙 앞에):

```css
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

- [ ] **Step 5: 시각 검증**

- 320px: 지도 4:3 비율, 플로팅 CTA 작은 여백, 태그 작은 폰트/패딩
- 640px: 태그 정상 크기
- 768px 이상: 지도 16:9, 플로팅 CTA 큰 여백

- [ ] **Step 6: 커밋**

```bash
git add css/style.css
git commit -m "refactor(css): convert map, floating-cta, tags to mobile-first"
```

---

### Task 7: 기존 max-width 반응형 섹션 제거

**Files:**
- Modify: `css/style.css:906-1025` (기존 `/* ── Responsive ── */` 섹션 전체)

모든 컴포넌트가 모바일 우선으로 전환되었으므로, 기존 `max-width` 미디어 쿼리 블록 전체를 제거한다.

- [ ] **Step 1: 908–1025행의 `/* ── Responsive ── */` 섹션 전체 삭제**

다음 블록을 삭제:

```css
/* ── Responsive ── */

@media (max-width: 1024px) {
  /* ...전체 내용... */
}

@media (max-width: 768px) {
  /* ...전체 내용... */
}

@media (max-width: 480px) {
  /* ...전체 내용... */
}
```

- [ ] **Step 2: 시각 검증 — 전체 브레이크포인트**

`python3 -m http.server 8000` 실행 후 다음 뷰포트에서 확인:

| 뷰포트 | 확인 사항 |
|--------|----------|
| 320px | 햄버거 메뉴, 1칸 그리드, 세로 CTA, 작은 폰트, 지도 4:3 |
| 640px | 햄버거 메뉴, CTA auto 폭, 태그 정상 크기, 여전히 1칸 |
| 768px | 햄버거 메뉴, 2칸 그리드, 가로 CTA, 지도 16:9, 큰 폰트 |
| 1024px+ | 데스크톱 네비게이션, 2칸 그리드, 가로 CTA, 지도 16:9 |

각 뷰포트에서 다음을 확인:
- 네비게이션: 320-1023px은 햄버거, 1024px+은 가로 메뉴
- 히어로: 320-767px은 80vh, 768px+은 100vh
- CTA: 320-639px은 세로+100%폭, 640-767px은 세로+auto폭, 768px+은 가로
- 바이오: 320-767px은 1칸+센터, 768px+은 2칸+좌측
- 연락처: 320-767px은 1칸+세로CTA, 768px+은 2칸+가로CTA

- [ ] **Step 3: 커밋**

```bash
git add css/style.css
git commit -m "refactor(css): remove old max-width responsive section"
```

---

### Task 8: 최종 검증 및 정리

- [ ] **Step 1: CSS에 남은 `max-width` 미디어 쿼리가 없는지 확인**

```bash
grep -n "max-width" css/style.css
```

예상 결과: `prefers-reduced-motion` 등의 비반응형 미디어 쿼리만 남아야 함. `@media (max-width:` 패턴은 없어야 함.

- [ ] **Step 2: CSS에 새 `min-width` 미디어 쿼리가 올바른 `rem` 값을 사용하는지 확인**

```bash
grep -n "min-width" css/style.css
```

예상 결과: `40rem`, `48rem`, `64rem` 값만 사용되어야 함. `px` 값은 없어야 함.

- [ ] **Step 3: 모든 `rem` 미디어 쿼리 브레이크포인트가 스펙과 일치하는지 확인**

스펙: `40rem`(sm), `48rem`(md), `64rem`(lg)

```bash
grep -o "min-width: [0-9]*rem" css/style.css | sort | uniq -c
```

- [ ] **Step 4: 스펙 문서와 실제 CSS의 일치 확인**

스펙의 각 컴포넌트(1-12번)가 CSS에 올바르게 반영되었는지 수동 확인.

- [ ] **Step 5: 최종 커밋 (변경사항이 있으면)**

```bash
git add -A
git commit -m "refactor(css): complete mobile-first responsive conversion"
```

변경사항이 없으면 커밋하지 않음.