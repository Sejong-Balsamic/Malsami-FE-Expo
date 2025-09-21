#!/bin/bash

# Malsami Android 배포 스크립트

echo "🚀 Malsami Android 앱 빌드 및 배포를 시작합니다..."

# 1. 의존성 설치
echo "📦 의존성을 설치합니다..."
npm install

# 2. Android 프로덕션 빌드
echo "🏗️ Android 프로덕션 빌드를 시작합니다..."
eas build --platform android --profile production

# 빌드 완료 후 사용자에게 확인 요청
echo "✅ 빌드가 완료되었습니다!"
echo "Google Play Console에서 빌드를 확인한 후 계속하려면 Enter를 누르세요..."
read -p ""

# 3. Google Play Store에 배포
echo "📱 Google Play Store에 배포합니다..."
eas submit --platform android --profile production

echo "🎉 배포가 완료되었습니다!"
echo "Google Play Console에서 릴리스 상태를 확인하세요."
