import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, Text, View, TouchableOpacity } from "react-native";

import { Base, Typography } from "../styles";

const DateDropDown = (props) => {
  const [show, setShow] = useState<Boolean>(false);

  const [dropDownDate, setDropDownDate] = useState<Date>(new Date());

  const showDatePicker = () => {
    setShow(true);
  };

  useEffect(() => {
    props.checkDelivery();
  }, [dropDownDate]);

  return (
    <View>
      {Platform.OS === "android" && (
        <TouchableOpacity onPress={showDatePicker}>
          <View style={Base.button}>
            <Text
              style={{ ...Typography.normalTextColor, ...Typography.button }}
            >
              {props.delivery?.delivery_date
                ? dropDownDate.toLocaleDateString("se-SV")
                : "Välj datum"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {(show || Platform.OS === "ios") && (
        <DateTimePicker
          onChange={(event, date) => {
            props.setDelivery({
              ...props.delivery,
              delivery_date: date.toLocaleDateString("se-SV"),
            });
            setDropDownDate(date);
            setShow(false);
          }}
          value={dropDownDate}
        />
      )}
    </View>
  );
};

export default DateDropDown;
