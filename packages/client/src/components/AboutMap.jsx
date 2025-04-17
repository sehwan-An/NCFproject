import { Map, MapMarker } from 'react-kakao-maps-sdk';
import KakaoLoader from './KakaoLoader.jsx';
import React from 'react';

const AboutMap = () => {
  KakaoLoader();
  return (
    <>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표
          lat: 35.156031117986835,
          lng: 126.89854530173659,
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={4} // 지도의 확대 레벨
      >
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: 35.156031117986835,
            lng: 126.89854530173659,
          }}
        />
      </Map>
    </>
  );
};

export default AboutMap;
