import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./style";
import { Icons, Utils, Colors } from "@common";
import Swiper from "react-native-swiper";
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

class Promotions extends React.Component {
  render() {
    let { promotions } = this.props;
    return (
      <View style={styles.container}>
        <Swiper showsPagination={false} autoplay={true} autoplayTimeout={5}>
          {promotions.map((item, index) => (
            <TouchableOpacity
              style={{ flex: 1 }}
              key={index}
              onPress={() => this.openProducts(item)}
            >
              <Image
                source={{ uri: item.image }}
                indicator={Progress.Circle}
                indicatorProps={{
                  size: 30,
                  color: Colors.AppColor,
                }}
                style={{ flex: 1, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          ))}
        </Swiper>
      </View>
    );
  }

  openProducts = item => {
    let category = {
      id: item.categoryId,
      name: item.name,
      children: ""
    };
    this.props.onPress(category);
  };
}

export default Promotions;
