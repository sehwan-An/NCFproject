import { Map } from 'react-kakao-maps-sdk'

const AboutMap = () =>{
  return (
    
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={4} // 지도의 확대 레벨
    >
      <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: 33.450701,
          lng: 126.570667,
        }}
        


      />
      <img src={Map.png} alt="MensShopimg.png" className='about-img-size'/> // 마커 이미지 URL, 기본적으로 카카오에서 제공하는 마커 이미지
    </Map>
    
  )
}

export default AboutMap