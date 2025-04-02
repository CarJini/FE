import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useColorScheme } from "react-native";
import { MenuButton } from "@/src/components";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* 프로필 카드 */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: "https://placehold.co/40x40@3x.png" }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>홍길동</Text>
              <Text style={styles.email}>hong@example.com</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>등록차량</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>정비기록</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>예정정비</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuList}>
          <MenuButton
            size={20}
            iconName="person-circle-outline"
            text="개인정보 수정"
            description="이름, 회원 탈퇴"
          />
          <MenuButton
            size={20}
            iconName="notifications-outline"
            text="알림 설정"
            description="푸시 알림, 이메일 알림"
          />
          <MenuButton
            size={20}
            iconName="information-circle-outline"
            text="앱 정보"
            description="버전, 개인정보 처리방침"
          />
          <MenuButton size={20} iconName="log-out-outline" text="로그아웃" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileCard: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    // iOS용 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android용 그림자
    elevation: 3,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  menuList: {
    margin: 16,
  },
});
