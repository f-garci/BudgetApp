import React, { useState } from "react";
import {
    View,
    TouchableWithoutFeedback,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";

const Dropdown = ({ title, items = [] }) => {
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);

    const handleOnClick = (item) => {
        if (item === selection[0]) {
            setSelection(["Select Month..."]);
        } else {
            setSelection([item]);
        }
    };

    // const renderMonthSelection = ({item}) => (
    //     <View>

    //     </View>
    // );

    return (
        <View style={{ backgroundColor: "pink", width: 150, height: 100 }}>
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
                        <Text>{selection[0]}</Text>
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
                                    selection(item);
                                    handleOnClick(item);
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
                                        {item === selection[0] && "Selected"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    // keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

export default Dropdown;
