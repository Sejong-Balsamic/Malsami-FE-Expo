// import { colors } from "@/constants";
// import React from "react";
// import {
//   Modal,
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   Pressable,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// interface AuthRouteModalProps {
//   onPress: () => void;
//   hide: () => void;
// }

// function AuthRouteModal({ onPress, hide }: AuthRouteModalProps) {
//   return (
//     <Modal transparent animationType="fade">
//       <View style={styles.modalBackground}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.headerText}>로그인 필요</Text>
//           <Text style={styles.subHeaderText}>로그인 후 이용 가능합니다.</Text>
//           <View style={styles.buttonContainer}>
//             <Pressable style={styles.cancelButton} onPress={hide}>
//               <Text style={styles.cancelButtonText}>취소</Text>
//             </Pressable>
//             <Pressable style={styles.loginButton} onPress={onPress}>
//               <LinearGradient
//                 style={styles.linearStyle}
//                 colors={colors.PRIMARY_GRADIENT}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Text style={styles.buttonText}>로그인</Text>
//               </LinearGradient>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     height: 154,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     width: Dimensions.get("window").width - 128,
//     backgroundColor: colors.UNCHANGED_WHITE,
//     borderRadius: 8,
//     paddingVertical: 20,
//     paddingHorizontal: 16,
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   subHeaderText: {
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 24,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     width: "100%",
//     borderRadius: 8,
//     alignItems: "center",
//     gap: 4,
//   },
//   loginButton: {
//     width: "50%",
//     height: 40,
//     paddingVertical: 12,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   linearStyle: {
//     width: "100%",
//     height: 40,
//     paddingVertical: 12,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cancelButton: {
//     width: "50%",
//     height: 40,
//     paddingVertical: 12,
//     backgroundColor: colors.GRAY_100,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: colors.UNCHANGED_WHITE,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: colors.UNCHANGED_WHITE,
//   },
// });

// export default AuthRouteModal;

// // import React from "react";
// // import { Modal, StyleSheet, View, Text } from "react-native";

// // interface AuthRouteModalProps {
// //   onPress: () => void;
// //   hide: () => void;
// // }

// // function AuthRouteModal({ onPress, hide }: AuthRouteModalProps) {
// //   return (
// //     <Modal style={styles.modalContainer} transparent animationType="fade">
// //       <View>
// //         <Text>로그인 필요</Text>
// //         <Text>로그인 후 이용 가능합니다 .</Text>
// //       </View>
// //     </Modal>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   modalContainer: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     paddingHorizontal: 16,
// //     paddingVertical: 20,
// //     backgroundColor: "rgba(0,0,0,0.5)",
// //   },
// // });

// // export default AuthRouteModal;
import { colors } from "@/constants";
import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AuthRouteModalProps {
  onPress: () => void;
  hide: () => void;
}

function AuthRouteModal({ onPress, hide }: AuthRouteModalProps) {
  return (
    <Modal transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>로그인 필요</Text>
          <Text style={styles.subHeaderText}>로그인 후 이용 가능합니다.</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={hide}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </Pressable>
            <Pressable style={styles.loginButton} onPress={onPress}>
              <LinearGradient
                style={styles.linearStyle}
                colors={colors.PRIMARY_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginButtonText}>로그인</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: Dimensions.get("window").width - 128, // 좌우 32px씩 여백
    backgroundColor: colors.UNCHANGED_WHITE,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.UNCHANGED_BLACK,
    marginBottom: 20,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 14,
    color: colors.GRAY_500,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 4,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.GRAY_100,
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.GRAY_500,
  },
  loginButton: {
    flex: 1,
    borderRadius: 8,
  },
  linearStyle: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.UNCHANGED_WHITE,
  },
});

export default AuthRouteModal;
