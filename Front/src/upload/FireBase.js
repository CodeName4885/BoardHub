// 필요한 SDK에서 필요한 기능을 가져옵니다.
import { initializeApp, getApp, getApps } from "firebase/app"
import { getStorage } from "firebase/storage"

// 웹 앱의 Firebase 구성
// Firebase JS SDK v7.20.0 이상의 경우 측정 ID는 선택사항입니다.
const firebaseConfig = {
    apiKey: "AIzaSyD4RaXBtSJg_m_vKQ_pGw4Sd1X68lOK4PQ",
    authDomain: "boardhub-e9f83.firebaseapp.com",
    projectId: "boardhub-e9f83",
    storageBucket: "boardhub-e9f83.appspot.com",
    messagingSenderId: "896821800251",
    appId: "1:896821800251:web:deb285d926f67c65751b1e",
    measurementId: "G-DMK6LQXZB0"
};

// Firebase 초기화
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const storage = getStorage()
export default app
