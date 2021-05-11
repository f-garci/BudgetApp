import React, { useState } from "react";
import {
    View,
    TouchableWithoutFeedback,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";

import { selected } from "../store/actions/actionTypes";
import { useSelector, useDispatch } from "react-redux";

const Dropdown = ({ items = [] }) => {
    const selectedMonth = useSelector((state) => state.account.month);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    const handleOnClick = (item) => {
        if (item === selectedMonth) {
            dispatch({ type: selected, month: "All" });
        } else {
            dispatch({ type: selected, month: item });
        }
    };

    return (
        <View
            style={{
                width: 150,
                height: open ? 100 : 30,
                borderWidth: open ? 1 : 0,
            }}
        >
            <TouchableWithoutFeedback onPress={() => toggle()}>
                <View>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "black",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            padding: 5,
                        }}
                    >
                        <Text>{selectedMonth}</Text>
                        <Text>{open ? "Close" : "Open"}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {open && (
                <FlatList
                    data={items}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    // setSelection(item);
                                    handleOnClick(item);
                                    setOpen(!open);
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        padding: 3,
                                    }}
                                >
                                    <Text>{item}</Text>
                                    <Text>
                                        {item === selectedMonth && "Selected"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default Dropdown;
