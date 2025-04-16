import React from 'react'
import { useKakaoLoader as usekakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function KakaoLoader() {
  usekakaoLoaderOrigin({
    appkey: import.meta.env.VITE_KAKAOAPI_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
    retries: 2,
  });
}
