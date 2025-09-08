import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import HotDocumentTabSelector from "@/components/screen/hotpost/HotDocumentTabSelector";
import HotDocumentList from "@/components/screen/hotpost/HotDocumentList";
import { colors } from "@/constants";

type TabType = "daily" | "weekly";

export default function HotDocumentListScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("daily");
  const pagerRef = useRef<PagerView>(null);

  const handleTabPress = (tab: TabType, pageIndex: number) => {
    setActiveTab(tab);
    pagerRef.current?.setPage(pageIndex);
  };

  const handlePageSelected = (position: number) => {
    setActiveTab(position === 0 ? "daily" : "weekly");
  };

  return (
    <View style={styles.container}>
      <HotDocumentTabSelector
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => handlePageSelected(e.nativeEvent.position)}
      >
        <View key="1">
          <HotDocumentList type="daily" />
        </View>
        <View key="2">
          <HotDocumentList type="weekly" />
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.UNCHANGED_WHITE,
  },
  pagerView: {
    flex: 1,
  },
});
