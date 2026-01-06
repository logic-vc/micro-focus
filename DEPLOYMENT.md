# Micro-Focus 배포 가이드

## 🌐 GitHub Pages 배포

### 자동 배포 설정 완료 ✅

이 프로젝트는 GitHub Actions를 통해 자동으로 배포됩니다.

#### 설정 방법:
1. GitHub 저장소 → **Settings** → **Pages**
2. **Source**를 **GitHub Actions**로 선택
3. `main` 또는 `master` 브랜치에 푸시하면 자동 배포됨

#### 배포 URL:
```
https://logic-vc.github.io/micro-focus/
```

**중요**: Vite 설정에 `base: './'`가 추가되어 GitHub Pages에서 정상 작동합니다!

---

## 📦 앱인토스(Appintos) 배포 파일

- **micro-focus.ait.tar.gz** - 앱인토스에 업로드할 AIT 패키지 파일 (64KB)

## 🚀 배포 방법

### 1. AIT 파일 업로드
```
micro-focus.ait.tar.gz 파일을 앱인토스 플랫폼에 업로드하세요.
```

### 2. 패키지 내용
AIT 패키지에는 다음이 포함되어 있습니다:
- `index.html` - 메인 HTML 파일
- `assets/` - 번들된 JavaScript 및 리소스
- `appinfo.json` - 앱 메타데이터
- `metadata.json` - 앱 정보

### 3. 앱 정보
- **이름**: Micro-Focus
- **버전**: 1.0.0
- **설명**: 5-60분 집중을 위한 타이머 앱
- **카테고리**: Productivity

## 🛠️ 로컬 개발

### 개발 서버 실행
```bash
npm install
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

### AIT 패키지 재생성
빌드 후 자동으로 생성되지만, 수동으로 재생성하려면:
```bash
# 빌드
npm run build

# AIT 패키지 생성
mkdir -p ait-package
cp -r dist/* ait-package/
cp metadata.json ait-package/
cd ait-package && tar -czf ../micro-focus.ait.tar.gz * && cd ..
```

## ✅ 코드 검토 결과

### 정상 작동 확인
✅ React 컴포넌트 구조 정상
✅ TypeScript 타입 정의 완료
✅ Vite 빌드 성공
✅ 타이머 로직 정상 작동
✅ 상태 관리 (useState, useEffect) 정상
✅ 반응형 디자인 (Tailwind CSS)

### 최적화 완료
✅ 불필요한 importmap 제거
✅ React 번들링 최적화 (204KB)
✅ Gzip 압축 적용 (64KB)

## 📱 앱 기능

1. **Planning View**: 작업 추가 및 시간 설정
2. **Focus View**: 집중 타이머 실행
3. **반응형 디자인**: 모바일/데스크톱 지원
4. **다크 테마**: 집중을 위한 미니멀 디자인

## 🔒 권한

앱은 특별한 프레임 권한이 필요하지 않습니다 (`requestFramePermissions: []`).
