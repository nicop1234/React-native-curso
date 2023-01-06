/** @format */

import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";

export function DataMens(props) {
  const { dtbase } = props;

  return (
    <View>
      <FlatList
        data={dtbase}
        renderItem={(doc) => {
          const tipo = doc.item;
          return 
        }}
      />
    </View>
  );
}
