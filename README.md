# Chatlabz — AI Chatbot Craft Platform

포트폴리오 영상 기반으로 제작한 **Chatlabz** 데모 사이트입니다.

## 페이지 구성

| 페이지 | 파일 | 내용 |
|--------|------|------|
| 랜딩 + FAQ | `index.html` | 히어로, 기능 소개, FAQ 아코디언, 로그인 모달 |
| 대시보드 | `dashboard.html` | 데이터 소스 관리 (Files / Text / Website / Notion) |
| 요금제 | `pricing.html` | Free / Pro / Enterprise 플랜 |

## 미리보기

브라우저에서 `index.html`을 직접 열면 됩니다.

```
chatlabz/index.html
```

또는 로컬 서버:

```bash
cd chatlabz
npx serve .
```

## 주요 기능 (데모)

- **FAQ 아코디언** — 영상에 나온 질문 목록 반영
- **로그인 모달** — Google / Email 로그인 UI → 대시보드 이동
- **파일 업로드** — Drag & Drop, PDF/DOCX/TXT/CSV
- **웹사이트 크롤링** — URL 입력 → 링크 목록 추가
- **문자 수 카운터** — 11,000,000 한도 표시
- **Create Chatbot** 버튼

## 기술 스택 (원본 프로젝트)

- React + TypeScript + Vite
- React Query (`@tanstack/react-query`)
- Tailwind CSS

> 이 데모는 포트폴리오용 정적 HTML/CSS/JS 버전입니다.

## 파일 구조

```
chatlabz/
├── index.html
├── dashboard.html
├── pricing.html
├── css/
│   └── style.css
└── js/
    └── main.js
```
