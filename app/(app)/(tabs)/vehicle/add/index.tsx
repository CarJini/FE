import { Redirect } from "expo-router";

export default function VehicleAddIndex() {
  // 이 페이지는 step1으로 자동 리디렉션합니다
  return <Redirect href="/vehicle/add/step1" />;
}
