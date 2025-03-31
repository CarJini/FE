import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* 프로필 카드 */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
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

        {/* 메뉴 리스트 */}
        <View style={styles.menuList}>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <Text style={styles.menuText}>개인정보 수정</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <Text style={styles.menuText}>알림 설정</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <Text style={styles.menuText}>이용기록</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <Text style={styles.menuText}>앱정보</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <Text style={styles.menuText}>고객센터</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              styles.logoutButton,
              pressed && styles.pressedItem,
            ]}
          >
            <Text style={[styles.menuText, styles.logoutText]}>로그아웃</Text>
          </Pressable>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pressedItem: {
    backgroundColor: "#f5f5f5",
  },
  menuText: {
    fontSize: 16,
  },
  menuArrow: {
    fontSize: 20,
    color: "#999",
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "#FF3B30",
    fontWeight: "500",
  },
});
